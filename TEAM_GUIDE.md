# Team Guide — Studi Kasus 1: Inventory Management System

**UTS Framework Programming (NestJS) — Kelompok 4 Anggota**  
**Repo:** https://github.com/rafifaiz/Uts-Framework-progamming

---

## ✅ Project Status: 100% Siap Demo

| Komponen | Status |
|----------|--------|
| 6 Module CRUD | Categories, Suppliers, Products, Warehouses, StockMovements, StockMovementItems |
| Business Logic Stok | IN = tambah, OUT = kurangi (validasi stok), Update/Delete = rollback otomatis |
| Relasi Database | 5 relasi 1:N lengkap (TypeORM) |
| Swagger Docs | `/api/docs` — semua endpoint + schema + try-it-out |
| Global Exception Filter | Error response konsisten (400, 404, 409) |
| Seed Script | `npm run seed` — data demo lengkap (3 cat, 3 sup, 2 wh, 5 prod, 4 transaksi) |
| Postman Collection | `postman/Inventory_Management_API.postman_collection.json` |
| Mermaid ERD | Di README.md — render di GitHub |
| Docker Compose | PostgreSQL siap pakai |

---

## 📁 Struktur File Penting (Untuk Dijelaskan Tiap Anggota)

```
src/
├── app.module.ts                 # Root module, config TypeORM + Joi
├── main.ts                       # Bootstrap, Swagger, ValidationPipe, Global Filter
├── common/filters/
│   └── http-exception.filter.ts  # Global exception handler (format error konsisten)
├── database/
│   ├── seed.ts                   # Logic seed data demo
│   └── seed-cli.ts               # CLI runner untuk npm run seed
├── categories/                   # Anggota 1
│   ├── entities/category.entity.ts
│   ├── dto/create-category.dto.ts, update-category.dto.ts
│   ├── categories.service.ts
│   ├── categories.controller.ts
│   └── categories.module.ts
├── suppliers/                    # Anggota 1
│   ├── entities/supplier.entity.ts
│   ├── dto/supplier.dto.ts
│   ├── suppliers.service.ts
│   ├── suppliers.controller.ts
│   └── suppliers.module.ts
├── products/                     # Anggota 2
│   ├── entities/product.entity.ts (core: sku unique, stock min/max, relasi cat+sup)
│   ├── dto/product.dto.ts
│   ├── products.service.ts
│   ├── products.controller.ts
│   └── products.module.ts
├── warehouses/                   # Anggota 2
│   ├── entities/warehouse.entity.ts
│   ├── dto/warehouse.dto.ts
│   ├── warehouses.service.ts
│   ├── warehouses.controller.ts
│   └── warehouses.module.ts
├── stock-movements/              # Anggota 3 (PALING KRITIS)
│   ├── entities/stock-movement.entity.ts (enum IN/OUT, referenceNumber unique)
│   ├── dto/stock-movement.dto.ts
│   ├── stock-movements.service.ts (business logic stok + transaksi + rollback)
│   ├── stock-movements.controller.ts
│   └── stock-movements.module.ts
├── stock-movement-items/         # Anggota 3
│   ├── entities/stock-movement-item.entity.ts (quantity, unitPrice, relasi)
│   ├── stock-movement-items.service.ts
│   ├── stock-movement-items.controller.ts
│   └── stock-movement-items.module.ts
```

---

## 👥 Pembagian Tugas 4 Anggota (Presentasi 5 Menit/Orang)

### **Anggota 1 — Categories + Suppliers**
**File:** `src/categories/*`, `src/suppliers/*`

**Talking Points (5 Menit):**
- Entity design: PK UUID, unique name, timestamps
- DTO validation: class-validator (MinLength, MaxLength, IsEmail, IsPhone)
- Service: CRUD standar, findOne pakai NotFoundException
- Relasi ke Products (OneToMany) — dipakai anggota 2

---

### **Anggota 2 — Products + Warehouses**
**File:** `src/products/*`, `src/warehouses/*`

**Talking Points (5 Menit):**
- Product = **core entity**: sku unique, decimal price, currentStock/minStock/maxStock
- ManyToOne ke Category & Supplier (nullable, onDelete: SET NULL)
- Warehouse: address, city, manager — relasi ke StockMovements
- Validasi FK di service (categoryId/supplierId harus exist)

---

### **Anggota 3 — StockMovements + StockMovementItems** ⭐ PALING KRITIS
**File:** `src/stock-movements/*`, `src/stock-movement-items/*`

**Talking Points (5 Menit):**
- **Business logic utama**: `updateProductStock()` IN/OUT
- Transaksional: `dataSource.transaction()` — atomic create/update/delete
- Rollback otomatis saat update/delete transaksi
- Stock report: `GET /report/stock` — aggregate currentStock
- Error handling: stok tidak cukup (400), duplicate referenceNumber (409)

---

### **Anggota 4 — Infra, Config, Quality**
**File:** `app.module.ts`, `main.ts`, `common/filters/*`, `database/*`, `README.md`, `docker-compose.yml`

**Talking Points (5 Menit):**
- NestJS modular architecture: Module/Controller/Service separation
- Config: `@nestjs/config` + Joi validation (PORT, DB_*, NODE_ENV)
- TypeORM: `forRootAsync`, entities array, synchronize dev
- Swagger: DocumentBuilder + tags per module
- Global ValidationPipe (whitelist, forbidNonWhitelisted, transform)
- Global Exception Filter: format error konsisten
- Seed script: demo data realistis untuk presentasi
- Mermaid ERD di README
- Docker Compose untuk PostgreSQL

