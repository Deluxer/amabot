import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { MarketPlaceProviderService } from './service/marketplace-provider.service';

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

  async create(productName: string): Promise<any[]> {
    const products = await this.marketplaceProvider.searchProduct(productName);

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

  async findByName(name: string): Promise<any[]> {
    name = name.toLowerCase();

    const products = await this.productRepository //.findBy({name: Like(`%${ name }%`)})
      .createQueryBuilder('p')
      .where('LOWER(p.name) like LOWER(:name)', { name: `%${name}%` })
      .getMany();

    return products;
  }
}
