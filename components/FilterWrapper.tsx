"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterButton } from "./Filter-button";

export function FilterWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePriceFilter = (priceFrom: number, priceTo: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    
    // Always remove existing filter parameters first
    params.delete("filter[price_from]");
    params.delete("filter[price_to]");
    
    // Only add parameters if they have valid values
    if (priceFrom > 0 && priceFrom !== Number.MAX_SAFE_INTEGER) {
      params.set("filter[price_from]", priceFrom.toString());
    }
    
    if (priceTo > 0 && priceTo < Number.MAX_SAFE_INTEGER) {
      params.set("filter[price_to]", priceTo.toString());
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return <FilterButton onPriceFilter={handlePriceFilter}>Filter</FilterButton>;
}