---

## 🚀 Cara Menjalankan (Bagikan ke Seluruh Tim)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (atau Docker Desktop)

### Langkah-Langkah

```bash
# 1. Clone & Install
git clone https://github.com/rafifaiz/Uts-Framework-progamming.git
cd Uts-Framework-progamming
npm install

# 2. Setup Database (pilih salah satu)

# Opsi A: Docker (direkomendasikan)
docker-compose up -d

# Opsi B: PostgreSQL Local
# Buat database: CREATE DATABASE inventory_db;
# Sesuaikan .env jika beda kredensial

# 3. Konfigurasi Environment
cp .env.example .env
# Default .env sudah benar untuk Docker/local default

# 4. Seed Data Demo (WAJIB untuk presentasi)
npm run seed
# Output: 3 kategori, 3 supplier, 2 warehouse, 5 produk, 4 transaksi (2 IN, 2 OUT)

# 5. Jalankan Server Development
npm run start:dev

# 6. Akses
# Server: http://localhost:3000
# API Prefix: /api
# Swagger UI: http://localhost:3000/api/docs
```

---

## 🎯 Demo Flow Presentasi (10-15 Menit Total)

| Step | Endpoint | Deskripsi | Expected Result |
|------|----------|-----------|-----------------|
| 1 | `GET /api/stock-movements/report/stock` | Lihat stok awal (hasil seed) | 5 produk dengan currentStock > 0 |
| 2 | `POST /api/categories` | Tambah kategori baru | 201 Created, return UUID |
| 3 | `POST /api/suppliers` | Tambah supplier baru | 201 Created |
| 4 | `POST /api/products` | Buat produk baru (pakai cat+sup baru) | 201 Created, currentStock=0 |
| 5 | `POST /api/stock-movements` (type: IN) | Barang masuk gudang | 201, stok produk bertambah |
| 6 | `GET /api/stock-movements/report/stock` | Cek stok setelah IN | currentStock increased |
| 7 | `POST /api/stock-movements` (type: OUT) | Barang keluar (validasi stok) | 201, stok berkurang |
| 8 | `POST /api/stock-movements` (type: OUT, qty > stok) | **Test error** stok tidak cukup | 400 Bad Request, pesan jelas |
| 9 | `DELETE /api/stock-movements/:id` | Hapus transaksi → rollback stok | 200, stok kembali ke semula |
| 10 | `GET /api/docs` | Buka Swagger UI | Semua endpoint terdokumentasi |

---

## 📋 Checklist Sebelum Presentasi

- [ ] `docker-compose up -d` jalan (PostgreSQL healthy)
- [ ] `npm run seed` sukses (lihat log "🎉 Seed completed successfully!")
- [ ] `npm run start:dev` jalan tanpa error
- [ ] Swagger terbuka di `http://localhost:3000/api/docs`
- [ ] Postman collection di-import & test scenario "Full Demo" jalan
- [ ] Tiap anggota paham file yang ditugasin (bisa jawab: "Ini fungsi line X?", "Kenapa pakai transaction?", "Bagaimana rollback?")

---

## 💡 Tips Presentasi Individual — Pertanyaan Dosen Kemungkinan

| Pertanyaan | Jawaban Singkat |
|------------|-----------------|
| "Mengapa pakai UUID bukan auto-increment?" | Distributed systems ready, tidak expose business data, aman untuk merge DB |
| "Bagaimana transaksional di TypeORM?" | `dataSource.transaction(async manager => { ... })` — atomic, rollback otomatis kalau error |
| "Validasi stok di mana?" | `StockMovementsService.updateProductStock()` — throw `BadRequestException` kalau OUT > currentStock |
| "Error handling gimana?" | Global `HttpExceptionFilter` — format konsisten `{statusCode, message, error, timestamp, path}` |
| "Relasi many-to-many ada?" | Tidak diperlukan untuk studi kasus 1 (semua 1:N). Jika butuh, pakai `@ManyToMany` + `@JoinTable` |
| "Kenapa `synchronize: true`?" | Development only. Production harus pakai migration (`typeorm migration:run`) |

---

## 📦 File yang Perlu Dikirim ke Dosen

1. **Source code** (GitHub repo: `https://github.com/rafifaiz/Uts-Framework-progamming`)
2. **ERD** → Mermaid di README.md (render di GitHub) + ASCII fallback
3. **API Spec** → Swagger UI (`/api/docs`) + Postman collection
4. **Postman Collection** → `postman/Inventory_Management_API.postman_collection.json`
5. **README.md** → Cara install, run, seed, demo flow, struktur project, scripts

---

## ⏰ Timeline Persiapan (Hari Ini)

| Waktu | Aktivitas |
|-------|-----------|
| Sekarang | Bagiin file ini ke 4 anggota (WhatsApp/Drive) |
| 30 menit | Masing-masing baca scope file-nya |
| 15 menit | Latihan demo pake Swagger/Postman |
| 10 menit | Hafal talking points + jawaban pertanyaan dosen |
| Sebelum jam 4 | Final check: DB nyala, seed jalan, server jalan, Swagger terbuka |

---

**Good luck! 🎓**  
Project sudah solid — tinggal presentasi percaya diri aja.