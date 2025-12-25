import { LocationDetail } from "../location/location-detail";
import { ProductDetail } from "../product/product-detail";

export interface InventoryItemDetail {
    id:number;
    product:Omit<ProductDetail, "orders">;
    location:Omit<LocationDetail, "inventoryItems">;
    stock:number;
    expireDate:Date;
}
