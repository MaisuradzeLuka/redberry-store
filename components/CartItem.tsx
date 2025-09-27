"use client";

import React from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

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

interface CartItemProps {
  item: CartItem;
  index: number;
  isDeleting: number | null;
  isUpdating: number | null;
  onDelete: (productId: number, color: string, size: string) => void;
  onQuantityUpdate: (
    productId: number,
    newQuantity: number,
    color: string,
    size: string
  ) => void;
}

const CartItemComponent = ({
  item,
  index,
  isDeleting,
  isUpdating,
  onDelete,
  onQuantityUpdate,
}: CartItemProps) => {
  return (
    <div
      key={`${item.id}-${item.color}-${item.size}-${index}`}
      className=" flex items-start space-x-3 py-3"
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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
              onQuantityUpdate(
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
              onQuantityUpdate(
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
           onClick={() => onDelete(item.id, item.color, item.size)}
           disabled={isDeleting === item.id}
           className="text-xs text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
         >
           {isDeleting === item.id ? "Removing..." : "Remove"}
         </button>
       </div>
    </div>
  );
};

export default CartItemComponent;
