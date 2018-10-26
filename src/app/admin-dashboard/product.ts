export class Product {
  constructor(
    public img_url: string,
    public name: string,
    public price: number,
    public discount: number,
    public category: string,
    public type: string,
    public description: string
  ) {}
}
