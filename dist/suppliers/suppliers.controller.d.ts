import { SuppliersService } from './suppliers.service.js';
import { CreateSupplierDto } from './dto/supplier.dto.js';
import { UpdateSupplierDto } from './dto/supplier.dto.js';
import { Supplier } from './entities/supplier.entity.js';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDto: CreateSupplierDto): Promise<Supplier>;
    findAll(): Promise<Supplier[]>;
    findOne(id: string): Promise<Supplier>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier>;
    remove(id: string): Promise<void>;
}
