import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../../components/Stripe/CheckoutForm";
import stripePromise from "../../config/stripeConfig";

export function Checkout() {
    const location = useLocation();
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Recuperar `clientSecret` do estado passado via navegação
        const secret = location?.state?.data?.clientSecret;

        if (secret) {
            setClientSecret(secret);
        } else {
            console.error("Erro: clientSecret não foi encontrado no estado.");
        }

        setLoading(false); // Finalizar carregamento
    }, [location]);

    if (loading) {
        return <div>Carregando informações de pagamento...</div>;
    }

    if (!clientSecret) {
        return (
            <div>
                <h2>Erro ao carregar o pagamento</h2>
                <p>Certifique-se de que os dados de pagamento estão corretos e volte para tentar novamente.</p>
            </div>
        );
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
        </Elements>
    );
}
