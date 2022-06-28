export class ProductsDto {
  constructor(public productIds: string[]) {}
}

export class ProductDto {
  constructor(
    public productName: string,
    public description: string,
    public price: number,
    public quantity: number,
  ) {}
}
