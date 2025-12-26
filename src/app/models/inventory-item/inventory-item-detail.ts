import { LocationDetail } from "../location/location-detail";
import { ProductDetail } from "../product/product-detail";

export interface InventoryItemDetail {
    id:string;
    product:Omit<ProductDetail, "orders">;
    location:Omit<LocationDetail, "inventoryItems">;
    stock:number;
    expireDate:Date;
}
