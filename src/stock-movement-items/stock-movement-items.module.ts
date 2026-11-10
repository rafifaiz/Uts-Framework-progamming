import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMovementItemsController } from './stock-movement-items.controller.js';
import { StockMovementItemsService } from './stock-movement-items.service.js';
import { StockMovementItem } from './entities/stock-movement-item.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([StockMovementItem])],
  controllers: [StockMovementItemsController],
  providers: [StockMovementItemsService],
  exports: [StockMovementItemsService],
})
export class StockMovementItemsModule {}