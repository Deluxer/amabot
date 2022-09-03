import { Injectable } from '@nestjs/common';
import { Command, Ctx, Hears, Start, Update, Sender, TelegrafContextType, InlineQuery, Message } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { ProductsService } from './products/products.service';

@Update()
@Injectable()
export class AppService {

  constructor(
    private readonly productService: ProductsService
  ) {}

  @Start()
  onStart(): string {
    return 'Use command /buscar';
  }

  @Command('buscar')
  async search(
      @Ctx() ctx: Context,
      @Message('text') command: string,
    ) : Promise<string>
  {
    const keywords = command.split(' ');
    keywords.shift();
    if(keywords.length == 0) return;
    
    const productName = keywords.join(' ');
    let products = [];
    products = await this.productService.findByName(productName);
    
    if(products.length < 2)
    products = await this.productService.create(productName);
    
    products.forEach( (product) => {
      ctx.reply(`[${ product.name }](${ product.url }) \n$${ product.price }`, {
        parse_mode: 'Markdown'
      });
    });

    return;
  }
}
