import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { CreateProductDto } from './dto/product.dto.js';
import { UpdateProductDto } from './dto/product.dto.js';
import { Category } from '../categories/entities/category.entity.js';
import { Supplier } from '../suppliers/entities/supplier.entity.js';
export declare class ProductsService {
    private readonly productRepository;
    private readonly categoryRepository;
    private readonly supplierRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>, supplierRepository: Repository<Supplier>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
}
