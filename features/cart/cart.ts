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

export interface GiftWrapOption {
  id: string;
  name: string;
  nameBn?: string;
  price: number;
  image: string;
  description: string;
}

export interface AddedModalState {
  isOpen: boolean;
  item: CartItem | null;
}

export interface DeleteModalState {
  isOpen: boolean;
  item: {
    productId: string;
    size: string;
    colorName: string;
    productName: string;
  } | null;
}

export interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    size: string,
    color: ProductColor,
    quantity?: number,
    openDrawer?: boolean
  ) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  requestRemoveFromCart: (
    productId: string,
    size: string,
    colorName: string,
    productName?: string
  ) => void;
  confirmRemoveFromCart: () => void;
  cancelRemoveFromCart: () => void;
  updateQuantity: (
    productId: string,
    size: string,
    colorName: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  appliedCoupon: string | null;
  discountAmount: number;
  giftWrapOption: GiftWrapOption | null;
  setGiftWrapOption: (option: GiftWrapOption | null) => void;
  giftNote: string;
  setGiftNote: (note: string) => void;
  giftWrapPrice: number;
  grandTotal: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  addedModalState: AddedModalState;
  setAddedModalState: (state: AddedModalState) => void;
  deleteModalState: DeleteModalState;
  setDeleteModalState: (state: DeleteModalState) => void;
}

