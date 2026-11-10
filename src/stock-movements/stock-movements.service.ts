import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { StockMovement } from './entities/stock-movement.entity.js';
import { StockMovementItem } from '../stock-movement-items/entities/stock-movement-item.entity.js';
import { CreateStockMovementDto } from './dto/stock-movement.dto.js';
import { UpdateStockMovementDto } from './dto/stock-movement.dto.js';
import { Warehouse } from '../warehouses/entities/warehouse.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { StockMovementType } from './entities/stock-movement.entity.js';

@Injectable()
export class StockMovementsService {
  constructor(
    @InjectRepository(StockMovement)
    private readonly stockMovementRepository: Repository<StockMovement>,
    @InjectRepository(StockMovementItem)
    private readonly stockMovementItemRepository: Repository<StockMovementItem>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  private async updateProductStock(productId: string, quantity: number, type: StockMovementType): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product dengan ID ${productId} tidak ditemukan`);
    }

    if (type === StockMovementType.IN) {
      product.currentStock += quantity;
    } else {
      if (product.currentStock < quantity) {
        throw new BadRequestException(
          `Stok tidak mencukupi untuk produk ${product.name}. Stok tersedia: ${product.currentStock}, diminta: ${quantity}`,
        );
      }
      product.currentStock -= quantity;
    }

    await this.productRepository.save(product);
  }

  async create(createStockMovementDto: CreateStockMovementDto): Promise<StockMovement> {
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
      return result!;
    });
  }

  async findAll(): Promise<StockMovement[]> {
    return this.stockMovementRepository.find({
      relations: { warehouse: true, items: { product: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<StockMovement> {
    const stockMovement = await this.stockMovementRepository.findOne({
      where: { id },
      relations: { warehouse: true, items: { product: true } },
    });
    if (!stockMovement) {
      throw new NotFoundException(`Stock Movement dengan ID ${id} tidak ditemukan`);
    }
    return stockMovement;
  }

  async update(id: string, updateStockMovementDto: UpdateStockMovementDto): Promise<StockMovement> {
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
          await this.updateProductStock(oldItem.productId, oldItem.quantity,
            stockMovement.type === StockMovementType.IN ? StockMovementType.OUT : StockMovementType.IN);
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
        return result!;
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

  async remove(id: string): Promise<void> {
    const stockMovement = await this.findOne(id);

    return this.dataSource.transaction(async (manager) => {
      const items = await manager.find(StockMovementItem, {
        where: { stockMovementId: id },
      });

      for (const item of items) {
        await this.updateProductStock(item.productId, item.quantity,
          stockMovement.type === StockMovementType.IN ? StockMovementType.OUT : StockMovementType.IN);
      }

      await manager.delete(StockMovementItem, { stockMovementId: id });
      await manager.remove(stockMovement);
    });
  }

  async getStockReport(): Promise<{ productId: string; productName: string; sku: string; currentStock: number; minStock: number }[]> {
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
}