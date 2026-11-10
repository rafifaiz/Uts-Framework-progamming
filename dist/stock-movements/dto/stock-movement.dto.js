var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEnum, IsString, IsOptional, IsDateString, IsArray, ValidateNested, MinLength, MaxLength, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StockMovementType } from '../entities/stock-movement.entity.js';
export class CreateStockMovementItemDto {
    productId;
    quantity;
    unitPrice;
}
__decorate([
    ApiProperty({ example: 'uuid-product-id' }),
    IsString(),
    __metadata("design:type", String)
], CreateStockMovementItemDto.prototype, "productId", void 0);
__decorate([
    ApiProperty({ example: 10, minimum: 1 }),
    IsNumber(),
    Min(1),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateStockMovementItemDto.prototype, "quantity", void 0);
__decorate([
    ApiProperty({ example: 12000000, minimum: 0 }),
    IsNumber({ maxDecimalPlaces: 2 }),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateStockMovementItemDto.prototype, "unitPrice", void 0);
export class CreateStockMovementDto {
    type;
    referenceNumber;
    movementDate;
    notes;
    warehouseId;
    items;
}
__decorate([
    ApiProperty({ enum: StockMovementType, example: StockMovementType.IN }),
    IsEnum(StockMovementType),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ example: 'IN-2024-001', minLength: 2, maxLength: 50 }),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "referenceNumber", void 0);
__decorate([
    ApiProperty({ example: '2024-01-15' }),
    IsDateString(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "movementDate", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Pembelian stok awal' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "notes", void 0);
__decorate([
    ApiProperty({ example: 'uuid-warehouse-id' }),
    IsString(),
    __metadata("design:type", String)
], CreateStockMovementDto.prototype, "warehouseId", void 0);
__decorate([
    ApiProperty({ type: [CreateStockMovementItemDto] }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => CreateStockMovementItemDto),
    __metadata("design:type", Array)
], CreateStockMovementDto.prototype, "items", void 0);
export class UpdateStockMovementDto {
    type;
    referenceNumber;
    movementDate;
    notes;
    warehouseId;
    items;
}
__decorate([
    ApiPropertyOptional({ enum: StockMovementType, example: StockMovementType.IN }),
    IsOptional(),
    IsEnum(StockMovementType),
    __metadata("design:type", String)
], UpdateStockMovementDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({ example: 'IN-2024-001', minLength: 2, maxLength: 50 }),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateStockMovementDto.prototype, "referenceNumber", void 0);
__decorate([
    ApiPropertyOptional({ example: '2024-01-15' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], UpdateStockMovementDto.prototype, "movementDate", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Pembelian stok awal' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateStockMovementDto.prototype, "notes", void 0);
__decorate([
    ApiPropertyOptional({ example: 'uuid-warehouse-id' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateStockMovementDto.prototype, "warehouseId", void 0);
__decorate([
    ApiPropertyOptional({ type: [CreateStockMovementItemDto] }),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => CreateStockMovementItemDto),
    __metadata("design:type", Array)
], UpdateStockMovementDto.prototype, "items", void 0);
//# sourceMappingURL=stock-movement.dto.js.map