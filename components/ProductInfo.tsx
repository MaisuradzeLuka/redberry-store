import React from "react";
import { BrandType } from "@/types";

interface ProductInfoProps {
  brand: BrandType;
  description: string;
}

const ProductInfo = ({ brand, description }: ProductInfoProps) => {
  return (
    <div className="space-y-4 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">Details</h3>
      <div className="space-y-2">
        <div>
          <span className="text-sm font-medium text-gray-700">Brand: </span>
          <span className="text-sm text-gray-900">{brand.name}</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
