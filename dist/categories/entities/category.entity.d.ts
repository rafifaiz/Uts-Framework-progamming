import { Product } from '../../products/entities/product.entity.js';
export declare class Category {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
