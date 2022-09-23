import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from '../adapters/axios.adapter';
import { ProductResponseDto } from '../dto/product-response.dto';
import { MercadoLibreResponse } from '../Interfaces/mercadolibre-response-interface';

@Injectable()
export class MercadoLibreService {
  constructor(private readonly axiosAdapter: AxiosAdapter) {}

  async get(url: string, q: string): Promise<ProductResponseDto> {
    const limit = 1;
    const sort = 'price_asc';
    const status = 'active';
    const fullUrl = `${url}q=${q}&sort=${sort}&limit=${limit}&status=${status}`;

    try {
      const { data } = await this.axiosAdapter.get<MercadoLibreResponse>(
        fullUrl,
      );

      if (data.results.length == 0) return;

      const { title, price, thumbnail, permalink, id } = data.results[0];

      return new ProductResponseDto(
        title,
        'description',
        price,
        thumbnail,
        permalink,
        id,
        'ml',
      );
    } catch (error) {
      console.log(error);
    }
  }
}
