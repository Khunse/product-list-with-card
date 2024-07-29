import { Dispatch, ReactNode, SetStateAction } from "react"

 export type Dessert = {
    name: string,
    category: string,
    price: number,
    image: DessertImg
}

type DessertImg = {
    thumbnail: string,
    mobile: string,
    tablet: string,
    desktop: string
}

export type DessertProp = {
    dessert: Dessert,
    dessertHandler: Dispatch<React.SetStateAction<OrderCart>>
}

export type Order = {
    image: string,
    itemName: string,
    quantity: number,
    itemPrice: number,
    totalItemPrice: number
}

export type OrderCart = {
    items: Order[],
    totalPrice: number
}

export interface DessertContextType {
    children: ReactNode
}

export interface CartProviderProps {
    children: ReactNode
}

export interface DessertContextTyp {
    cartItem: OrderCart,
    setCartItem: React.Dispatch<React.SetStateAction<OrderCart>>
}