var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMovementsController } from './stock-movements.controller.js';
import { StockMovementsService } from './stock-movements.service.js';
import { StockMovement } from './entities/stock-movement.entity.js';
import { StockMovementItem } from '../stock-movement-items/entities/stock-movement-item.entity.js';
import { Warehouse } from '../warehouses/entities/warehouse.entity.js';
import { Product } from '../products/entities/product.entity.js';
let StockMovementsModule = class StockMovementsModule {
};
StockMovementsModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([StockMovement, StockMovementItem, Warehouse, Product]),
        ],
        controllers: [StockMovementsController],
        providers: [StockMovementsService],
        exports: [StockMovementsService],
    })
], StockMovementsModule);
export { StockMovementsModule };
//# sourceMappingURL=stock-movements.module.js.map