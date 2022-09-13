import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type MarketType = 'ml' | 'amz';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  idProductByStore: string;

  @Column({
    type: 'enum',
    enum: ['ml', 'amz'],
  })
  idMarketplace: MarketType;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ default: true })
  isActive: boolean;
}
