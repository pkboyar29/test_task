import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Избранное',
  description: 'Сохраненные товары в Test Task.',
};

export default function FavoritesLayout({ children }: LayoutProps<'/favorites'>) {
  return children;
}
