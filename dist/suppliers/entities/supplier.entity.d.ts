import { Product } from '../../products/entities/product.entity.js';
export declare class Supplier {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
