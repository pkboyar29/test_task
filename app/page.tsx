import ProductCatalog from '@/components/entities/Product/ProductCatalog/ProductCatalog';
import { fetchProducts } from '@/api/products';

// TODO: вынести в .env и не передавать по дереву компонентов
const PAGE_COUNT = 20;

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { items, itemsCount } = await fetchProducts();

  const { page: pageParam } = await searchParams;

  let currentPage = 1;
  if (pageParam) {
    const parsedPage = Number(pageParam);
    if (Number.isInteger(parsedPage) && parsedPage >= 1) {
      currentPage = parsedPage;
    }
  }

  const start = (currentPage - 1) * PAGE_COUNT;
  const end = start + PAGE_COUNT;
  const productsToDisplay = items.slice(start, end);

  return (
    <>
      <h1 className="title">Каталог товаров</h1>

      <ProductCatalog
        products={productsToDisplay}
        itemsCount={itemsCount}
        pageCount={PAGE_COUNT}
        currentPage={currentPage}
      />
    </>
  );
}
