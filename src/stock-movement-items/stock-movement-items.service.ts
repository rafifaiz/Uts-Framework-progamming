import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockMovementItem } from './entities/stock-movement-item.entity.js';

@Injectable()
export class StockMovementItemsService {
  constructor(
    @InjectRepository(StockMovementItem)
    private readonly itemRepository: Repository<StockMovementItem>,
  ) {}

  async findAll(): Promise<StockMovementItem[]> {
    return this.itemRepository.find({
      relations: { stockMovement: true, product: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findByStockMovement(stockMovementId: string): Promise<StockMovementItem[]> {
    return this.itemRepository.find({
      where: { stockMovementId },
      relations: { product: true },
    });
  }

  async findOne(id: string): Promise<StockMovementItem> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: { stockMovement: true, product: true },
    });
    if (!item) {
      throw new NotFoundException(`Stock Movement Item dengan ID ${id} tidak ditemukan`);
    }
    return item;
  }
}