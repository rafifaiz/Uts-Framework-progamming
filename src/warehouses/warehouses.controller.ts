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
import { WarehousesService } from './warehouses.service.js';
import { CreateWarehouseDto } from './dto/warehouse.dto.js';
import { UpdateWarehouseDto } from './dto/warehouse.dto.js';
import { Warehouse } from './entities/warehouse.entity.js';

// Dibuat oleh: Rizki Ramadhan
@ApiTags('Warehouses') 
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  @ApiOperation({ summary: 'Buat warehouse baru' })
  @ApiResponse({ status: 201, description: 'Warehouse berhasil dibuat', type: Warehouse })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  async create(@Body() createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua warehouse' })
  @ApiResponse({ status: 200, description: 'Daftar warehouse', type: [Warehouse] })
  async findAll(): Promise<Warehouse[]> {
    return this.warehousesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil warehouse by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Detail warehouse', type: Warehouse })
  @ApiResponse({ status: 404, description: 'Warehouse tidak ditemukan' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Warehouse> {
    return this.warehousesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update warehouse' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Warehouse berhasil diupdate', type: Warehouse })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 404, description: 'Warehouse tidak ditemukan' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    return this.warehousesService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Hapus warehouse' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Warehouse berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Warehouse tidak ditemukan' })
  @ApiResponse({ status: 409, description: 'Warehouse memiliki transaksi stok terkait' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.warehousesService.remove(id);
  }
}