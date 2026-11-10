import { IsEnum, IsString, IsOptional, IsDateString, IsArray, ValidateNested, MinLength, MaxLength, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StockMovementType } from '../entities/stock-movement.entity.js';

export class CreateStockMovementItemDto {
  @ApiProperty({ example: 'uuid-product-id' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 10, minimum: 1 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ example: 12000000, minimum: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  unitPrice: number;
}

export class CreateStockMovementDto {
  @ApiProperty({ enum: StockMovementType, example: StockMovementType.IN })
  @IsEnum(StockMovementType)
  type: StockMovementType;

  @ApiProperty({ example: 'IN-2024-001', minLength: 2, maxLength: 50 })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  referenceNumber: string;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  movementDate: string;

  @ApiPropertyOptional({ example: 'Pembelian stok awal' })
  @IsOptional()
  @IsString()
  notes: string;

  @ApiProperty({ example: 'uuid-warehouse-id' })
  @IsString()
  warehouseId: string;

  @ApiProperty({ type: [CreateStockMovementItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStockMovementItemDto)
  items: CreateStockMovementItemDto[];
}

export class UpdateStockMovementDto {
  @ApiPropertyOptional({ enum: StockMovementType, example: StockMovementType.IN })
  @IsOptional()
  @IsEnum(StockMovementType)
  type: StockMovementType;

  @ApiPropertyOptional({ example: 'IN-2024-001', minLength: 2, maxLength: 50 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  referenceNumber: string;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  movementDate: string;

  @ApiPropertyOptional({ example: 'Pembelian stok awal' })
  @IsOptional()
  @IsString()
  notes: string;

  @ApiPropertyOptional({ example: 'uuid-warehouse-id' })
  @IsOptional()
  @IsString()
  warehouseId: string;

  @ApiPropertyOptional({ type: [CreateStockMovementItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStockMovementItemDto)
  items: CreateStockMovementItemDto[];
}