import { IProduct } from '@/types/IProduct';

export function isProductValid(value: unknown): value is IProduct {
  return (
    typeof value === 'object' && value !== null && 'id' in value && typeof value.id === 'number'
  );
}
