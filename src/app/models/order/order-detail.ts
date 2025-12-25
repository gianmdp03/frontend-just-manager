import { CustomerDetail } from "../customer/customer-detail";
import { OrderItemDetail } from "./order-item-detail";

export interface OrderDetail {
    id:number;
    saleDate:Date;
    orderItems:OrderItemDetail[];
    customer:Omit<CustomerDetail, "orders">;
}
