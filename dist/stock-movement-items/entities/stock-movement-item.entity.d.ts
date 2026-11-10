import { StockMovement } from '../../stock-movements/entities/stock-movement.entity.js';
import { Product } from '../../products/entities/product.entity.js';
export declare class StockMovementItem {
    id: string;
    quantity: number;
    unitPrice: number;
    stockMovement: StockMovement;
    stockMovementId: string;
    product: Product;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}
