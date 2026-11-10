import { StockMovementItemsService } from './stock-movement-items.service.js';
import { StockMovementItem } from './entities/stock-movement-item.entity.js';
export declare class StockMovementItemsController {
    private readonly itemsService;
    constructor(itemsService: StockMovementItemsService);
    findAll(): Promise<StockMovementItem[]>;
    findByStockMovement(stockMovementId: string): Promise<StockMovementItem[]>;
    findOne(id: string): Promise<StockMovementItem>;
}
