var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateWarehouseDto {
    name;
    address;
    city;
    manager;
}
__decorate([
    ApiProperty({ example: 'Gudang Utama Jakarta', minLength: 2, maxLength: 100 }),
    IsString(),
    MinLength(2),
    MaxLength(100),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Jl. Gatot Subroto No. 456' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Jakarta Selatan', maxLength: 100 }),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "city", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Ahmad Wijaya', maxLength: 50 }),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "manager", void 0);
export class UpdateWarehouseDto {
    name;
    address;
    city;
    manager;
}
__decorate([
    ApiPropertyOptional({ example: 'Gudang Utama Jakarta', minLength: 2, maxLength: 100 }),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Jl. Gatot Subroto No. 456' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Jakarta Selatan', maxLength: 100 }),
    IsOptional(),
    IsString(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "city", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Ahmad Wijaya', maxLength: 50 }),
    IsOptional(),
    IsString(),
    MaxLength(50),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "manager", void 0);
//# sourceMappingURL=warehouse.dto.js.map