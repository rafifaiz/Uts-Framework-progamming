import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { CreateProductDto } from './dto/product.dto.js';
import { UpdateProductDto } from './dto/product.dto.js';
import { Category } from '../categories/entities/category.entity.js';
import { Supplier } from '../suppliers/entities/supplier.entity.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (createProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: createProductDto.categoryId },
      });
      if (!category) {
        throw new BadRequestException(`Category dengan ID ${createProductDto.categoryId} tidak ditemukan atau tidak ada`);
      }
    }

    // Validate supplierId if provided
    if (createProductDto.supplierId) {
      const supplier = await this.supplierRepository.findOne({
        where: { id: createProductDto.supplierId },
      });
      if (!supplier) {
        throw new BadRequestException(`Supplier dengan ID ${createProductDto.supplierId} tidak ditemukan`);
      }
    }

    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: { category: true, supplier: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true, supplier: true },
    });
    if (!product) {
      throw new NotFoundException(`Product dengan ID ${id} tidak ditemukan`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // Validate categoryId if provided
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });
      if (!category) {
        throw new BadRequestException(`Category dengan ID ${updateProductDto.categoryId} tidak ditemukan`);
      }
    }

    // Validate supplierId if provided
    if (updateProductDto.supplierId) {
      const supplier = await this.supplierRepository.findOne({
        where: { id: updateProductDto.supplierId },
      });
      if (!supplier) {
        throw new BadRequestException(`Supplier dengan ID ${updateProductDto.supplierId} tidak ditemukan`);
      }
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}