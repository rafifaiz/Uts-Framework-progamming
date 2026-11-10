import { Category } from './categories/entities/category.entity.js';
import { Product } from './products/entities/product.entity.js';
import { Supplier } from './suppliers/entities/supplier.entity.js';
import { Warehouse } from './warehouses/entities/warehouse.entity.js';
import { StockMovement } from './stock-movements/entities/stock-movement.entity.js';
import { StockMovementItem } from './stock-movement-items/entities/stock-movement-item.entity.js';
export declare const INVENTORY_ENTITIES: (typeof Supplier | typeof Product | typeof Warehouse | typeof StockMovement | typeof StockMovementItem | typeof Category)[];
export declare class AppModule {
}
