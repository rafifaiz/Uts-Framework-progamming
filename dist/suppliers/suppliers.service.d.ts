import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity.js';
import { CreateSupplierDto } from './dto/supplier.dto.js';
import { UpdateSupplierDto } from './dto/supplier.dto.js';
export declare class SuppliersService {
    private readonly supplierRepository;
    constructor(supplierRepository: Repository<Supplier>);
    create(createSupplierDto: CreateSupplierDto): Promise<Supplier>;
    findAll(): Promise<Supplier[]>;
    findOne(id: string): Promise<Supplier>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier>;
    remove(id: string): Promise<void>;
}
