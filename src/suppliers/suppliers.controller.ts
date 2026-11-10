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
import { SuppliersService } from './suppliers.service.js';
import { CreateSupplierDto } from './dto/supplier.dto.js';
import { UpdateSupplierDto } from './dto/supplier.dto.js';
import { Supplier } from './entities/supplier.entity.js';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Buat supplier baru' })
  @ApiResponse({ status: 201, description: 'Supplier berhasil dibuat', type: Supplier })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  async create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua supplier' })
  @ApiResponse({ status: 200, description: 'Daftar supplier', type: [Supplier] })
  async findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil supplier by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Detail supplier', type: Supplier })
  @ApiResponse({ status: 404, description: 'Supplier tidak ditemukan atau tidak ada' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update supplier' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Supplier berhasil diupdate', type: Supplier })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 404, description: 'Supplier tidak ditemukan atau tidak ada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Hapus supplier' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Supplier berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Supplier tidak ditemukan atau hilang' })
  @ApiResponse({ status: 409, description: 'Supplier memiliki produk terkait' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.suppliersService.remove(id);
  }
}