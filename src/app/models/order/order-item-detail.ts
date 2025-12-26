import { ProductDetail } from "../product/product-detail";

export interface OrderItemDetail {
    id:string;
    product:ProductDetail;
    amount:number;
}
