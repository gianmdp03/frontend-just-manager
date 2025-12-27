import { LocationDet } from "../location/location-det";
import { ProductDet } from "../product/product-del";

export interface InventoryItemDet {
    id:string;
    product:Omit<ProductDet, "orders">;
    location:Omit<LocationDet, "inventoryItems">;
    stock:number;
    expireDate:Date;
}
