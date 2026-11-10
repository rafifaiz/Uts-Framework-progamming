import { StockMovement } from '../../stock-movements/entities/stock-movement.entity.js';
export declare class Warehouse {
    id: string;
    name: string;
    address: string;
    city: string;
    manager: string;
    stockMovements: StockMovement[];
    createdAt: Date;
    updatedAt: Date;
}
