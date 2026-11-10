import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @ApiProperty({ example: 'Gudang Utama Jakarta', minLength: 2, maxLength: 100 })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Jl. Gatot Subroto No. 456' })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: 'Jakarta Selatan', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiPropertyOptional({ example: 'Ahmad Wijaya', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  manager: string;
}

export class UpdateWarehouseDto {
  @ApiPropertyOptional({ example: 'Gudang Utama Jakarta', minLength: 2, maxLength: 100 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Jl. Gatot Subroto No. 456' })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: 'Jakarta Selatan', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiPropertyOptional({ example: 'Ahmad Wijaya', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  manager: string;
}