import { ReactNode } from 'react';

export interface Button {
  path: string;
  color: 'white-orange' | 'blue' | 'white-blue';
  children?: ReactNode;
  className?: string;
  ariaLabel: string;
}

export interface MenuItem {
  name: string;
  path: string;
  lang: string;
}

export type MenuType = MenuItem[];
