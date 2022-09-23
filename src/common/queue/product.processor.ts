import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ProductsService } from '../../bot/products.service';

@Processor('product-queue')
export class ProductProcessor {
  private readonly logger = new Logger(ProductProcessor.name);

  constructor(private readonly producstService: ProductsService) {}

  @Process('update-price-job')
  async readOperationJob(job: Job<any>) {
    await this.producstService.create(job.data.productName);

    this.logger.debug(`Queue - Update price from (Aamzon and Mercado Libre)`);
  }
}
