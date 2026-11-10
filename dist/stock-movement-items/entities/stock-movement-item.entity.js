var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { StockMovement } from '../../stock-movements/entities/stock-movement.entity.js';
import { Product } from '../../products/entities/product.entity.js';
let StockMovementItem = class StockMovementItem {
    id;
    quantity;
    unitPrice;
    stockMovement;
    stockMovementId;
    product;
    productId;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], StockMovementItem.prototype, "id", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], StockMovementItem.prototype, "quantity", void 0);
__decorate([
    Column({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], StockMovementItem.prototype, "unitPrice", void 0);
__decorate([
    ManyToOne(() => StockMovement, (stockMovement) => stockMovement.items, {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'stockMovementId' }),
    __metadata("design:type", StockMovement)
], StockMovementItem.prototype, "stockMovement", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], StockMovementItem.prototype, "stockMovementId", void 0);
__decorate([
    ManyToOne(() => Product, (product) => product.stockMovementItems, {
        onDelete: 'RESTRICT',
    }),
    JoinColumn({ name: 'productId' }),
    __metadata("design:type", Product)
], StockMovementItem.prototype, "product", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], StockMovementItem.prototype, "productId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], StockMovementItem.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], StockMovementItem.prototype, "updatedAt", void 0);
StockMovementItem = __decorate([
    Entity('stock_movement_items')
], StockMovementItem);
export { StockMovementItem };
//# sourceMappingURL=stock-movement-item.entity.js.map