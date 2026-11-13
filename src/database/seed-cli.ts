import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Category } from '../categories/entities/category.entity.js';
import { Supplier } from '../suppliers/entities/supplier.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { Warehouse } from '../warehouses/entities/warehouse.entity.js';
import { StockMovement } from '../stock-movements/entities/stock-movement.entity.js';
import { StockMovementItem } from '../stock-movement-items/entities/stock-movement-item.entity.js';
import { seed } from './seed.js';

const configService = new ConfigService();

const ENTITIES = [
  Category,
  Supplier,
  Product,
  Warehouse,
  StockMovement,
  StockMovementItem,
];

const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') ?? 'localhost',
  port: configService.get<number>('DB_PORT') ?? 5432,
  username: configService.get<string>('DB_USERNAME') ?? 'postgres',
  password: configService.get<string>('DB_PASSWORD') ?? 'postgres',
  database: configService.get<string>('DB_DATABASE') ?? 'inventory_db',
  entities: ENTITIES,
  synchronize: true,
  logging: true,
});

async function runSeed() {
  try {
    await dataSource.initialize();
    console.log('📦 Database connected');
    await seed(dataSource);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

runSeed();