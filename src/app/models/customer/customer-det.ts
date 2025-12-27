import { OrderDet } from "../order/order-det";

export interface CustomerDet {
    id:string;
    fullname:string;
    phoneNumber:string;
    orders:Omit<OrderDet, "customer">[];
}
