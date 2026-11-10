import { Repository } from 'typeorm';
import { StockMovementItem } from './entities/stock-movement-item.entity.js';
export declare class StockMovementItemsService {
    private readonly itemRepository;
    constructor(itemRepository: Repository<StockMovementItem>);
    findAll(): Promise<StockMovementItem[]>;
    findByStockMovement(stockMovementId: string): Promise<StockMovementItem[]>;
    findOne(id: string): Promise<StockMovementItem>;
}
