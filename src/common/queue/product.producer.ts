import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ProductProducer {
  constructor(
    @InjectQueue('product-queue')
    private queue: Queue,
  ) {}

  async updatePrice(productName: string) {
    await this.queue.add('update-price-job', {
      productName,
    });
  }
}
