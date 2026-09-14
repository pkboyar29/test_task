import type { Metadata } from 'next';
import '../globals.scss';
import StoreProvider from '@/components/StoreProvider';
import Header from '@/components/common/Header/Header';

export const metadata: Metadata = {
  title: 'Каталог товаров',
  description: 'Интернет-магазин с каталогом товаров, избранным и корзиной.',
  openGraph: {
    title: 'Каталог товаров',
    description: 'Интернет-магазин с каталогом товаров, избранным и корзиной.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Test Task',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          <Header />

          <div className="page">
            <main className="main">{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
