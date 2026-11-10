import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/product.dto.js';
import { UpdateProductDto } from './dto/product.dto.js';
import { Product } from './entities/product.entity.js';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
}
