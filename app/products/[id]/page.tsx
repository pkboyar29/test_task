import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import { fetchProducts } from '@/api/products';
import styles from './page.module.scss';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  const products = await fetchProducts();
  const product = products.find((item) => item.id === productId);

  if (!Number.isInteger(productId) || !product) {
    notFound();
  }

  return (
    <>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <Link href="/">Каталог товаров</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <ProductDetails product={product} />
    </>
  );
}
