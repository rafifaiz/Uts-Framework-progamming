import { Category } from '../../categories/entities/category.entity.js';
import { Supplier } from '../../suppliers/entities/supplier.entity.js';
import { StockMovementItem } from '../../stock-movement-items/entities/stock-movement-item.entity.js';
export declare class Product {
    id: string;
    name: string;
    sku: string;
    description: string;
    price: number;
    currentStock: number;
    minStock: number;
    maxStock: number;
    category: Category;
    categoryId: string;
    supplier: Supplier;
    supplierId: string;
    stockMovementItems: StockMovementItem[];
    createdAt: Date;
    updatedAt: Date;
}
