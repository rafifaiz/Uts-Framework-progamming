import { Repository, DataSource } from 'typeorm';
import { StockMovement } from './entities/stock-movement.entity.js';
import { StockMovementItem } from '../stock-movement-items/entities/stock-movement-item.entity.js';
import { CreateStockMovementDto } from './dto/stock-movement.dto.js';
import { UpdateStockMovementDto } from './dto/stock-movement.dto.js';
import { Warehouse } from '../warehouses/entities/warehouse.entity.js';
import { Product } from '../products/entities/product.entity.js';
export declare class StockMovementsService {
    private readonly stockMovementRepository;
    private readonly stockMovementItemRepository;
    private readonly warehouseRepository;
    private readonly productRepository;
    private readonly dataSource;
    constructor(stockMovementRepository: Repository<StockMovement>, stockMovementItemRepository: Repository<StockMovementItem>, warehouseRepository: Repository<Warehouse>, productRepository: Repository<Product>, dataSource: DataSource);
    private updateProductStock;
    create(createStockMovementDto: CreateStockMovementDto): Promise<StockMovement>;
    findAll(): Promise<StockMovement[]>;
    findOne(id: string): Promise<StockMovement>;
    update(id: string, updateStockMovementDto: UpdateStockMovementDto): Promise<StockMovement>;
    remove(id: string): Promise<void>;
    getStockReport(): Promise<{
        productId: string;
        productName: string;
        sku: string;
        currentStock: number;
        minStock: number;
    }[]>;
}
