import { Injectable } from '@nestjs/common';
import { AmazonService } from './amazon.service';
import { MercadoLibreService } from './mercado-libre.service';

@Injectable()
export class MarketPlaceProviderService {
  constructor(
    private readonly mercadoLibreService: MercadoLibreService,
    private readonly amazonService: AmazonService,
  ) {}

  async searchProduct(nameProduct: string): Promise<any[]> {
    const products = [];
    const productML = await this.mercadoLibreService.get('https://api.mercadolibre.com/sites/MLM/search?', nameProduct);
    const productAmazon = await this.amazonService.get('https://www.amazon.com.mx/', nameProduct);

    if (productML) products.push(productML);
    if (productAmazon) products.push(productAmazon);

    return products;
  }
}
