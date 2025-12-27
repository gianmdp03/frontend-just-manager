import { CustomerDet } from "../customer/customer-det";
import { OrderItemDet } from "./order-item-det";

export interface OrderDet {
    id:string;
    saleDate:Date;
    orderItems:OrderItemDet[];
    customer:Omit<CustomerDet, "orders">;
}
