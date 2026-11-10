import { WarehousesService } from './warehouses.service.js';
import { CreateWarehouseDto } from './dto/warehouse.dto.js';
import { UpdateWarehouseDto } from './dto/warehouse.dto.js';
import { Warehouse } from './entities/warehouse.entity.js';
export declare class WarehousesController {
    private readonly warehousesService;
    constructor(warehousesService: WarehousesService);
    create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse>;
    findAll(): Promise<Warehouse[]>;
    findOne(id: string): Promise<Warehouse>;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse>;
    remove(id: string): Promise<void>;
}
