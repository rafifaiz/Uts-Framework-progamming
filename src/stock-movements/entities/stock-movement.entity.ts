import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Warehouse } from '../../warehouses/entities/warehouse.entity.js';
import { StockMovementItem } from '../../stock-movement-items/entities/stock-movement-item.entity.js';

export enum StockMovementType {
  IN = 'IN',
  OUT = 'OUT',
}

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: StockMovementType })
  type: StockMovementType;

  @Column({ length: 50, unique: true })
  referenceNumber: string;

  @Column({ type: 'date' })
  movementDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stockMovements, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  @Column({ type: 'uuid' })
  warehouseId: string;

  @OneToMany(
    () => StockMovementItem,
    (stockMovementItem) => stockMovementItem.stockMovement,
    { cascade: true },
  )
  items: StockMovementItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}