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
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/product.dto.js';
import { UpdateProductDto } from './dto/product.dto.js';
import { Product } from './entities/product.entity.js';
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    async findAll() {
        return this.productsService.findAll();
    }
    async findOne(id) {
        return this.productsService.findOne(id);
    }
    async update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    async remove(id) {
        return this.productsService.remove(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Buat produk baru' }),
    ApiResponse({ status: 201, description: 'Produk berhasil dibuat', type: Product }),
    ApiResponse({ status: 400, description: 'Validasi gagal' }),
    ApiResponse({ status: 409, description: 'SKU sudah ada' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Ambil semua produk' }),
    ApiResponse({ status: 200, description: 'Daftar produk', type: [Product] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Ambil produk by ID' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Detail produk', type: Product }),
    ApiResponse({ status: 404, description: 'Produk tidak ditemukan' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Update produk' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Produk berhasil diupdate', type: Product }),
    ApiResponse({ status: 400, description: 'Validasi gagal' }),
    ApiResponse({ status: 404, description: 'Produk tidak ditemukan' }),
    ApiResponse({ status: 409, description: 'SKU sudah ada' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Hapus produk' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 204, description: 'Produk berhasil dihapus' }),
    ApiResponse({ status: 404, description: 'Produk tidak ditemukan' }),
    ApiResponse({ status: 409, description: 'Produk memiliki transaksi stok terkait' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
ProductsController = __decorate([
    ApiTags('Products'),
    Controller('products'),
    __metadata("design:paramtypes", [ProductsService])
], ProductsController);
export { ProductsController };
//# sourceMappingURL=products.controller.js.map