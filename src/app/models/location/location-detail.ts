import { InventoryItemDetail } from "../inventory-item/inventory-item-detail";

export interface LocationDetail {
    id:string;
    name:string;
    inventoryItems:Omit<InventoryItemDetail, "location">[];
}
