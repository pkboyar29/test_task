import { isProductValid } from './isProductValid';
import { ICartItem } from '@/types/ICartItem';

export function isCartItemValid(value: unknown): value is ICartItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    'product' in value &&
    isProductValid(value.product) &&
    'quantity' in value &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    value.quantity <= 10
  );
}
