"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ProductColor } from "@/features/catalog";
import { CartItem, CartContextType } from "./cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("keenchit_cart");
      if (saved) {
        setCart(JSON.parse(saved));
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

  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity = 1
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

    setIsCartOpen(true);
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

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        subtotal,
        appliedCoupon,
        discountAmount,
        grandTotal,
        applyCoupon,
        removeCoupon,
        quickViewProduct,
        setQuickViewProduct,
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
