export interface Iproduct {
  _id?: number | string;
  name: string;
  price: number;
  priceSale?: number;
  image: string;
  description: string;
  description_short?: string;
  hot_sale?: number;
  size: Array<string>;
  color: Array<string>;
}
