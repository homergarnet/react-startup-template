import { Product } from "./Product"

export interface Category {
    id: number
    name: string
    image: string
}

export interface CategoryState {
    categories: Category[]
    loading: boolean
    error: string
    categoryProducts?: Product[]
}

export interface NewCategory {
    name: string
    image: string
}