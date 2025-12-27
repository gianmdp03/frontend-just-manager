import { OrderDet } from "../order/order-det";

export interface ProductDet {
    id:string;
    name:string;
    imageUrl?:string;
    orders:OrderDet[];
}
