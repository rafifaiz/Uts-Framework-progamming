var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsOptional, MaxLength, MinLength, IsNumber, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateProductDto {
    name;
    sku;
    description;
    price;
    minStock;
    maxStock;
    categoryId;
    supplierId;
}
__decorate([
    ApiProperty({ example: 'Laptop Gaming ASUS ROG', minLength: 2, maxLength: 150 }),
    IsString(),
    MinLength(2),
    MaxLength(150),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'LAP-GAM-ASUS-001', minLength: 2, maxLength: 100 }),
    IsString(),
    MinLength(2),
    MaxLength(100),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sku", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Laptop gaming performa tinggi', maxLength: 1000 }),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ example: 15000000, minimum: 0 }),
    IsNumber({ maxDecimalPlaces: 2 }),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    ApiPropertyOptional({ example: 5, minimum: 0 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "minStock", void 0);
__decorate([
    ApiPropertyOptional({ example: 100, minimum: 0 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "maxStock", void 0);
__decorate([
    ApiPropertyOptional({ example: 'uuid-category-id' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'uuid-supplier-id' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "supplierId", void 0);
export class UpdateProductDto {
    name;
    sku;
    description;
    price;
    minStock;
    maxStock;
    categoryId;
    supplierId;
}
__decorate([
    ApiPropertyOptional({ example: 'Laptop Gaming ASUS ROG', minLength: 2, maxLength: 150 }),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(150),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'LAP-GAM-ASUS-001', minLength: 2, maxLength: 100 }),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "sku", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Laptop gaming performa tinggi', maxLength: 1000 }),
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ example: 15000000, minimum: 0 }),
    IsOptional(),
    IsNumber({ maxDecimalPlaces: 2 }),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    ApiPropertyOptional({ example: 5, minimum: 0 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "minStock", void 0);
__decorate([
    ApiPropertyOptional({ example: 100, minimum: 0 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    Type(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "maxStock", void 0);
__decorate([
    ApiPropertyOptional({ example: 'uuid-category-id' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "categoryId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'uuid-supplier-id' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "supplierId", void 0);
//# sourceMappingURL=product.dto.js.map