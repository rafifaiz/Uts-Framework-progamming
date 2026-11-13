import { DataSource } from 'typeorm';
import { Category } from '../categories/entities/category.entity.js';
import { Supplier } from '../suppliers/entities/supplier.entity.js';
import { Warehouse } from '../warehouses/entities/warehouse.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { StockMovement, StockMovementType } from '../stock-movements/entities/stock-movement.entity.js';
import { StockMovementItem } from '../stock-movement-items/entities/stock-movement-item.entity.js';

export async function seed(dataSource: DataSource): Promise<void> {
  const categoryRepo = dataSource.getRepository(Category);
  const supplierRepo = dataSource.getRepository(Supplier);
  const warehouseRepo = dataSource.getRepository(Warehouse);
  const productRepo = dataSource.getRepository(Product);
  const stockMovementRepo = dataSource.getRepository(StockMovement);
  const stockMovementItemRepo = dataSource.getRepository(StockMovementItem);

  console.log('🌱 Starting database seed...');

  // Clear existing data (in reverse order of dependencies)
  await stockMovementItemRepo.clear();
  await stockMovementRepo.clear();
  await productRepo.clear();
  await warehouseRepo.clear();
  await supplierRepo.clear();
  await categoryRepo.clear();

  // 1. Categories
  const categories = await categoryRepo.save([
    categoryRepo.create({ name: 'Elektronik', description: 'Produk elektronik dan gadget' }),
    categoryRepo.create({ name: 'Fashion', description: 'Pakaian dan aksesoris' }),
    categoryRepo.create({ name: 'Makanan & Minuman', description: 'Produk konsumsi' }),
  ]);
  console.log(`✅ Created ${categories.length} categories`);

  // 2. Suppliers
  const suppliers = await supplierRepo.save([
    supplierRepo.create({
      name: 'PT Elektrindo Jaya',
      contactPerson: 'Budi Santoso',
      email: 'budi@elektrindo.co.id',
      phone: '021-5550101',
      address: 'Jl. Industri No. 10, Jakarta Utara',
    }),
    supplierRepo.create({
      name: 'CV Fashion Kita',
      contactPerson: 'Siti Rahayu',
      email: 'siti@fashionkita.com',
      phone: '021-5550202',
      address: 'Jl. Textile No. 25, Bandung',
    }),
    supplierRepo.create({
      name: 'UD Berkah Makanan',
      contactPerson: 'Ahmad Wijaya',
      email: 'ahmad@berkahfood.com',
      phone: '021-5550303',
      address: 'Jl. Raya Bogor KM 15, Depok',
    }),
  ]);
  console.log(`✅ Created ${suppliers.length} suppliers`);

  // 3. Warehouses
  const warehouses = await warehouseRepo.save([
    warehouseRepo.create({
      name: 'Gudang Utama Jakarta',
      address: 'Jl. Gudang No. 1',
      city: 'Jakarta',
      manager: 'Andi Wijaya',
    }),
    warehouseRepo.create({
      name: 'Gudang Cabang Bandung',
      address: 'Jl. Industri No. 5',
      city: 'Bandung',
      manager: 'Rina Sari',
    }),
  ]);
  console.log(`✅ Created ${warehouses.length} warehouses`);

  // 4. Products
  const products = await productRepo.save([
    productRepo.create({
      name: 'Laptop Gaming ASUS ROG',
      sku: 'LAP-ROG-001',
      description: 'Laptop gaming high-end RTX 4080',
      price: 25000000,
      currentStock: 0,
      minStock: 3,
      maxStock: 20,
      categoryId: categories[0].id,
      supplierId: suppliers[0].id,
    }),
    productRepo.create({
      name: 'Mouse Wireless Logitech',
      sku: 'MSE-LOG-001',
      description: 'Mouse wireless ergonomis',
      price: 350000,
      currentStock: 0,
      minStock: 10,
      maxStock: 100,
      categoryId: categories[0].id,
      supplierId: suppliers[0].id,
    }),
    productRepo.create({
      name: 'Kaos Polos Cotton Combed',
      sku: 'KAS-POL-001',
      description: 'Kaos polos bahan cotton combed 30s',
      price: 75000,
      currentStock: 0,
      minStock: 50,
      maxStock: 500,
      categoryId: categories[1].id,
      supplierId: suppliers[1].id,
    }),
    productRepo.create({
      name: 'Celana Jeans Slimfit',
      sku: 'CLN-JNS-001',
      description: 'Celana jeans slimfit stretch',
      price: 180000,
      currentStock: 0,
      minStock: 20,
      maxStock: 200,
      categoryId: categories[1].id,
      supplierId: suppliers[1].id,
    }),
    productRepo.create({
      name: 'Kopi Robusta Giling',
      sku: 'KOP-ROB-001',
      description: 'Kopi robusta giling 250gr',
      price: 45000,
      currentStock: 0,
      minStock: 30,
      maxStock: 300,
      categoryId: categories[2].id,
      supplierId: suppliers[2].id,
    }),
  ]);
  console.log(`✅ Created ${products.length} products`);

  // 5. Stock Movements - IN (pembelian stok awal)
  const movementIn1 = await stockMovementRepo.save(
    stockMovementRepo.create({
      type: StockMovementType.IN,
      referenceNumber: 'IN-2024-001',
      movementDate: new Date('2024-01-15'),
      notes: 'Pembelian stok awal bulan Januari',
      warehouseId: warehouses[0].id,
    })
  );

  await stockMovementItemRepo.save([
    stockMovementItemRepo.create({
      quantity: 10,
      unitPrice: 22000000,
      stockMovementId: movementIn1.id,
      productId: products[0].id, // Laptop
    }),
    stockMovementItemRepo.create({
      quantity: 50,
      unitPrice: 300000,
      stockMovementId: movementIn1.id,
      productId: products[1].id, // Mouse
    }),
    stockMovementItemRepo.create({
      quantity: 100,
      unitPrice: 60000,
      stockMovementId: movementIn1.id,
      productId: products[2].id, // Kaos
    }),
    stockMovementItemRepo.create({
      quantity: 50,
      unitPrice: 150000,
      stockMovementId: movementIn1.id,
      productId: products[3].id, // Jeans
    }),
  ]);

  // Update product stock manually for seed (since we bypass service)
  await productRepo.increment({ id: products[0].id }, 'currentStock', 10);
  await productRepo.increment({ id: products[1].id }, 'currentStock', 50);
  await productRepo.increment({ id: products[2].id }, 'currentStock', 100);
  await productRepo.increment({ id: products[3].id }, 'currentStock', 50);

  console.log(`✅ Created stock IN movement: ${movementIn1.referenceNumber}`);

  // 6. Stock Movement - IN (gudang Bandung)
  const movementIn2 = await stockMovementRepo.save(
    stockMovementRepo.create({
      type: StockMovementType.IN,
      referenceNumber: 'IN-2024-002',
      movementDate: new Date('2024-01-20'),
      notes: 'Pembelian stok gudang Bandung',
      warehouseId: warehouses[1].id,
    })
  );

  await stockMovementItemRepo.save([
    stockMovementItemRepo.create({
      quantity: 5,
      unitPrice: 22000000,
      stockMovementId: movementIn2.id,
      productId: products[0].id,
    }),
    stockMovementItemRepo.create({
      quantity: 200,
      unitPrice: 40000,
      stockMovementId: movementIn2.id,
      productId: products[4].id, // Kopi
    }),
  ]);

  await productRepo.increment({ id: products[0].id }, 'currentStock', 5);
  await productRepo.increment({ id: products[4].id }, 'currentStock', 200);

  console.log(`✅ Created stock IN movement: ${movementIn2.referenceNumber}`);

  // 7. Stock Movement - OUT (penjualan)
  const movementOut1 = await stockMovementRepo.save(
    stockMovementRepo.create({
      type: StockMovementType.OUT,
      referenceNumber: 'OUT-2024-001',
      movementDate: new Date('2024-01-25'),
      notes: 'Penjualan ke toko retail',
      warehouseId: warehouses[0].id,
    })
  );

  await stockMovementItemRepo.save([
    stockMovementItemRepo.create({
      quantity: 2,
      unitPrice: 25000000,
      stockMovementId: movementOut1.id,
      productId: products[0].id,
    }),
    stockMovementItemRepo.create({
      quantity: 5,
      unitPrice: 350000,
      stockMovementId: movementOut1.id,
      productId: products[1].id,
    }),
    stockMovementItemRepo.create({
      quantity: 10,
      unitPrice: 75000,
      stockMovementId: movementOut1.id,
      productId: products[2].id,
    }),
  ]);

  await productRepo.decrement({ id: products[0].id }, 'currentStock', 2);
  await productRepo.decrement({ id: products[1].id }, 'currentStock', 5);
  await productRepo.decrement({ id: products[2].id }, 'currentStock', 10);

  console.log(`✅ Created stock OUT movement: ${movementOut1.referenceNumber}`);

  // 8. Stock Movement - OUT (penjualan online)
  const movementOut2 = await stockMovementRepo.save(
    stockMovementRepo.create({
      type: StockMovementType.OUT,
      referenceNumber: 'OUT-2024-002',
      movementDate: new Date('2024-02-01'),
      notes: 'Penjualan online marketplace',
      warehouseId: warehouses[0].id,
    })
  );

  await stockMovementItemRepo.save([
    stockMovementItemRepo.create({
      quantity: 3,
      unitPrice: 180000,
      stockMovementId: movementOut2.id,
      productId: products[3].id,
    }),
    stockMovementItemRepo.create({
      quantity: 20,
      unitPrice: 45000,
      stockMovementId: movementOut2.id,
      productId: products[4].id,
    }),
  ]);

  await productRepo.decrement({ id: products[3].id }, 'currentStock', 3);
  await productRepo.decrement({ id: products[4].id }, 'currentStock', 20);

  console.log(`✅ Created stock OUT movement: ${movementOut2.referenceNumber}`);

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Suppliers: ${suppliers.length}`);
  console.log(`   Warehouses: ${warehouses.length}`);
  console.log(`   Products: ${products.length}`);
  console.log(`   Stock Movements: 4 (2 IN, 2 OUT)`);
  console.log('\n🚀 Ready for demo!');
  console.log('   Swagger: http://localhost:3000/api/docs');
  console.log('   Test stock report: GET /api/stock-movements/report/stock');
}