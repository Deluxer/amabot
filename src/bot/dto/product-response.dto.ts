export class ProductResponseDto {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public image: string,
    public url: string,
    public idProductByStore: string,
    public idMarketplace: string,
  ) {}
}
