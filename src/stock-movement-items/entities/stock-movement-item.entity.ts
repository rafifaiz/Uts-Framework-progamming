import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StockMovement } from '../../stock-movements/entities/stock-movement.entity.js';
import { Product } from '../../products/entities/product.entity.js';

@Entity('stock_movement_items')
export class StockMovementItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @ManyToOne(() => StockMovement, (stockMovement) => stockMovement.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'stockMovementId' })
  stockMovement: StockMovement;

  @Column({ type: 'uuid' })
  stockMovementId: string;

  @ManyToOne(() => Product, (product) => product.stockMovementItems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'uuid' })
  productId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}