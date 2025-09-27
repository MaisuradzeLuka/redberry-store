"use client";

import React, { useEffect, useState } from "react";
import {
  getCartItems,
  deleteCartItem,
  updateCartItemQuantity,
} from "@/actions/cart";
import CartItemComponent from "./CartItem";
import CartHeader from "./CartHeader";
import ErrorDisplay from "./ErrorDisplay";
import CartSummary from "./CartSummary";

interface CartItem {
  id: number;
  name: string;
  cover_image: string;
  price: number;
  total_price: number;
  quantity: number;
  color: string;
  size: string;
  available_colors: string[];
  available_sizes: string[];
  description: string;
  images: string[];
  release_year: string;
}


const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadCartItems = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Please sign in to view your cart");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await getCartItems(token);

      if (res.success) {
        setCartItems(res.data);
        setError(null);
      } else {
        setError(res.message || "Failed to load cart items");
      }
    } catch (error) {
      console.error("Error loading cart items:", error);
      setError("An unexpected error occurred while loading cart items");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const handleDeleteItem = async (
    productId: number,
    color: string,
    size: string
  ) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Please sign in to manage your cart");
      return;
    }

    setIsDeleting(productId);
    setError(null);

    try {
      const res = await deleteCartItem(productId.toString(), token);

      if (res.success) {
        setCartItems((prevItems) =>
          prevItems.filter(
            (item) =>
              !(
                item.id === productId &&
                item.color === color &&
                item.size === size
              )
          )
        );
        setError(null);
      } else {
        setError(res.message || "Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      setError("An unexpected error occurred while removing item");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleQuantityUpdate = async (
    productId: number,
    newQuantity: number,
    color: string,
    size: string
  ) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Please sign in to manage your cart");
      return;
    }

    setIsUpdating(productId);
    setError(null);

    try {
      const res = await updateCartItemQuantity(
        productId.toString(),
        newQuantity,
        token
      );

      if (res.success) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === productId && item.color === color && item.size === size
              ? {
                  ...item,
                  quantity: newQuantity,
                  total_price: res.data.total_price,
                }
              : item
          )
        );
        setError(null);
      } else {
        setError(res.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      setError("An unexpected error occurred while updating quantity");
    } finally {
      setIsUpdating(null);
    }
  };
  useEffect(() => {
    const handleOpenCart = () => {
      setIsOpen(true);
      loadCartItems();
    };
    window.addEventListener("openCart", handleOpenCart);

    return () => {
      window.removeEventListener("openCart", handleOpenCart);
    };
  }, []);

  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) =>
      sum + (item.total_price || item.price * item.quantity),
    0
  );

  const delivery = 5;
  const total = subtotal + delivery;

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
        <CartHeader itemCount={cartItems.length} onClose={() => setIsOpen(false)} />

        <ErrorDisplay error={error} onDismiss={() => setError(null)} />

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading cart items...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item: CartItem, index: number) => (
                <CartItemComponent
                  key={`${item.id}-${item.color}-${item.size}-${index}`}
                  item={item}
                  index={index}
                  isDeleting={isDeleting}
                  isUpdating={isUpdating}
                  onDelete={handleDeleteItem}
                  onQuantityUpdate={handleQuantityUpdate}
                />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <CartSummary subtotal={subtotal} delivery={delivery} total={total} />
        )}
      </div>
    </>
  );
};

export default CartSidebar;
