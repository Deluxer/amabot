import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subscriber' })
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  userTelegramId: number;

  @Column({ type: 'text', unique: true })
  productName: string;

  @Column({ type: 'float', default: 0 })
  price: number;
}
