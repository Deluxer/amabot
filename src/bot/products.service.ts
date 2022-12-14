import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { MarketPlaceProviderService } from './services';

@Injectable()
export class ProductsService {
  constructor(
    private readonly marketplaceProvider: MarketPlaceProviderService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async find(idProductByStore: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      idProductByStore,
    });
    if (!product) return;

    return product;
  }

  async findByName(name: string): Promise<Product[]> {
    name = name.toLowerCase();

    const products = await this.productRepository //.findBy({name: Like(`%${ name }%`)})
      .createQueryBuilder('p')
      .where('LOWER(p.name) like LOWER(:name)', { name: `%${name}%` })
      .distinctOn(['p.idMarketplace'])
      .getMany();

    return products;
  }

  async create(productName: string): Promise<Product[]> {
    const products = await this.getProductsfromApi(productName);

    //save in DB
    products.forEach(async (product) => {
      try {
        const findProduct = await this.find(product.idProductByStore);
        if (findProduct) {
          await this.productRepository.save({ id: findProduct.id, ...product });
        } else {
          await this.productRepository.save(product);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return products;
  }

  private async getProductsfromApi(productName: string): Promise<Product[]> {
    return await this.marketplaceProvider.searchProduct(productName);
  }
}
