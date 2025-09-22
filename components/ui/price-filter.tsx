"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface PriceFilterProps {
  onApply?: (priceFrom: number, priceTo: number) => void;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function PriceFilter({ 
  onApply, 
  className, 
  isOpen = false, 
  onClose 
}: PriceFilterProps) {
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleApply = () => {
    const fromValue = priceFrom ? Number(priceFrom) : 1;
    const toValue = priceTo ? Number(priceTo) : Number.MAX_SAFE_INTEGER;
    
    onApply?.(fromValue, toValue);
    onClose?.();
  };

  const handleReset = () => {
    setPriceFrom("");
    setPriceTo("");
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={filterRef}
      className={cn(
        "absolute top-full left-0 mt-2 z-50",
        className
      )}
    >
      <div className="bg-white rounded-lg p-6 w-80 shadow-xl border-2 border-dashed border-blue-300">
        {/* Title with blue dotted border */}
        <div className="border-2 border-dashed border-blue-300 rounded p-3 mb-6">
          <h3 className="text-lg font-bold text-gray-900">Select price</h3>
        </div>
        
        {/* Input Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="price-from" className="text-sm font-medium text-gray-700">
              From
            </Label>
            <Input
              id="price-from"
              type="number"
              placeholder="0"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price-to" className="text-sm font-medium text-gray-700">
              To
            </Label>
            <Input
              id="price-to"
              type="number"
              placeholder="0"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end items-center mt-8">
          <Button
            onClick={handleApply}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md font-medium"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}