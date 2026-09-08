import { IProduct } from '@/types/IProduct';
import { ProductFilterValuesType } from '../components/ProductFilters/ProductFilters';

export function filterProducts(products: IProduct[], filter: ProductFilterValuesType): IProduct[] {
  return products.filter((product) => {
    const productCategories = Object.values(product.labels);
    const minPrice = Number(filter.minPrice);
    const maxPrice = Number(filter.maxPrice);

    const matchesCategory =
      filter.categories.length === 0
        ? true
        : filter.categories.some((category) => productCategories.includes(category));
    const matchesAvailability = !filter.onlyAvailable ? true : product.available;
    const matchesMinPrice = !filter.minPrice ? true : product.price_discount >= minPrice;
    const matchesMaxPrice = !filter.maxPrice ? true : product.price_discount <= maxPrice;
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(filter.searchQuery.toLowerCase());

    return (
      matchesCategory &&
      matchesAvailability &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesSearchQuery
    );
  });
}
