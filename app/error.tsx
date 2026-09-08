'use client';

import styles from './error.module.scss';
import Button from '@/components/Button/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={styles.error} role="alert">
      <section className={styles.error__panel}>
        <h1 className="title">Что-то пошло не так</h1>

        <p className={styles.error__text}>
          Не удалось загрузить эту страницу. Попробуйте повторить попытку.
        </p>

        <Button type="button" onClick={() => reset()}>
          Попробовать снова
        </Button>
      </section>
    </main>
  );
}
