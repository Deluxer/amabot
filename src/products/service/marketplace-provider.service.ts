import { Injectable } from "@nestjs/common";
import { AmazonService } from "./amazon.service";
import { MercadoLibreService } from "./mercado-libre.service";

@Injectable()
export class MarketPlaceProviderService{

    constructor(
        private readonly mercadoLibreService: MercadoLibreService,
        private readonly amazonService: AmazonService
      ) {}

    async searchProduct<T>(nameProduct: string): Promise<any[]>
    {
        let products = [];
        const productML = await this.mercadoLibreService.get<T>('https://api.mercadolibre.com/sites/MLM/search?', nameProduct);
        const productAmazon = await this.amazonService.get<T>('https://www.amazon.com.mx/', nameProduct);
        
        if(productML) products.push(productML);
        if(productAmazon) products.push(productAmazon);

        return products
    }
}