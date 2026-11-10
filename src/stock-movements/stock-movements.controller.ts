import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StockMovementsService } from './stock-movements.service.js';
import { CreateStockMovementDto } from './dto/stock-movement.dto.js';
import { UpdateStockMovementDto } from './dto/stock-movement.dto.js';
import { StockMovement } from './entities/stock-movement.entity.js';

@ApiTags('Stock Movements')
@Controller('stock-movements')
export class StockMovementsController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Post()
  @ApiOperation({ summary: 'Buat transaksi stok baru (masuk/keluar)' })
  @ApiResponse({ status: 201, description: 'Transaksi stok berhasil dibuat', type: StockMovement })
  @ApiResponse({ status: 400, description: 'Validasi gagal atau stok tidak mencukupi' })
  @ApiResponse({ status: 409, description: 'Reference number sudah ada' })
  async create(@Body() createStockMovementDto: CreateStockMovementDto): Promise<StockMovement> {
    return this.stockMovementsService.create(createStockMovementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua transaksi stok' })
  @ApiResponse({ status: 200, description: 'Daftar transaksi stok', type: [StockMovement] })
  async findAll(): Promise<StockMovement[]> {
    return this.stockMovementsService.findAll();
  }

  @Get('report/stock')
  @ApiOperation({ summary: 'Laporan stok produk' })
  @ApiResponse({ status: 200, description: 'Daftar stok produk' })
  async getStockReport() {
    return this.stockMovementsService.getStockReport();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil transaksi stok by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Detail transaksi stok', type: StockMovement })
  @ApiResponse({ status: 404, description: 'Transaksi stok tidak ditemukan atau hilang' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<StockMovement> {
    return this.stockMovementsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaksi stok' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Transaksi stok berhasil diupdate', type: StockMovement })
  @ApiResponse({ status: 400, description: 'Validasi gagal atau stok tidak mencukupi' })
  @ApiResponse({ status: 404, description: 'Transaksi stok tidak ditemukan' })
  @ApiResponse({ status: 409, description: 'Reference number sudah ada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStockMovementDto: UpdateStockMovementDto,
  ): Promise<StockMovement> {
    return this.stockMovementsService.update(id, updateStockMovementDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Hapus transaksi stok (stock akan dikembalikan)' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Transaksi stok berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Transaksi stok tidak ditemukan' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.stockMovementsService.remove(id);
  }
}