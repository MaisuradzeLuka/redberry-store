"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { ProductsType } from "@/types";
import { addToCart } from "@/actions/cart";
import { redirect } from "next/navigation";

interface ProductDetailsProps {
  product: ProductsType;
  id: string;
}

const colorMap: { [key: string]: string } = {
  "Baby pink": "bg-pink-200",
  Purple: "bg-purple-400",
  "Light pink": "bg-pink-100",
  Yellow: "bg-yellow-300",
  Red: "bg-red-400",
  Blue: "bg-blue-400",
  Green: "bg-green-400",
  Black: "bg-gray-900",
  White: "bg-gray-100",
};

const ProductDetails = ({ product, id }: ProductDetailsProps) => {
  const availableColors = product.available_colors;
  const availableSizes = product.available_sizes;

  const [selectedColor, setSelectedColor] = useState(availableColors[0] || "");
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleAddToCart = async () => {
    if (!token) {
      redirect("/sign-in");
    }

    try {
      const res = await addToCart(
        quantity,
        selectedColor,
        selectedSize,
        id,
        token
      );

      // Open cart after adding item
      if (res.success) {
        window.dispatchEvent(new CustomEvent("openCart"));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>

      <div className="text-2xl font-semibold text-gray-900">
        $ {product.price}
      </div>

      {availableColors.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Color</h3>
          <div className="flex space-x-3">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-gray-900"
                    : "border-gray-300"
                } ${colorMap[color] || "bg-gray-200"}`}
                title={color}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">Selected: {selectedColor}</p>
        </div>
      )}

      {availableSizes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
          <div className="flex space-x-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm font-medium border rounded-md transition-colors ${
                  selectedSize === size
                    ? "bg-gray-100 border-gray-900 text-gray-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          {Array.from(
            { length: Math.min(10, product.quantity || 10) },
            (_, i) => i + 1
          ).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {product.quantity && product.quantity < 10 && (
          <p className="text-xs text-gray-500">
            Only {product.quantity} available
          </p>
        )}
      </div>

      <Button
        onClick={handleAddToCart}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-medium cursor-pointer"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to cart
      </Button>
    </div>
  );
};

export default ProductDetails;
