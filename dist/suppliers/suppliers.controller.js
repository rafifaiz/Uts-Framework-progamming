var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service.js';
import { CreateSupplierDto } from './dto/supplier.dto.js';
import { UpdateSupplierDto } from './dto/supplier.dto.js';
import { Supplier } from './entities/supplier.entity.js';
let SuppliersController = class SuppliersController {
    suppliersService;
    constructor(suppliersService) {
        this.suppliersService = suppliersService;
    }
    async create(createSupplierDto) {
        return this.suppliersService.create(createSupplierDto);
    }
    async findAll() {
        return this.suppliersService.findAll();
    }
    async findOne(id) {
        return this.suppliersService.findOne(id);
    }
    async update(id, updateSupplierDto) {
        return this.suppliersService.update(id, updateSupplierDto);
    }
    async remove(id) {
        return this.suppliersService.remove(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Buat supplier baru' }),
    ApiResponse({ status: 201, description: 'Supplier berhasil dibuat', type: Supplier }),
    ApiResponse({ status: 400, description: 'Validasi gagal' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSupplierDto]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Ambil semua supplier' }),
    ApiResponse({ status: 200, description: 'Daftar supplier', type: [Supplier] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Ambil supplier by ID' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Detail supplier', type: Supplier }),
    ApiResponse({ status: 404, description: 'Supplier tidak ditemukan' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Update supplier' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Supplier berhasil diupdate', type: Supplier }),
    ApiResponse({ status: 400, description: 'Validasi gagal' }),
    ApiResponse({ status: 404, description: 'Supplier tidak ditemukan' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSupplierDto]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Hapus supplier' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 204, description: 'Supplier berhasil dihapus' }),
    ApiResponse({ status: 404, description: 'Supplier tidak ditemukan' }),
    ApiResponse({ status: 409, description: 'Supplier memiliki produk terkait' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "remove", null);
SuppliersController = __decorate([
    ApiTags('Suppliers'),
    Controller('suppliers'),
    __metadata("design:paramtypes", [SuppliersService])
], SuppliersController);
export { SuppliersController };
//# sourceMappingURL=suppliers.controller.js.map