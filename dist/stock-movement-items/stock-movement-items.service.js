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
import { StockMovementItem } from './entities/stock-movement-item.entity.js';
let StockMovementItemsService = class StockMovementItemsService {
    itemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async findAll() {
        return this.itemRepository.find({
            relations: { stockMovement: true, product: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findByStockMovement(stockMovementId) {
        return this.itemRepository.find({
            where: { stockMovementId },
            relations: { product: true },
        });
    }
    async findOne(id) {
        const item = await this.itemRepository.findOne({
            where: { id },
            relations: { stockMovement: true, product: true },
        });
        if (!item) {
            throw new NotFoundException(`Stock Movement Item dengan ID ${id} tidak ditemukan`);
        }
        return item;
    }
};
StockMovementItemsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(StockMovementItem)),
    __metadata("design:paramtypes", [Repository])
], StockMovementItemsService);
export { StockMovementItemsService };
//# sourceMappingURL=stock-movement-items.service.js.map