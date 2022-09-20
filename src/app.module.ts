import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { Product } from './bot/entity/product.entity';
import { Subscriber } from './bot/entity/subscriber.entity';
import { ProductsModule } from './bot/products.module';
import { ScheduleModule } from '@nestjs/schedule';

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
    ScheduleModule.forRoot(),
    CommonModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
