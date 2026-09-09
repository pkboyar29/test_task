import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return <div className={styles.empty}>{message}</div>;
}
