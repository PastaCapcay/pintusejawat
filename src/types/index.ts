import { Icons } from '@/components/icons';
import { UserCircle } from 'lucide-react';
type LucideIconType = React.ComponentType<
  React.ComponentProps<typeof UserCircle>
>;

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons | LucideIconType;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
  color?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
