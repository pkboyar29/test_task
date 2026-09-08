import { IProduct } from '@/types/IProduct';
import { ProductSortValueType } from '../ProductSort/ProductSort';

export function sortProducts(products: IProduct[], sortType: ProductSortValueType): IProduct[] {
  if (sortType === 'default') {
    return products;
  }

  return products.toSorted((first, second) => {
    if (sortType === 'name-asc') {
      return first.name.localeCompare(second.name);
    }
    if (sortType === 'reviews-desc') {
      return second.reviews - first.reviews;
    }

    const firstPrice = first.price_discount;
    const secondPrice = second.price_discount;
    if (sortType === 'price-asc') {
      return firstPrice - secondPrice;
    } else {
      return secondPrice - firstPrice;
    }
  });
}
