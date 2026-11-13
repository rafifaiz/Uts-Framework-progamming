import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock_movement_items')
export class StockMovementItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @ManyToOne('StockMovement', 'items', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'stockMovementId' })
  stockMovement: any;

  @Column({ type: 'uuid' })
  stockMovementId: string;

  @ManyToOne('Product', 'stockMovementItems', {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'productId' })
  product: any;

  @Column({ type: 'uuid' })
  productId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}