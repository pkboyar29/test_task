import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Корзина',
  description: 'Товары, выбранные для покупки в Test Task.',
};

export default function CartLayout({ children }: LayoutProps<'/cart'>) {
  return children;
}
