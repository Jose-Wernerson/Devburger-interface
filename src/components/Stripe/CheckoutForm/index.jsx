import {
    PaymentElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css";
import { toast } from "react-toastify";
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";

export default function CheckoutForm() {
    const { cartProducts, clearCart } = useCart();
    const Navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { state: { dpmCheckerLink } } = useLocation();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!stripe || !elements) {
            console.error("Stripe ou Elements com falha, tente novamente");
            return;
        }

        setIsLoading(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements
        });

        if (error) {
            console.error("Erro ao confirmar pagamento:", error.message);
            setMessage(error.message);
            toast.error(error.message);
        } else if (paymentIntent) {

            switch (paymentIntent.status) {
                case "succeeded":

                    try {
                        const products = cartProducts.map((product) => {
                            return {
                                id: product.id,
                                quantity: product.quantity,
                                price: product.price,
                            };
                        });

                        const { status } = await api.post("/orders",
                            { products },
                            { validateStatus: () => true }
                        );

                        if (status === 200 || status === 201) {
                            toast.success("Pedido realizado com sucesso!");
                            clearCart();
                            setTimeout(() => {
                                Navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
                            }, 3000);
                        } else if (status === 409) {
                            toast.error("Falha ao realizar pedido.");
                        } else {
                            throw new Error();
                        }
                    } catch (error) {
                        console.error("Erro ao criar o pedido:", error.message);
                        toast.error("Falha no pedido! Tente novamente.");
                    }
                    break;

                case "processing":
                    setMessage("O pagamento está em processamento. Por favor, aguarde.");
                    break;

                case "requires_payment_method":
                    console.warn("Pagamento requer um método de pagamento válido.");
                    setMessage("Falha no pagamento. Tente novamente.");
                    break;

                default:
                    console.error("Status desconhecido do PaymentIntent:", paymentIntent.status);
                    setMessage("Algo deu errado. Por favor, tente novamente.");
                    break;
            }
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion",
    };

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar agora"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
            <div id="dpm-annotation">
                <p>
                    Os métodos de pagamento são fornecidos pelo Stripe.&nbsp;
                    <a
                        href={dpmCheckerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="dpm-integration-checker"
                    >
                        Ver métodos de pagamentos
                    </a>
                </p>
            </div>
        </div>
    );
}
