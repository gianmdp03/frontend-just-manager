import { ProductDetail } from "../product/product-detail";

export interface OrderItemDetail {
    id:number;
    product:ProductDetail;
    amount:number;
}
