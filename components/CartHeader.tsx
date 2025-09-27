"use client";

import React from "react";
import { X } from "lucide-react";

interface CartHeaderProps {
  itemCount: number;
  onClose: () => void;
}

const CartHeader = ({ itemCount, onClose }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">
        Shopping cart ({itemCount})
      </h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartHeader;
