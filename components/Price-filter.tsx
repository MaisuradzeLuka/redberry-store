"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
  onClose,
}: PriceFilterProps) {
  const filterRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleApply = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const priceFrom = formData.get("priceFrom") as string;
    const priceTo = formData.get("priceTo") as string;

    const fromValue = priceFrom ? Number(priceFrom) : 0;
    const toValue = priceTo ? Number(priceTo) : Number.MAX_SAFE_INTEGER;

    onApply?.(fromValue, toValue);
    onClose?.();
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={filterRef}
      className={cn("absolute top-full right-0 mt-2 z-50", className)}
    >
      <div className="w-[392px] bg-white rounded-lg p-6 shadow-xl border-2 border-[#E1DFE1]">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900">Select price</h3>
        </div>

        <form ref={formRef} onSubmit={handleApply}>
          <div className="flex gap-3 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="price-from"
                className="text-sm font-medium text-gray-700"
              >
                From
              </Label>
              <Input
                id="price-from"
                name="priceFrom"
                type="number"
                placeholder="0"
                defaultValue=""
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="price-to"
                className="text-sm font-medium text-gray-700"
              >
                To
              </Label>
              <Input
                id="price-to"
                name="priceTo"
                type="number"
                placeholder="0"
                defaultValue=""
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md font-medium cursor-pointer"
            >
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
