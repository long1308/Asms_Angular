export interface Iproduct {
  _id?: number | string;
  name: string;
  price: number;
  priceSale: number;
  featured: boolean;
  image: string;
  description: string;
  description_short?: string;
  hot_sale?: number;
  size: Array<string>;
  color: Array<string>;
  quantity: number;
  category: string;
  inventoryStatus: string;
  rating: number;
}
