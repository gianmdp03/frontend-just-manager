import { InventoryItemDetail } from "../inventory-item/inventory-item-detail";

export interface LocationDetail {
    id:number;
    name:string;
    inventoryItems:Omit<InventoryItemDetail, "location">[];
}
