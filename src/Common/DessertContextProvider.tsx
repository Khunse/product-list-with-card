import { useState } from "react";
import { CartProviderProps, DessertContextTyp, OrderCart } from "./types";
import { DessertContext } from "./DessertContext";


export default function CartProvider({children} : CartProviderProps) {

    // set default value here
    const [cartItem,setCartItem] = useState<OrderCart>({
        items: [],
        totalPrice: 0
    });

    const contextValue: DessertContextTyp = {
        setCartItem,
        cartItem
    }

    return (
        <DessertContext.Provider value={contextValue}>
            {children}
        </DessertContext.Provider>
    )
}