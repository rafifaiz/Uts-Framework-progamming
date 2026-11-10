# Inventory Management System - NestJS Backend

Backend untuk sistem manajemen persediaan barang (Studi Kasus 1 - UTS Framework Programming).

## Entitas Utama

| Entitas | Deskripsi |
|---------|-----------|
| **Categories** | Kategori produk |
| **Suppliers** | Data pemasok |
| **Products** | Produk dengan stok, harga, relasi ke kategori & supplier |
| **Warehouses** | Gudang penyimpanan |
| **StockMovements** | Transaksi barang masuk/keluar |
| **StockMovementItems** | Detail item dalam transaksi stok |

## Relasi Database

- 1 Category → Many Products
- 1 Supplier → Many Products
- 1 Warehouse → Many StockMovements
- 1 StockMovement → Many StockMovementItems
- 1 Product → Many StockMovementItems

##  Quick Start

### Prasyarat
- Node.js 18+
- PostgreSQL 14+ (atau Docker)

### 1. Clone & Install
```bash
cd uts-inventory
npm install
```

### 2. Setup Database
```bash
# Jalankan PostgreSQL via Docker
docker-compose up -d

# Atau buat database manual di PostgreSQL lokal
# CREATE DATABASE inventory_db;
```

### 3. Konfigurasi Environment
```bash
# Copy .env dan sesuaikan jika perlu
cp .env.example .env
```

Default `.env`:
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=inventory_db
DB_SYNCHRONIZE=true
```

### 4. Jalankan Aplikasi
```bash
# Development (auto-reload)
npm run start:dev

# Production
npm run build && npm run start:prod
```

Server berjalan di: `http://localhost:3000`
API Prefix: `/api`
Swagger Docs: `http://localhost:3000/api/docs`

##  API Endpoints

### Categories
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/categories` | Buat kategori |
| GET | `/api/categories` | List semua kategori |
| GET | `/api/categories/:id` | Detail kategori |
| PATCH | `/api/categories/:id` | Update kategori |
| DELETE | `/api/categories/:id` | Hapus kategori |

### Suppliers
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/suppliers` | Buat supplier |
| GET | `/api/suppliers` | List semua supplier |
| GET | `/api/suppliers/:id` | Detail supplier |
| PATCH | `/api/suppliers/:id` | Update supplier |
| DELETE | `/api/suppliers/:id` | Hapus supplier |

### Products
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/products` | Buat produk |
| GET | `/api/products` | List semua produk |
| GET | `/api/products/:id` | Detail produk |
| PATCH | `/api/products/:id` | Update produk |
| DELETE | `/api/products/:id` | Hapus produk |

### Warehouses
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/warehouses` | Buat warehouse |
| GET | `/api/warehouses` | List semua warehouse |
| GET | `/api/warehouses/:id` | Detail warehouse |
| PATCH | `/api/warehouses/:id` | Update warehouse |
| DELETE | `/api/warehouses/:id` | Hapus warehouse |

### Stock Movements
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/stock-movements` | Buat transaksi stok (IN/OUT) |
| GET | `/api/stock-movements` | List semua transaksi |
| GET | `/api/stock-movements/report/stock` | Laporan stok produk |
| GET | `/api/stock-movements/:id` | Detail transaksi |
| PATCH | `/api/stock-movements/:id` | Update transaksi |
| DELETE | `/api/stock-movements/:id` | Hapus transaksi (stok dikembalikan) |

### Stock Movement Items
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/stock-movement-items` | List semua item |
| GET | `/api/stock-movement-items/movement/:stockMovementId` | Item by transaksi |
| GET | `/api/stock-movement-items/:id` | Detail item |

##  Contoh Request

### Buat Kategori
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Elektronik", "description": "Produk elektronik"}'
```

### Buat Produk
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming",
    "sku": "LAP-001",
    "price": 15000000,
    "minStock": 5,
    "maxStock": 50,
    "categoryId": "uuid-category",
    "supplierId": "uuid-supplier"
  }'
```

