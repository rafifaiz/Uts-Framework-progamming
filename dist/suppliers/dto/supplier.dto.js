var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsOptional, MaxLength, MinLength, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateSupplierDto {
    name;
    contactPerson;
    email;
    phone;
    address;
}
__decorate([
    ApiProperty({ example: 'PT Elektronik Jaya', minLength: 2, maxLength: 150 }),
    IsString(),
    MinLength(2),
    MaxLength(150),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Budi Santoso', maxLength: 200 }),
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "contactPerson", void 0);
__decorate([
    ApiPropertyOptional({ example: 'budi@elektronikjaya.com' }),
    IsOptional(),
    IsEmail(),
    MaxLength(100),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ example: '+62211234567' }),
    IsOptional(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Jl. Sudirman No. 123, Jakarta' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateSupplierDto.prototype, "address", void 0);
export class UpdateSupplierDto {
    name;
    contactPerson;
    email;
    phone;
    address;
}
__decorate([
    ApiPropertyOptional({ example: 'PT Elektronik Jaya', minLength: 2, maxLength: 150 }),
    IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(150),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Budi Santoso', maxLength: 200 }),
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "contactPerson", void 0);
__decorate([
    ApiPropertyOptional({ example: 'budi@elektronikjaya.com' }),
    IsOptional(),
    IsEmail(),
    MaxLength(100),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ example: '+62211234567' }),
    IsOptional(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Jl. Sudirman No. 123, Jakarta' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "address", void 0);
//# sourceMappingURL=supplier.dto.js.map