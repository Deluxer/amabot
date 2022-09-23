import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from '../entity/subscriber.entity';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
  ) {}

  async findAll(): Promise<Subscriber[]> {
    const subscribers = await this.subscriberRepository.find();
    if (!subscribers) return;

    return subscribers;
  }

  async find(productName: string): Promise<Subscriber> {
    const subscriber = await this.subscriberRepository.findOneBy({
      productName,
    });
    if (!subscriber) return;

    return subscriber;
  }

  async create(productName: string, price: number, userId: number) {
    const subscriber = await this.find(productName);

    if (subscriber) {
      this.subscriberRepository.save({ id: subscriber.id, price });
      return;
    }

    const newPoduct = this.subscriberRepository.create({
      userTelegramId: userId,
      productName,
      price: price,
    });
    this.subscriberRepository.save(newPoduct);

    return;
  }
}
