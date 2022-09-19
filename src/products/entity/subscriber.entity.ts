import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { idMarketplaceEnum } from '../common/enums/MarketTypeEnum';

@Entity({ name: 'subscriber' })
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['ml', 'amz'],
  })
  idMarketplace: idMarketplaceEnum;

  @Column({ type: 'integer' })
  userTelegramId: number;

  @Column({ type: 'text', unique: true })
  idProductByStore: string;

  @Column({ type: 'float', default: 0 })
  price: number;
}
