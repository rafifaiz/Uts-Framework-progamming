var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { Warehouse } from '../../warehouses/entities/warehouse.entity.js';
import { StockMovementItem } from '../../stock-movement-items/entities/stock-movement-item.entity.js';
export var StockMovementType;
(function (StockMovementType) {
    StockMovementType["IN"] = "IN";
    StockMovementType["OUT"] = "OUT";
})(StockMovementType || (StockMovementType = {}));
let StockMovement = class StockMovement {
    id;
    type;
    referenceNumber;
    movementDate;
    notes;
    warehouse;
    warehouseId;
    items;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], StockMovement.prototype, "id", void 0);
__decorate([
    Column({ type: 'enum', enum: StockMovementType }),
    __metadata("design:type", String)
], StockMovement.prototype, "type", void 0);
__decorate([
    Column({ length: 50, unique: true }),
    __metadata("design:type", String)
], StockMovement.prototype, "referenceNumber", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", Date)
], StockMovement.prototype, "movementDate", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StockMovement.prototype, "notes", void 0);
__decorate([
    ManyToOne(() => Warehouse, (warehouse) => warehouse.stockMovements, {
        onDelete: 'RESTRICT',
    }),
    JoinColumn({ name: 'warehouseId' }),
    __metadata("design:type", Warehouse)
], StockMovement.prototype, "warehouse", void 0);
__decorate([
    Column({ type: 'uuid' }),
    __metadata("design:type", String)
], StockMovement.prototype, "warehouseId", void 0);
__decorate([
    OneToMany(() => StockMovementItem, (stockMovementItem) => stockMovementItem.stockMovement, { cascade: true }),
    __metadata("design:type", Array)
], StockMovement.prototype, "items", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], StockMovement.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], StockMovement.prototype, "updatedAt", void 0);
StockMovement = __decorate([
    Entity('stock_movements')
], StockMovement);
export { StockMovement };
//# sourceMappingURL=stock-movement.entity.js.map