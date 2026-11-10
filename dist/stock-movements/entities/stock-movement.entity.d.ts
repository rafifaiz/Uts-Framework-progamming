import { Warehouse } from '../../warehouses/entities/warehouse.entity.js';
import { StockMovementItem } from '../../stock-movement-items/entities/stock-movement-item.entity.js';
export declare enum StockMovementType {
    IN = "IN",
    OUT = "OUT"
}
export declare class StockMovement {
    id: string;
    type: StockMovementType;
    referenceNumber: string;
    movementDate: Date;
    notes: string;
    warehouse: Warehouse;
    warehouseId: string;
    items: StockMovementItem[];
    createdAt: Date;
    updatedAt: Date;
}
