interface ICharacteristic {
  label: string;
  name: string;
  value: string;
}

export interface IProduct {
  id: number;
  name: string;
  preview_picture: string;
  available: boolean;
  price: number;
  price_discount: number;
  quantity: number;
  reviews: number;
  labels: Record<string, string>;
  characteristics: ICharacteristic[];
}
