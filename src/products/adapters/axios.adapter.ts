import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable()
export class AxiosAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(fullUrl: string): Promise<AxiosResponse> {
    try {
      const data = await this.axios.get<T>(fullUrl);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
