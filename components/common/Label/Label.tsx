'use client';

import styles from './Label.module.scss';

interface LabelProps {
  value: string;
  variant: number;
}

export default function Label({ value, variant }: LabelProps) {
  return <span className={`${styles.label} ${styles[`label--${variant % 4}`]}`}>{value}</span>;
}
