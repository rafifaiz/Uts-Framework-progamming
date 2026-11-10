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
import { StockMovementsService } from './stock-movements.service.js';
import { CreateStockMovementDto } from './dto/stock-movement.dto.js';
import { UpdateStockMovementDto } from './dto/stock-movement.dto.js';
import { StockMovement } from './entities/stock-movement.entity.js';
let StockMovementsController = class StockMovementsController {
    stockMovementsService;
    constructor(stockMovementsService) {
        this.stockMovementsService = stockMovementsService;
    }
    async create(createStockMovementDto) {
        return this.stockMovementsService.create(createStockMovementDto);
    }
    async findAll() {
        return this.stockMovementsService.findAll();
    }
    async getStockReport() {
        return this.stockMovementsService.getStockReport();
    }
    async findOne(id) {
        return this.stockMovementsService.findOne(id);
    }
    async update(id, updateStockMovementDto) {
        return this.stockMovementsService.update(id, updateStockMovementDto);
    }
    async remove(id) {
        return this.stockMovementsService.remove(id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Buat transaksi stok baru (masuk/keluar)' }),
    ApiResponse({ status: 201, description: 'Transaksi stok berhasil dibuat', type: StockMovement }),
    ApiResponse({ status: 400, description: 'Validasi gagal atau stok tidak mencukupi' }),
    ApiResponse({ status: 409, description: 'Reference number sudah ada' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateStockMovementDto]),
    __metadata("design:returntype", Promise)
], StockMovementsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Ambil semua transaksi stok' }),
    ApiResponse({ status: 200, description: 'Daftar transaksi stok', type: [StockMovement] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockMovementsController.prototype, "findAll", null);
__decorate([
    Get('report/stock'),
    ApiOperation({ summary: 'Laporan stok produk' }),
    ApiResponse({ status: 200, description: 'Daftar stok produk' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockMovementsController.prototype, "getStockReport", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Ambil transaksi stok by ID' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Detail transaksi stok', type: StockMovement }),
    ApiResponse({ status: 404, description: 'Transaksi stok tidak ditemukan' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockMovementsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    ApiOperation({ summary: 'Update transaksi stok' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 200, description: 'Transaksi stok berhasil diupdate', type: StockMovement }),
    ApiResponse({ status: 400, description: 'Validasi gagal atau stok tidak mencukupi' }),
    ApiResponse({ status: 404, description: 'Transaksi stok tidak ditemukan' }),
    ApiResponse({ status: 409, description: 'Reference number sudah ada' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateStockMovementDto]),
    __metadata("design:returntype", Promise)
], StockMovementsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Hapus transaksi stok (stock akan dikembalikan)' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiResponse({ status: 204, description: 'Transaksi stok berhasil dihapus' }),
    ApiResponse({ status: 404, description: 'Transaksi stok tidak ditemukan' }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockMovementsController.prototype, "remove", null);
StockMovementsController = __decorate([
    ApiTags('Stock Movements'),
    Controller('stock-movements'),
    __metadata("design:paramtypes", [StockMovementsService])
], StockMovementsController);
export { StockMovementsController };
//# sourceMappingURL=stock-movements.controller.js.map