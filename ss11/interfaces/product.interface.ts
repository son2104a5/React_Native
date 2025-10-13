import { ProductStatus } from "@/enums/ProductStatus";

export interface Product {
    id: number;
    name: string;
    status: ProductStatus;
    price: number;
}