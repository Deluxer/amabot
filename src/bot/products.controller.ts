import { Controller, Get, Logger, Param } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AmazonService } from './services/amazon.service';
import { ProductsService } from './products.service';
import { SubscribeCronService } from '../common/cron/subscribe-cron.service';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(SubscribeCronService.name);

  constructor(
    private readonly amazonService: AmazonService,
    private readonly productService: ProductsService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Get()
  async findAll() {
    const products = await this.amazonService.get(
      'https://www.amazon.com.mx/s?k=',
      'laptop toshiba nueva',
    );

    //  stop cron
    this.deleteCron('consumeApiAmazonAndML');

    return products;
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  @Get(':id')
  async finOne(@Param('id') idProductByStore: string) {
    const product = await this.productService.find(idProductByStore);

    if (!product) {
      return {
        msg: 'Product not found',
        data: [],
      };
    }

    return product;
  }
}
