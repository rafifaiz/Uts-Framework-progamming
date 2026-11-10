import { StockMovementsService } from './stock-movements.service.js';
import { CreateStockMovementDto } from './dto/stock-movement.dto.js';
import { UpdateStockMovementDto } from './dto/stock-movement.dto.js';
import { StockMovement } from './entities/stock-movement.entity.js';
export declare class StockMovementsController {
    private readonly stockMovementsService;
    constructor(stockMovementsService: StockMovementsService);
    create(createStockMovementDto: CreateStockMovementDto): Promise<StockMovement>;
    findAll(): Promise<StockMovement[]>;
    getStockReport(): Promise<{
        productId: string;
        productName: string;
        sku: string;
        currentStock: number;
        minStock: number;
    }[]>;
    findOne(id: string): Promise<StockMovement>;
    update(id: string, updateStockMovementDto: UpdateStockMovementDto): Promise<StockMovement>;
    remove(id: string): Promise<void>;
}
