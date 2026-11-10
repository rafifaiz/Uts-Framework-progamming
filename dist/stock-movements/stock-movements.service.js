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
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { StockMovement } from './entities/stock-movement.entity.js';
import { StockMovementItem } from '../stock-movement-items/entities/stock-movement-item.entity.js';
import { Warehouse } from '../warehouses/entities/warehouse.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { StockMovementType } from './entities/stock-movement.entity.js';
let StockMovementsService = class StockMovementsService {
    stockMovementRepository;
    stockMovementItemRepository;
    warehouseRepository;
    productRepository;
    dataSource;
    constructor(stockMovementRepository, stockMovementItemRepository, warehouseRepository, productRepository, dataSource) {
        this.stockMovementRepository = stockMovementRepository;
        this.stockMovementItemRepository = stockMovementItemRepository;
        this.warehouseRepository = warehouseRepository;
        this.productRepository = productRepository;
        this.dataSource = dataSource;
    }
    async updateProductStock(productId, quantity, type) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new NotFoundException(`Product dengan ID ${productId} tidak ditemukan`);
        }
        if (type === StockMovementType.IN) {
            product.currentStock += quantity;
        }
        else {
            if (product.currentStock < quantity) {
                throw new BadRequestException(`Stok tidak mencukupi untuk produk ${product.name}. Stok tersedia: ${product.currentStock}, diminta: ${quantity}`);
            }
            product.currentStock -= quantity;
        }
        await this.productRepository.save(product);
    }
    async create(createStockMovementDto) {
        const warehouse = await this.warehouseRepository.findOne({
            where: { id: createStockMovementDto.warehouseId },
        });
        if (!warehouse) {
            throw new BadRequestException(`Warehouse dengan ID ${createStockMovementDto.warehouseId} tidak ditemukan`);
        }
        for (const item of createStockMovementDto.items) {
            const product = await this.productRepository.findOne({ where: { id: item.productId } });
            if (!product) {
                throw new BadRequestException(`Product dengan ID ${item.productId} tidak ditemukan`);
            }
        }
        const existing = await this.stockMovementRepository.findOne({
            where: { referenceNumber: createStockMovementDto.referenceNumber },
        });
        if (existing) {
            throw new BadRequestException(`Reference number ${createStockMovementDto.referenceNumber} sudah digunakan`);
        }
        return this.dataSource.transaction(async (manager) => {
            const stockMovement = manager.create(StockMovement, {
                type: createStockMovementDto.type,
                referenceNumber: createStockMovementDto.referenceNumber,
                movementDate: createStockMovementDto.movementDate,
                notes: createStockMovementDto.notes,
                warehouseId: createStockMovementDto.warehouseId,
            });
            const savedMovement = await manager.save(stockMovement);
            for (const itemDto of createStockMovementDto.items) {
                const item = manager.create(StockMovementItem, {
                    quantity: itemDto.quantity,
                    unitPrice: itemDto.unitPrice,
                    stockMovementId: savedMovement.id,
                    productId: itemDto.productId,
                });
                await manager.save(item);
                await this.updateProductStock(itemDto.productId, itemDto.quantity, createStockMovementDto.type);
            }
            const result = await manager.findOne(StockMovement, {
                where: { id: savedMovement.id },
                relations: { warehouse: true, items: { product: true } },
            });
            return result;
        });
    }
    async findAll() {
        return this.stockMovementRepository.find({
            relations: { warehouse: true, items: { product: true } },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const stockMovement = await this.stockMovementRepository.findOne({
            where: { id },
            relations: { warehouse: true, items: { product: true } },
        });
        if (!stockMovement) {
            throw new NotFoundException(`Stock Movement dengan ID ${id} tidak ditemukan`);
        }
        return stockMovement;
    }
    async update(id, updateStockMovementDto) {
        const stockMovement = await this.findOne(id);
        if (updateStockMovementDto.items && updateStockMovementDto.items.length > 0) {
            if (updateStockMovementDto.warehouseId) {
                const warehouse = await this.warehouseRepository.findOne({
                    where: { id: updateStockMovementDto.warehouseId },
                });
                if (!warehouse) {
                    throw new BadRequestException(`Warehouse dengan ID ${updateStockMovementDto.warehouseId} tidak ditemukan`);
                }
            }
            for (const item of updateStockMovementDto.items) {
                const product = await this.productRepository.findOne({ where: { id: item.productId } });
                if (!product) {
                    throw new BadRequestException(`Product dengan ID ${item.productId} tidak ditemukan`);
                }
            }
            return this.dataSource.transaction(async (manager) => {
                const oldItems = await manager.find(StockMovementItem, {
                    where: { stockMovementId: id },
                });
                for (const oldItem of oldItems) {
                    await this.updateProductStock(oldItem.productId, oldItem.quantity, stockMovement.type === StockMovementType.IN ? StockMovementType.OUT : StockMovementType.IN);
                }
                await manager.delete(StockMovementItem, { stockMovementId: id });
                Object.assign(stockMovement, updateStockMovementDto);
                await manager.save(stockMovement);
                for (const itemDto of updateStockMovementDto.items) {
                    const item = manager.create(StockMovementItem, {
                        quantity: itemDto.quantity,
                        unitPrice: itemDto.unitPrice,
                        stockMovementId: stockMovement.id,
                        productId: itemDto.productId,
                    });
                    await manager.save(item);
                    await this.updateProductStock(itemDto.productId, itemDto.quantity, stockMovement.type);
                }
                const result = await manager.findOne(StockMovement, {
                    where: { id },
                    relations: { warehouse: true, items: { product: true } },
                });
                return result;
            });
        }
        if (updateStockMovementDto.warehouseId) {
            const warehouse = await this.warehouseRepository.findOne({
                where: { id: updateStockMovementDto.warehouseId },
            });
            if (!warehouse) {
                throw new BadRequestException(`Warehouse dengan ID ${updateStockMovementDto.warehouseId} tidak ditemukan`);
            }
        }
        if (updateStockMovementDto.referenceNumber) {
            const existing = await this.stockMovementRepository.findOne({
                where: { referenceNumber: updateStockMovementDto.referenceNumber },
            });
            if (existing && existing.id !== id) {
                throw new BadRequestException(`Reference number ${updateStockMovementDto.referenceNumber} sudah digunakan`);
            }
        }
        Object.assign(stockMovement, updateStockMovementDto);
        return this.stockMovementRepository.save(stockMovement);
    }
    async remove(id) {
        const stockMovement = await this.findOne(id);
        return this.dataSource.transaction(async (manager) => {
            const items = await manager.find(StockMovementItem, {
                where: { stockMovementId: id },
            });
            for (const item of items) {
                await this.updateProductStock(item.productId, item.quantity, stockMovement.type === StockMovementType.IN ? StockMovementType.OUT : StockMovementType.IN);
            }
            await manager.delete(StockMovementItem, { stockMovementId: id });
            await manager.remove(stockMovement);
        });
    }
    async getStockReport() {
        const products = await this.productRepository.find({
            select: { id: true, name: true, sku: true, currentStock: true, minStock: true },
        });
        return products.map(p => ({
            productId: p.id,
            productName: p.name,
            sku: p.sku,
            currentStock: p.currentStock,
            minStock: p.minStock,
        }));
    }
};
StockMovementsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(StockMovement)),
    __param(1, InjectRepository(StockMovementItem)),
    __param(2, InjectRepository(Warehouse)),
    __param(3, InjectRepository(Product)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository,
        Repository,
        DataSource])
], StockMovementsService);
export { StockMovementsService };
//# sourceMappingURL=stock-movements.service.js.map