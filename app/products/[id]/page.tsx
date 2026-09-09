import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ProductDetails from '@/components/entities/Product/ProductDetails/ProductDetails';
import { fetchProducts } from '@/api/products';
import styles from './page.module.scss';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);
  const products = await fetchProducts();
  const product = products.find((item) => item.id === productId);

  if (!Number.isInteger(productId) || !product) {
    return {
      title: 'Товар не найден',
      description: 'Запрошенный товар не найден.',
    };
  }

  const description = `${product.name} в каталоге Test Task. ${product.available ? 'Товар в наличии.' : 'Товар временно недоступен.'}`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      type: 'website',
      images: [{ url: product.preview_picture, alt: product.name }],
    },
  };
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
