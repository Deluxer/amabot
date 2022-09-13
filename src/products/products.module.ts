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

@Module({
  imports: [TypeOrmModule.forFeature([Product]), NestCrawlerModule],
  controllers: [ProductsController],
  providers: [
    AxiosAdapter,
    ScrapingAdapter,
    MarketPlaceProviderService,
    MercadoLibreService,
    AmazonService,
    ProductsService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
