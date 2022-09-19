import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AmazonService } from './service/amazon.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly amazonService: AmazonService,
    private readonly productService: ProductsService,
  ) {}

  @Get()
  async findAll() {
    const products = await this.amazonService.get(
      'https://www.amazon.com.mx/s?k=',
      'laptop toshiba nueva',
    );

    return products;
  }

  @Get(':id')
  async finOne(@Param('id') idProductByStore: string) {
    const product = await this.productService.find(idProductByStore);

    if (!product) {
      return {
        msg: 'Product not found',
        data: [],
      };
    }

    return product;
  }
}
