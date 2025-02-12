import { Product } from "./Product"

export interface ProductUpdate {
    id: number
    update: Partial<Omit<Product, "id">> & { id?: never }
}
