import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { ProductsModule } from '../bot/products.module';
import { SubscribeCronService } from './cron/subscribe-cron.service';
import { ProductProcessor } from './queue/product.processor';
import { ProductProducer } from './queue/product.producer';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    BullModule.registerQueue({
      name: 'product-queue',
    }),
  ],
  exports: [SubscribeCronService, ProductProducer],
  providers: [SubscribeCronService, ProductProducer, ProductProcessor],
})
export class CommonModule {}
