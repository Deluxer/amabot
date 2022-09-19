import { Injectable } from '@nestjs/common';
import { Command, Ctx, Start, Update, Message } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { idMarketplaceType } from './products/common/enums/MarketTypeEnum';
import { ProductsService } from './products/products.service';

@Update()
@Injectable()
export class AppService {
  constructor(private readonly productService: ProductsService) {}

  @Start()
  onStart(): string {
    return 'Use command /buscar';
  }

  @Command('buscar')
  async search(
    @Ctx() ctx: Context,
    @Message('text') command: string,
  ): Promise<string> {
    const keywords = command.split(' ');
    keywords.shift();
    if (keywords.length === 0) return;

    const productName = keywords.join(' ');
    let getAmazonAndMLProducts = [];
    getAmazonAndMLProducts = await this.productService.findByName(productName);

    if (getAmazonAndMLProducts.length < 2)
      getAmazonAndMLProducts = await this.productService.create(productName);

    getAmazonAndMLProducts.forEach((product) => {
      const marketplace = idMarketplaceType[product.idMarketplace];
      ctx.reply(
        `[${product.name}](${product.url}) \n$${product.price} \n Tienda: ${marketplace} \n\n`,
        {
          parse_mode: 'Markdown',
        },
      );
    });

    return;
  }
}
