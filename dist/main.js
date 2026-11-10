import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const config = new DocumentBuilder()
        .setTitle('Inventory Management System API')
        .setDescription('API untuk sistem manajemen persediaan barang (Inventory Management System)')
        .setVersion('1.0')
        .addTag('Categories', 'Manajemen kategori produk')
        .addTag('Suppliers', 'Manajemen pemasok')
        .addTag('Products', 'Manajemen produk')
        .addTag('Warehouses', 'Manajemen gudang')
        .addTag('Stock Movements', 'Manajemen transaksi pergerakan stok')
        .addTag('Stock Movement Items', 'Detail item transaksi stok')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map