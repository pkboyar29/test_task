'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavItem.module.scss';

interface NavItemProps {
  href: string;
  label: string;
  count?: number;
}

export default function NavItem({ href, label, count }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className={styles.navItem}>
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={`${styles.navItem__link} ${isActive ? styles['navItem__link--active'] : ''}`}
      >
        <span>{label}</span>
        {typeof count !== 'undefined' ? (
          <span aria-label={`${count} товаров`} className={styles.navItem__count}>
            {count}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
