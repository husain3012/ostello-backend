import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'ostello', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    ProductsModule,
    CartItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log('DATABASE_HOST', process.env.DATABASE_HOST);
console.log('DATABASE_PORT', parseInt(process.env.DATABASE_PORT));
console.log('DATABASE_USERNAME', process.env.DATABASE_USERNAME);
