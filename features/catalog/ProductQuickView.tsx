"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check, ShieldCheck, ChevronDown, Heart } from "lucide-react";
import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";
import { Product, ProductColor } from "./products";

export default function ProductQuickView() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const product = quickViewProduct;

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showCare, setShowCare] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.primaryImage);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  if (!product || !selectedColor) return null;

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-brand-linen-dark max-w-4xl w-full border border-brand-sand shadow-2xl relative my-8 overflow-hidden text-brand-charcoal">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-white bg-[#1E1E24] rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Gallery */}
          <div className="p-6 md:p-8 bg-brand-linen flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-sand">
            {/* Active Image */}
            <div className="relative aspect-square overflow-hidden border border-brand-sand shadow-sm bg-brand-linen-dark">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setSelectedImage(product.primaryImage)}
                className={`relative w-16 h-16 border-2 overflow-hidden transition-all ${
                  selectedImage === product.primaryImage ? "border-[#D4AF37]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={product.primaryImage} alt="Main view" fill className="object-cover" />
              </button>

              {product.secondaryImage && (
                <button
                  onClick={() => setSelectedImage(product.secondaryImage)}
                  className={`relative w-16 h-16 border-2 overflow-hidden transition-all ${
                    selectedImage === product.secondaryImage ? "border-[#D4AF37]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={product.secondaryImage} alt="Styled view" fill className="object-cover" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Spec & Add to Bag */}
          <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between bg-brand-linen-dark">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="text-[9px] uppercase tracking-wider bg-brand-sand text-brand-gold border border-[#333340] px-2 py-0.5">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-brandon font-semibold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 uppercase tracking-[0.08em] leading-tight">
                  {product.name}
                </h3>

                <div className="mt-2.5 flex items-baseline gap-2 font-sans flex-wrap">
                  <span className="text-xs text-stone-500 font-normal">From</span>
                  {product.originalPrice && (
                    <span className="text-base text-stone-400 dark:text-stone-500 line-through font-normal">
                      ৳{product.originalPrice.toLocaleString("en-BD")}
                    </span>
                  )}
                  <span className="text-2xl sm:text-3xl font-semibold text-[#993D2C] dark:text-[#E07A5F]">
                    ৳{product.price.toLocaleString("en-BD")}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-[#996c49] dark:text-[#C59B6D] font-semibold bg-[#996c49]/10 dark:bg-[#996c49]/20 px-2 py-0.5 border border-[#996c49]/30 rounded-[2px] ml-1">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Fabric Spec Callout */}
              <div className="p-3 bg-brand-linen border border-brand-sand text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">Fabric Composition:</span>
                  <span className="font-medium text-brand-charcoal">{product.fabric}</span>
                </div>
                {product.threadCount && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Weight & Weave:</span>
                    <span className="font-medium text-brand-charcoal">{product.threadCount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-400">Closure Type:</span>
                  <span className="font-medium text-brand-charcoal">{product.closure}</span>
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                  Selected Color: <strong className="text-brand-charcoal font-semibold">{selectedColor.name}</strong>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs transition-all ${
                        selectedColor.name === color.name
                          ? "border-[#D4AF37] bg-brand-sand text-white font-medium"
                          : "border-brand-sand bg-transparent text-stone-400 hover:border-stone-500"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-stone-600"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                  Select Dimension:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                        selectedSize === size
                          ? "bg-brand-gold text-[#0E1410] font-bold shadow-sm"
                          : "bg-brand-linen text-stone-300 border border-brand-sand hover:border-stone-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Care Instructions Accordion */}
              <div className="border-t border-brand-sand pt-3">
                <button
                  type="button"
                  onClick={() => setShowCare(!showCare)}
                  className="flex items-center justify-between w-full text-xs uppercase tracking-wider text-stone-400 hover:text-brand-gold"
                >
                  <span>Atelier Fabric Care & Laundering</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCare ? "rotate-180" : ""}`} />
                </button>
                {showCare && (
                  <ul className="mt-2 text-xs text-stone-400 space-y-1 list-disc list-inside pl-1">
                    {product.careInstructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Actions: Quantity & Add to Bag */}
            <div className="pt-4 border-t border-brand-sand space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-brand-sand bg-brand-linen">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-stone-400 hover:bg-[#233026] hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-brand-charcoal">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-stone-400 hover:bg-[#233026] hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className="flex-1 bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] py-3.5 text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 shadow-luxury"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-900 font-bold" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Shopping Bag • ৳{(product.price * quantity).toLocaleString("en-BD")}</span>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-3.5 border border-brand-sand bg-brand-linen hover:border-brand-gold text-brand-charcoal hover:text-brand-gold transition-colors flex items-center justify-center"
                  title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  aria-label="Toggle Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isInWishlist(product.id) ? "text-rose-500 fill-rose-500" : "text-brand-charcoal hover:text-brand-gold"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                <span>Quality Guaranteed • Hassle-free Exchange within 7 Days</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
