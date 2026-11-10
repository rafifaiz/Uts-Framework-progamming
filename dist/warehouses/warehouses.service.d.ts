import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity.js';
import { CreateWarehouseDto } from './dto/warehouse.dto.js';
import { UpdateWarehouseDto } from './dto/warehouse.dto.js';
export declare class WarehousesService {
    private readonly warehouseRepository;
    constructor(warehouseRepository: Repository<Warehouse>);
    create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse>;
    findAll(): Promise<Warehouse[]>;
    findOne(id: string): Promise<Warehouse>;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse>;
    remove(id: string): Promise<void>;
}
