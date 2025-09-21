import React from "react";
import Link from "next/link";
import { getProducts } from "@/actions/products";
import { ProductsType } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const res = await getProducts();

  const products: ProductsType[] = res.success ? res.data : [];

  return (
    <main className="w-[1720px] mx-auto mt-18 pb-14">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[#10151F] text-5xl font-semibold">
          Featured Products
        </h2>
        <Link href="/products">
          <Button variant="outline">View All Products</Button>
        </Link>
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
    </main>
  );
};

export default HomePage;
