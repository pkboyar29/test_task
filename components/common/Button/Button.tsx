'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
  clickHandler?: () => void;
  type?: 'button' | 'submit';
}

export default function Button({
  type = 'button',
  isActive = false,
  children,
  clickHandler,
  className = '',
  ...otherProps
}: ButtonProps) {
  return (
    <button
      onClick={clickHandler}
      type={type}
      className={`${styles.button} ${isActive ? styles['button--active'] : ''} ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
