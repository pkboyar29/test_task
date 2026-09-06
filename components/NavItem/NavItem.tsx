import Link from 'next/link';
import styles from './NavItem.module.scss';

interface NavItemProps {
  href: string;
  label: string;
  count?: number;
}

export default function NavItem({ href, label, count }: NavItemProps) {
  return (
    <li className={styles.navItem}>
      <Link href={href} className={styles.navItem__link}>
        <span>{label}</span>
        {typeof count !== 'undefined' ? (
          <span className={styles.navItem__count}>{count}</span>
        ) : null}
      </Link>
    </li>
  );
}
