import { createContext, useContext } from "react";
import { DessertContextTyp, OrderCart } from "./types";


export const DessertContext = createContext<DessertContextTyp | null>(null)

export const useCartContext = () => {
    const cart = useContext(DessertContext);
    if (!cart) {
        throw new Error('useMyContext must be used within a MyProvider');
      }
    return cart;
}
