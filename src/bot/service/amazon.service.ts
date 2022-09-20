import { Injectable } from '@nestjs/common';
import { ScrapingAdapter } from '../adapters/scraping.adapter';
import { ProductResponseDto } from '../dto/product-response.dto';

@Injectable()
export class AmazonService {
  constructor(private readonly scrapingAdapter: ScrapingAdapter) {}

  async get(urlx: string, q: string): Promise<ProductResponseDto> {
    const fullUrl = `${urlx}s?k=${q}`;
    const data = await this.scrapingAdapter.get(fullUrl);
    const products = Object.values(data);
    // Get first element
    const product = products[0]
      .filter((item: any) => item.title && item.price)
      .shift();
    if (product === 0) return;

    const { title = '', price, image, url, idProductByStore } = product;
    const formatPrice = Number(price.replace(/[^0-9.-]+/g, ''));

    return new ProductResponseDto(
      title,
      'description',
      formatPrice,
      image,
      `https://www.amazon.com.mx/${url}`,
      idProductByStore,
      'amz',
    );
  }
}
