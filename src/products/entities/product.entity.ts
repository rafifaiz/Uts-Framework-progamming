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

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100, unique: true })
  sku: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  currentStock: number;

  @Column({ type: 'int', default: 0 })
  minStock: number;

  @Column({ type: 'int', default: 0 })
  maxStock: number;

  @ManyToOne('Category', 'products', {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: any;

  @Column({ type: 'uuid', nullable: true })
  categoryId: string;

  @ManyToOne('Supplier', 'products', {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'supplierId' })
  supplier: any;

  @Column({ type: 'uuid', nullable: true })
  supplierId: string;

  @OneToMany('StockMovementItem', 'product')
  stockMovementItems: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}