import { CustomerDetail } from "../customer/customer-detail";
import { OrderItemDetail } from "./order-item-detail";

export interface OrderDetail {
    id:string;
    saleDate:Date;
    orderItems:OrderItemDetail[];
    customer:Omit<CustomerDetail, "orders">;
}
