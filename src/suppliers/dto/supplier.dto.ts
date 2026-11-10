import { IsString, IsOptional, MaxLength, MinLength, IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({ example: 'PT Elektronik Jaya', minLength: 2, maxLength: 150 })
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({ example: 'Budi Santoso', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  contactPerson: string;

  @ApiPropertyOptional({ example: 'budi@elektronikjaya.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiPropertyOptional({ example: '+62211234567' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiPropertyOptional({ example: 'Jl. Sudirman No. 123, Jakarta' })
  @IsOptional()
  @IsString()
  address: string;
}

export class UpdateSupplierDto {
  @ApiPropertyOptional({ example: 'PT Elektronik Jaya', minLength: 2, maxLength: 150 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({ example: 'Budi Santoso', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  contactPerson: string;

  @ApiPropertyOptional({ example: 'budi@elektronikjaya.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiPropertyOptional({ example: '+62211234567' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiPropertyOptional({ example: 'Jl. Sudirman No. 123, Jakarta' })
  @IsOptional()
  @IsString()
  address: string;
}