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
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { Category } from '../categories/entities/category.entity.js';
import { Supplier } from '../suppliers/entities/supplier.entity.js';
let ProductsService = class ProductsService {
    productRepository;
    categoryRepository;
    supplierRepository;
    constructor(productRepository, categoryRepository, supplierRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
    }
    async create(createProductDto) {
        if (createProductDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: createProductDto.categoryId },
            });
            if (!category) {
                throw new BadRequestException(`Category dengan ID ${createProductDto.categoryId} tidak ditemukan`);
            }
        }
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
    async findAll() {
        return this.productRepository.find({
            relations: { category: true, supplier: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: { category: true, supplier: true },
        });
        if (!product) {
            throw new NotFoundException(`Product dengan ID ${id} tidak ditemukan`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        if (updateProductDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: updateProductDto.categoryId },
            });
            if (!category) {
                throw new BadRequestException(`Category dengan ID ${updateProductDto.categoryId} tidak ditemukan`);
            }
        }
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
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
};
ProductsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Product)),
    __param(1, InjectRepository(Category)),
    __param(2, InjectRepository(Supplier)),
    __metadata("design:paramtypes", [Repository,
        Repository,
        Repository])
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map