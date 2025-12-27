import { ProductDet } from "../product/product-del";

export interface OrderItemDet {
    id:string;
    product:ProductDet;
    amount:number;
}
