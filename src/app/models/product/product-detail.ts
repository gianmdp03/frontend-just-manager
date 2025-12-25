import { OrderDetail } from "../order/order-detail";

export interface ProductDetail {
    id:number;
    name:string;
    imageUrl?:string;
    orders:OrderDetail[];
}
