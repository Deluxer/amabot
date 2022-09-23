import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosAdapter } from './adapters/axios.adapter';
import { NestCrawlerModule } from 'nest-crawler';
import { Product } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {
  MarketPlaceProviderService,
  MercadoLibreService,
  AmazonService,
  SubscribeService,
} from './services';
import { ScrapingAdapter } from './adapters/scraping.adapter';
import { Subscriber } from './entity/subscriber.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Subscriber]),
    NestCrawlerModule,
    forwardRef(() => CommonModule),
  ],
  controllers: [ProductsController],
  providers: [
    AxiosAdapter,
    ScrapingAdapter,
    MarketPlaceProviderService,
    MercadoLibreService,
    AmazonService,
    ProductsService,
    SubscribeService,
  ],
  exports: [ProductsService, SubscribeService],
})
export class ProductsModule {}
