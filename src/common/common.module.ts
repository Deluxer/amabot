import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { SubscriberTaskService } from './cron/subscriber-task.service';
import { NotificationService } from './notifications/notification.service';

@Module({
    imports: [ProductsModule],
    exports: [SubscriberTaskService],
    providers: [SubscriberTaskService]
})
export class CommonModule {}
