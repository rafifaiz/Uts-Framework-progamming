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
import { Warehouse } from './entities/warehouse.entity.js';
let WarehousesService = class WarehousesService {
    warehouseRepository;
    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    async create(createWarehouseDto) {
        const warehouse = this.warehouseRepository.create(createWarehouseDto);
        return this.warehouseRepository.save(warehouse);
    }
    async findAll() {
        return this.warehouseRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const warehouse = await this.warehouseRepository.findOne({ where: { id } });
        if (!warehouse) {
            throw new NotFoundException(`Warehouse dengan ID ${id} tidak ditemukan`);
        }
        return warehouse;
    }
    async update(id, updateWarehouseDto) {
        const warehouse = await this.findOne(id);
        Object.assign(warehouse, updateWarehouseDto);
        return this.warehouseRepository.save(warehouse);
    }
    async remove(id) {
        const warehouse = await this.findOne(id);
        await this.warehouseRepository.remove(warehouse);
    }
};
WarehousesService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Warehouse)),
    __metadata("design:paramtypes", [Repository])
], WarehousesService);
export { WarehousesService };
//# sourceMappingURL=warehouses.service.js.map