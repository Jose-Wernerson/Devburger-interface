import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";

const AppPovider = ({ children }) => {
    return (
        <UserProvider>
            <CartProvider>{children}</CartProvider>
        </UserProvider>
    );
};

export default AppPovider