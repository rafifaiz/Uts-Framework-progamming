import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StockMovementItemsService } from './stock-movement-items.service.js';
import { StockMovementItem } from './entities/stock-movement-item.entity.js';

@ApiTags('Stock Movement Items')
@Controller('stock-movement-items')
export class StockMovementItemsController {
  constructor(private readonly itemsService: StockMovementItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua item transaksi stok' })
  @ApiResponse({ status: 200, description: 'Daftar item transaksi stok', type: [StockMovementItem] })
  async findAll(): Promise<StockMovementItem[]> {
    return this.itemsService.findAll();
  }

  @Get('movement/:stockMovementId')
  @ApiOperation({ summary: 'Ambil item berdasarkan stock movement ID' })
  @ApiParam({ name: 'stockMovementId', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Daftar item', type: [StockMovementItem] })
  async findByStockMovement(@Param('stockMovementId', ParseUUIDPipe) stockMovementId: string): Promise<StockMovementItem[]> {
    return this.itemsService.findByStockMovement(stockMovementId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil item by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Detail item', type: StockMovementItem })
  @ApiResponse({ status: 404, description: 'Item tidak ditemukan atau tidak ada' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<StockMovementItem> {
    return this.itemsService.findOne(id);
  }
}