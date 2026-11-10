import { StockMovementType } from '../entities/stock-movement.entity.js';
export declare class CreateStockMovementItemDto {
    productId: string;
    quantity: number;
    unitPrice: number;
}
export declare class CreateStockMovementDto {
    type: StockMovementType;
    referenceNumber: string;
    movementDate: string;
    notes: string;
    warehouseId: string;
    items: CreateStockMovementItemDto[];
}
export declare class UpdateStockMovementDto {
    type: StockMovementType;
    referenceNumber: string;
    movementDate: string;
    notes: string;
    warehouseId: string;
    items: CreateStockMovementItemDto[];
}
