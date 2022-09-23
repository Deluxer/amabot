import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NotificationService {
  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'notifications',
    timeZone: 'America/Monterrey',
  })
  triggerNotifications() {
    console.log('Triggering Message Sending');
    console.log('Every 10 seconds');
  }
}
