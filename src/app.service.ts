import { Injectable } from '@nestjs/common';
import { Command, Ctx, Start, Update, Message } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { serializeString } from './common/helpers/serializeString';
import { idMarketplaceType } from './bot/common/enums/MarketTypeEnum';
import { ProductsService } from './bot/products.service';
import { SubscribeService } from './bot/services/subscribe.service';

@Update()
@Injectable()
export class AppService {
  constructor(
    private readonly productService: ProductsService,
    private readonly subscribeService: SubscribeService,
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

    let productName = keywords.join(' ');
    productName = serializeString(productName);

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

  @Command('subscribe')
  async subscriber(
    @Ctx() ctx: Context,
    @Message('text') command: string,
  ): Promise<string> {
    const keywords = command.split(' ');

    keywords.shift();
    if (keywords.length === 0) return;

    const userId = ctx.message.chat.id;

    const price = keywords.pop();
    let productName = keywords.join(' ');
    productName = serializeString(productName);

    this.subscribeService.create(productName, parseInt(price), userId);

    ctx.reply(
      `Nosotros te notificamos cuando el precio este por llegar a $${price}`,
      {
        parse_mode: 'Markdown',
      },
    );

    return;
  }
}
