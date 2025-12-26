import { OrderDetail } from "../order/order-detail";

export interface ProductDetail {
    id:string;
    name:string;
    imageUrl?:string;
    orders:OrderDetail[];
}
