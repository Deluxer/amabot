import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppService } from './app.service';
import { Product } from './products/entity/product.entity';
import { Subscriber } from './products/entity/subscriber.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, Subscriber],
      synchronize: true,
    }),
    TelegrafModule.forRootAsync({
      botName: 'amabot',
      useFactory: () => ({
        token: process.env.AMABOT_TELEGRAM_TOKEN,
        include: [],
      }),
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
