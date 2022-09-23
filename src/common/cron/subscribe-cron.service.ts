import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SubscribeService } from '../../bot/services/subscribe.service';
import { CRON_UPDATE_PRODUCTS } from '../constants/global.constant';
import { ProductProducer } from '../queue/product.producer';

@Injectable()
export class SubscribeCronService {
  private readonly logger = new Logger(SubscribeCronService.name);

  constructor(
    private readonly subscribeService: SubscribeService,
    private readonly productProducer: ProductProducer,
  ) {}

  @Cron(CRON_UPDATE_PRODUCTS, {
    name: 'consumeApiAmazonAndML',
    timeZone: 'America/Monterrey',
  })
  async handleCron() {
    const subscribers = await this.subscribeService.findAll();
    subscribers.forEach((product) => {
      this.productProducer.updatePrice(product.productName);
    });

    this.logger.debug(
      `Cron - Update price from (Aamzon and Mercado Libre) ${CRON_UPDATE_PRODUCTS}`,
    );
  }
}
