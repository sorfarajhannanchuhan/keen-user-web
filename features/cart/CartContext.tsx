"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductColor } from "@/features/catalog";
import { CartItem, CartContextType, AddedModalState, DeleteModalState, GiftWrapOption } from "./cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Added-to-Bag Modal State (SS 2)
  const [addedModalState, setAddedModalState] = useState<AddedModalState>({
    isOpen: false,
    item: null,
  });

  // Remove Item Confirmation Dialog State (SS 3)
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    isOpen: false,
    item: null,
  });

  // Gift Wrap State (SS 4)
  const [giftWrapOption, setGiftWrapOption] = useState<GiftWrapOption | null>(null);
  const [giftNote, setGiftNote] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("keenchit_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
      const savedWrap = localStorage.getItem("keenchit_gift_wrap");
      if (savedWrap) {
        setGiftWrapOption(JSON.parse(savedWrap));
      }
      const savedNote = localStorage.getItem("keenchit_gift_note");
      if (savedNote) {
        setGiftNote(savedNote);
      }
    } catch (e) {
      console.error("Could not load cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("keenchit_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Could not save cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (giftWrapOption) {
        localStorage.setItem("keenchit_gift_wrap", JSON.stringify(giftWrapOption));
      } else {
        localStorage.removeItem("keenchit_gift_wrap");
      }
    } catch (e) {}
  }, [giftWrapOption]);

  useEffect(() => {
    try {
      localStorage.setItem("keenchit_gift_note", giftNote);
    } catch (e) {}
  }, [giftNote]);

  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity = 1,
    openDrawer = false
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });

    // SS 2: Trigger the Added to Bag Confirmation Modal instead of auto-opening drawer
    setAddedModalState({
      isOpen: true,
      item: { product, selectedSize: size, selectedColor: color, quantity },
    });

    // If explicit openDrawer is requested and not suppressed, allow it
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const requestRemoveFromCart = (
    productId: string,
    size: string,
    colorName: string,
    productName?: string
  ) => {
    setDeleteModalState({
      isOpen: true,
      item: {
        productId,
        size,
        colorName,
        productName: productName || "Selected item",
      },
    });
  };

  const confirmRemoveFromCart = () => {
    if (deleteModalState.item) {
      const { productId, size, colorName } = deleteModalState.item;
      removeFromCart(productId, size, colorName);
    }
    setDeleteModalState({ isOpen: false, item: null });
  };

  const cancelRemoveFromCart = () => {
    setDeleteModalState({ isOpen: false, item: null });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("keenchit_cart");
    } catch (e) {}
  };

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    size: string,
    colorName: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedCoupon = localStorage.getItem("keenchit_applied_coupon");
      if (savedCoupon) {
        setAppliedCoupon(savedCoupon);
      }
    } catch (e) {
      console.error("Could not load coupon from localStorage", e);
    }
  }, []);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === "KEEN10" || normalized === "PRIVILEGE10" || normalized === "WELCOME10") {
      setAppliedCoupon(normalized);
      try {
        localStorage.setItem("keenchit_applied_coupon", normalized);
      } catch (e) {}
      return { success: true, message: "10% Atelier Privilege Applied" };
    }
    return { success: false, message: "Invalid voucher code" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    try {
      localStorage.removeItem("keenchit_applied_coupon");
    } catch (e) {}
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.product?.price ?? (item as unknown as { price?: number }).price ?? 0) * (item.quantity || 0),
    0
  );

  const discountAmount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const giftWrapPrice = giftWrapOption ? giftWrapOption.price : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount) + giftWrapPrice;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        requestRemoveFromCart,
        confirmRemoveFromCart,
        cancelRemoveFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        appliedCoupon,
        discountAmount,
        giftWrapOption,
        setGiftWrapOption,
        giftNote,
        setGiftNote,
        giftWrapPrice,
        grandTotal,
        applyCoupon,
        removeCoupon,
        quickViewProduct,
        setQuickViewProduct,
        addedModalState,
        setAddedModalState,
        deleteModalState,
        setDeleteModalState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
