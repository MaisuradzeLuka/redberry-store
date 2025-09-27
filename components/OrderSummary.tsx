"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} from "@/actions/cart";

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

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("token");
        if (token) {
          try {
            const res = await getCartItems(token);
            if (res.success) {
              setCartItems(res.data);
            }
          } catch (error) {
            console.error("Error loading cart items:", error);
          }
        }
      }
      setIsLoading(false);
    };

    loadCartItems();
  }, []);

  const handleQuantityUpdate = async (
    productId: number,
    newQuantity: number,
    color: string,
    size: string
  ) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    setIsUpdating(productId);

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
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDeleteItem = async (
    productId: number,
    color: string,
    size: string
  ) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    setIsDeleting(productId);

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
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) =>
      sum + (item.total_price || item.price * item.quantity),
    0
  );

  const delivery = 5;
  const total = subtotal + delivery;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading order summary...</p>
        </div>
      </div>
    );
  }

  console.log(cartItems);

  return (
    <div className="space-y-6 w-[450px]">
      {cartItems.map((item: CartItem, index: number) => (
        <div
          key={`${item.id}-${item.color}-${item.size}-${index}`}
          className="flex items-start space-x-3 py-3"
        >
          <div className="relative w-25 h-30 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={item.cover_image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 leading-tight">
              {item.name}
            </h4>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
              <span>{item.color}</span>
              <span>•</span>
              <span>{item.size}</span>
            </div>

            <div className="flex items-center mt-3 border border-gray-300 w-max rounded-full p-1">
              <button
                onClick={() =>
                  handleQuantityUpdate(
                    item.id,
                    Math.max(1, item.quantity - 1),
                    item.color,
                    item.size
                  )
                }
                disabled={isUpdating === item.id || item.quantity <= 1}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {isUpdating === item.id ? "..." : item.quantity}
              </span>
              <button
                onClick={() =>
                  handleQuantityUpdate(
                    item.id,
                    item.quantity + 1,
                    item.color,
                    item.size
                  )
                }
                disabled={isUpdating === item.id}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <span className="text-sm font-semibold text-gray-900">
              $ {item.total_price || item.price}
            </span>

            <button
              onClick={() => handleDeleteItem(item.id, item.color, item.size)}
              disabled={isDeleting === item.id}
              className="text-xs text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isDeleting === item.id ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      ))}

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items subtotal</span>
          <span className="font-medium">$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery</span>
          <span className="font-medium">$ {delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>$ {total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-medium">
        Pay
      </Button>
    </div>
  );
};

export default OrderSummary;
