"use client";

import * as React from "react";
import { useState } from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { PriceFilter } from "./Price-filter";

export interface FilterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  onPriceFilter?: (priceFrom: number, priceTo: number) => void;
}

export function FilterButton({
  className,
  isActive = false,
  children,
  onPriceFilter,
  ...props
}: FilterButtonProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handlePriceApply = (priceFrom: number, priceTo: number) => {
    onPriceFilter?.(priceFrom, priceTo);
    setIsFilterOpen(false);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleFilterClick}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer",
          isActive && "text-gray-900 font-medium",
          className
        )}
        {...props}
      >
        <Filter className="h-4 w-4" />
        {children}
      </button>

      <PriceFilter
        isOpen={isFilterOpen}
        onApply={handlePriceApply}
        onClose={handleFilterClose}
      />
    </div>
  );
}