### Transaksi Stok Masuk
```bash
curl -X POST http://localhost:3000/api/stock-movements \
  -H "Content-Type: application/json" \
  -d '{
    "type": "IN",
    "referenceNumber": "IN-2024-001",
    "movementDate": "2024-01-15",
    "notes": "Pembelian stok awal",
    "warehouseId": "uuid-warehouse",
    "items": [
      {"productId": "uuid-product", "quantity": 10, "unitPrice": 12000000}
    ]
  }'
```

### Transaksi Stok Keluar
```bash
curl -X POST http://localhost:3000/api/stock-movements \
  -H "Content-Type: application/json" \
  -d '{
    "type": "OUT",
    "referenceNumber": "OUT-2024-001",
    "movementDate": "2024-01-20",
    "notes": "Penjualan ke customer",
    "warehouseId": "uuid-warehouse",
    "items": [
      {"productId": "uuid-product", "quantity": 2, "unitPrice": 15000000}
    ]
  }'
```

##  Testing dengan Postman

Import file `postman/Inventory_Management_API.postman_collection.json` ke Postman.

Collection berisi:
- CRUD semua entitas
- Scenario: Stok masuk → cek stok → stok keluar → cek stok
- Validasi error (400, 404, 409)
- Relasi data

##  ERD

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│  Categories │       │  Suppliers  │       │ Warehouses  │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │       │ id (PK)     │       │ id (PK)     │
│ name        │       │ name        │       │ name        │
│ description │       │ contactPerson│      │ address     │
└──────┬──────┘       └──────┬──────┘       └──────┬──────┘
       │                     │                     │
       │ 1:N                 │ 1:N                 │ 1:N
       ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────┐
│                      Products                           │
├─────────────────────────────────────────────────────────┤
│ id (PK)                                                 │
│ name                                                    │
│ sku (unique)                                            │
│ price, currentStock, minStock, maxStock                 │
│ categoryId (FK) ──► Categories                          │
│ supplierId (FK) ──► Suppliers                           │
└─────────────────────┬───────────────────────────────────┘
                      │ 1:N
                      ▼
┌─────────────────────────────────────────────────────────┐
│                 StockMovementItems                      │
├─────────────────────────────────────────────────────────┤
│ id (PK)                                                 │
│ quantity, unitPrice                                     │
│ productId (FK) ──► Products                             │
│ stockMovementId (FK) ──► StockMovements                 │
└─────────────────────┬───────────────────────────────────┘
                      │ N:1
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    StockMovements                       │
├─────────────────────────────────────────────────────────┤
│ id (PK)                                                 │
│ type (IN/OUT)                                           │
│ referenceNumber (unique)                                │
│ movementDate                                            │
│ notes                                                   │
│ warehouseId (FK) ──► Warehouses                         │
└─────────────────────────────────────────────────────────┘
```

##  Teknologi

- **Framework**: NestJS 12 + TypeScript
- **ORM**: TypeORM 1.1
- **Database**: PostgreSQL
- **Validasi**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI (@nestjs/swagger)
- **Config**: @nestjs/config + Joi

##  Struktur Project

```
src/
├── app.module.ts           # Root module
├── main.ts                 # Bootstrap + Swagger + ValidationPipe
├── categories/             # Module kategori
│   ├── entities/
│   ├── dto/
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── categories.module.ts
├── suppliers/              # Module supplier
├── products/               # Module produk
├── warehouses/             # Module gudang
├── stock-movements/        # Module transaksi stok
└── stock-movement-items/   # Module detail item
```

##  Business Logic Stok

- **TYPE = IN**: `product.currentStock += quantity`
- **TYPE = OUT**: `product.currentStock -= quantity` (validasi stok cukup)
- **Update/Delete transaksi**: Otomatis rollback stok ke kondisi sebelumnya

##  Scripts

```bash
npm run start:dev     # Development dengan watch
npm run build         # Compile TypeScript
npm run start:prod    # Production
npm run lint          # Oxlint
npm run format        # Prettier
npm run test          # Unit test (Vitest)
npm run test:e2e      # E2E test
```

##  Kelompok

Project UTS Framework Programming - Studi Kasus 1: Inventory Management System

---

**Dosen**: Jamal Apriadi, S.Kom  
**Tahun Akademik**: 2026/2027