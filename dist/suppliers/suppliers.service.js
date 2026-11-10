var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity.js';
let SuppliersService = class SuppliersService {
    supplierRepository;
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    async create(createSupplierDto) {
        const supplier = this.supplierRepository.create(createSupplierDto);
        return this.supplierRepository.save(supplier);
    }
    async findAll() {
        return this.supplierRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const supplier = await this.supplierRepository.findOne({ where: { id } });
        if (!supplier) {
            throw new NotFoundException(`Supplier dengan ID ${id} tidak ditemukan`);
        }
        return supplier;
    }
    async update(id, updateSupplierDto) {
        const supplier = await this.findOne(id);
        Object.assign(supplier, updateSupplierDto);
        return this.supplierRepository.save(supplier);
    }
    async remove(id) {
        const supplier = await this.findOne(id);
        await this.supplierRepository.remove(supplier);
    }
};
SuppliersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Supplier)),
    __metadata("design:paramtypes", [Repository])
], SuppliersService);
export { SuppliersService };
//# sourceMappingURL=suppliers.service.js.map