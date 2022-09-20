import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductsService } from "../../bot/products.service";
import { SubscriberService } from "../../bot/service/subscriber.service";

@Injectable()
export class SubscriberTaskService {

    private readonly logger = new Logger(SubscriberTaskService.name);
    constructor(
        private readonly subscriberService: SubscriberService,
        private readonly productService: ProductsService
    ) {}

    @Cron(CronExpression.EVERY_HOUR, {
        name: 'consumeApiAmazonAndML',
        timeZone: 'America/Monterrey',
    })
    async handleCron() {
        const subscribers = await this.subscriberService.findAll();
        subscribers.forEach(async (product) => {
            
            // TODO: make queue
            await this.productService.create(product.productName);

        });

        this.logger.debug(`Update price from (Aamzon and Mercado Libre) ${ CronExpression.EVERY_HOUR }`);
    }

}