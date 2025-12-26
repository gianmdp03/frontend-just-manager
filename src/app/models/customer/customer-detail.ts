import { OrderDetail } from "../order/order-detail";

export interface CustomerDetail {
    id:string;
    fullname:string;
    phoneNumber:string;
    orders:Omit<OrderDetail, "customer">[];
}
