import { Injectable } from '@nestjs/common';
import { Command, Ctx, Start, Update, Message } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { idMarketplaceType } from './products/common/enums/MarketTypeEnum';
import { ProductsService } from './products/products.service';
import { SubscriberService } from './products/service/subscriber.service';

@Update()
@Injectable()
export class AppService {
  constructor(
    private readonly productService: ProductsService,
    private readonly subscriberService: SubscriberService,
  ) {}

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

  @Command('subscriber')
  async subscriber(
    @Ctx() ctx: Context,
    @Message('text') command: string,
  ): Promise<string> {
    const keywords = command.split(' ');

    // remove first element "/subscribe"
    keywords.shift();
    if (keywords.length === 0) return;

    const userId = ctx.message.chat.id;
    const price = keywords.pop();
    const productName = keywords.join(' ');

    let getAmazonAndMLProducts = [];
    getAmazonAndMLProducts = await this.productService.findByName(productName);

    if (getAmazonAndMLProducts.length < 2)
      getAmazonAndMLProducts = await this.productService.create(productName);

    // TODO: insert product subscriber
    this.subscriberService.create(
      getAmazonAndMLProducts,
      parseInt(price),
      userId,
    );

    // getAmazonAndMLProducts.forEach((product) => {
    //   const marketplace = idMarketplaceType[product.idMarketplace];
    //   ctx.reply(
    //     `[${product.name}](${product.url}) \n$${product.price} \n Tienda: ${marketplace} \n\n`,
    //     {
    //       parse_mode: 'Markdown',
    //     },
    //   );
    // });

    return;
  }
}
