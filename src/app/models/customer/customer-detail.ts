import { OrderDetail } from "../order/order-detail";

export interface CustomerDetail {
    id:number;
    fullname:string;
    phoneNumber:string;
    orders:Omit<OrderDetail, "customer">[];
}
