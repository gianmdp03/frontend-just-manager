import { InventoryItemDet } from "../inventory-item/inventory-item-det";

export interface LocationDet {
    id:string;
    name:string;
    inventoryItems:Omit<InventoryItemDet, "location">[];
}
