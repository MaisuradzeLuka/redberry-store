import React from "react";
import Link from "next/link";
import { getProducts } from "@/actions/products";
import { MetaType, ProductsType } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ResultCount } from "@/components/ui/result-count";
import { FilterWrapper } from "@/components/FilterWrapper";
import { SortDropdown } from "@/components/ui/sort-dropdown";
import { Pagination } from "@/components/Pagination";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; "filter[price_from]": string; "filter[price_to]": string }>;
}) => {
  const { page, "filter[price_from]": price_from, "filter[price_to]": price_to } = await searchParams;

  const res = await getProducts(page, price_from, price_to);
  const products: ProductsType[] = res.success ? res.data.data : [];
  const meta: MetaType = res.success ? res.data.meta : null;

  return (
    <main className="w-[1720px] mx-auto mt-18 pb-14">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#10151F] text-5xl font-semibold">Products</h2>

          <div className="flex items-center gap-4 text-sm">
            <ResultCount
              from={meta?.from || 0}
              to={meta?.to || 0}
              total={meta?.total || 0}
            />

            <div className="h-4 w-px bg-gray-300" />

            <FilterWrapper />

            <div className="h-4 w-px bg-gray-300" />

            <SortDropdown>Sort by</SortDropdown>
          </div>
        </div>
      </div>

      {products.length ? (
        <div className="w-full grid grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="w-max mx-auto mt-40 text-2xl">
          No products available.
        </div>
      )}

      {meta && (
        <Pagination
          currentPage={meta.current_page}
          totalPages={meta.last_page}
        />
      )}
    </main>
  );
};

export default HomePage;
