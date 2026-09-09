'use client';

import Image from 'next/image';
import styles from './ProductImage.module.scss';
import { useState } from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
}

export default function ProductImage({ src, alt, width, height }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src) {
    return <div className={styles.imagePlaceholder}>Нет изображения</div>;
  }
  if (hasError) {
    return <div className={styles.imagePlaceholder}>Не удалось загрузить</div>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={styles.image}
      onError={() => setHasError(true)}
    />
  );
}
