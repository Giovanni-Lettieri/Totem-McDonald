import { Topping } from "../bottom-sheet-customize/topping"

export interface Prodotti {
    item: string
    price: number
    image: string
    category: string
    sconto: number
    toppings: Topping[]
}
