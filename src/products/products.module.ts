import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosAdapter } from './adapters/axios.adapter';
import { NestCrawlerModule } from 'nest-crawler';
import { Product } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AmazonService } from './service/amazon.service';
import { MarketPlaceProviderService } from './service/marketplace-provider.service';
import { MercadoLibreService } from './service/mercado-libre.service';
import { ScrapingAdapter } from './adapters/scraping.adapter';
import { SubscriberService } from './service/subscriber.service';
import { Subscriber } from './entity/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Subscriber]), NestCrawlerModule],
  controllers: [ProductsController],
  providers: [
    AxiosAdapter,
    ScrapingAdapter,
    MarketPlaceProviderService,
    MercadoLibreService,
    AmazonService,
    ProductsService,
    SubscriberService,
  ],
  exports: [ProductsService, SubscriberService],
})
export class ProductsModule {}
