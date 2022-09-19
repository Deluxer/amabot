import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { Subscriber } from '../entity/subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
  ) {}

  async find(idProductByStore: string): Promise<Subscriber> {
    const subscriber = await this.subscriberRepository.findOneBy({
      idProductByStore,
    });
    if (!subscriber) return;

    return subscriber;
  }

  create(products: Product[], price: number, userId: number) {
    const subscriberInsertDb = [];
    products.forEach(async (product: Product) => {
      const subscriber = await this.find(product.idProductByStore);

      if (subscriber) {
        subscriberInsertDb.push(
          this.subscriberRepository.save({ id: subscriber.id, price }),
        );
        return;
      }

      const newPoduct = this.subscriberRepository.create({
        idMarketplace: product.idMarketplace,
        userTelegramId: userId,
        idProductByStore: product.idProductByStore,
        price: price,
      });
      subscriberInsertDb.push(this.subscriberRepository.save(newPoduct));
    });

    Promise.all(subscriberInsertDb);

    return;
  }
}
