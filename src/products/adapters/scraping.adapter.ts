import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';

@Injectable()
export class ScrapingAdapter {
  constructor(private readonly crawler: NestCrawlerService) {}

  async get(url: string) {
    const prod = await this.crawler.fetch({
      target: url,
      fetch: {
        products: {
          listItem: '.s-result-item',
          data: {
            title: {
              selector: 'h2 > a span',
            },
            price: {
              selector:
                '.s-price-instructions-style a > .a-price .a-price-whole',
            },
            image: {
              selector: '.s-product-image-container > span a.a-link-normal img',
              attr: 'src',
            },
            url: {
              selector: '.s-result-item h2 > a.s-link-style',
              attr: 'href',
            },
            idProductByStore: {
              selector: '',
              attr: 'data-asin',
            },
          },
        },
      },
    });

    return prod;
  }
}
