import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { CategoriesModule } from './categories/categories.module.js';
import { Category } from './categories/entities/category.entity.js';

import { ProductsModule } from './products/products.module.js';
import { Product } from './products/entities/product.entity.js';

import { SuppliersModule } from './suppliers/suppliers.module.js';
import { Supplier } from './suppliers/entities/supplier.entity.js';

import { WarehousesModule } from './warehouses/warehouses.module.js';
import { Warehouse } from './warehouses/entities/warehouse.entity.js';

import { StockMovementsModule } from './stock-movements/stock-movements.module.js';
import { StockMovement } from './stock-movements/entities/stock-movement.entity.js';

import { StockMovementItemsModule } from './stock-movement-items/stock-movement-items.module.js';
import { StockMovementItem } from './stock-movement-items/entities/stock-movement-item.entity.js';

export const INVENTORY_ENTITIES = [
  Category,
  Supplier,
  Product,
  Warehouse,
  StockMovement,
  StockMovementItem,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().truthy('true').falsy('false').default(true),
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: INVENTORY_ENTITIES,
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),

    CategoriesModule,
    SuppliersModule,
    ProductsModule,
    WarehousesModule,
    StockMovementsModule,
    StockMovementItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}