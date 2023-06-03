export interface Iproduct {
  _id?: number | string;
  name: string;
  price: number;
  priceSale: number;
  isFavorite:boolean;
  featured: boolean;
  image: string;
  description: string;
  description_short?: string;
  hot_sale?: number;
  size: Array<string>;
  color: Array<string>;
  quantity: number;
  categoryId: string;
  inventoryStatus: string;
  rating: number;
  isVisible: boolean;
}
