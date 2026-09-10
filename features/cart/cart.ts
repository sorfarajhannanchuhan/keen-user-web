/**
 * ============================================================================
 * KEEN CHIT - Feature: Cart Types
 * ============================================================================
 */

import { Product, ProductColor } from "@/features/catalog";

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface WishlistItem extends Product {
  addedAt?: string;
}

export interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  totalItems: number;
  subtotal: number;
  appliedCoupon: string | null;
  discountAmount: number;
  grandTotal: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

