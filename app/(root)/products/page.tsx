"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getProducts } from "@/actions/products";
import { ProductsApiResponse, ProductApiResponse } from "@/types";
import ProductCard from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { SimplePagination } from "@/components/ui/simple-pagination";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // State for products and pagination
  const [productsData, setProductsData] = useState<ProductsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filters
  const [showFilters, setShowFilters] = useState(false);
  const [priceFrom, setPriceFrom] = useState(searchParams.get('filter[price_from]') || '');
  const [priceTo, setPriceTo] = useState(searchParams.get('filter[price_to]') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  // Fetch products based on current search params
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
        'filter[price_from]': priceFrom ? parseFloat(priceFrom) : undefined,
        'filter[price_to]': priceTo ? parseFloat(priceTo) : undefined,
        sort: sort || undefined,
      };

      const result = await getProducts(params);
      
      if (result.success && result.data) {
        setProductsData(result.data);
      } else {
        setError(result.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update URL with new search params
  const updateUrl = (newParams: Record<string, string | number | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '' || value === undefined) {
        current.delete(key);
      } else {
        current.set(key, value.toString());
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : '';
    
    router.push(`${pathname}${query}`);
  };

  // Handle filter changes
  const handlePriceFromChange = (value: string) => {
    setPriceFrom(value);
    updateUrl({ 'filter[price_from]': value || null, page: null });
  };

  const handlePriceToChange = (value: string) => {
    setPriceTo(value);
    updateUrl({ 'filter[price_to]': value || null, page: null });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    updateUrl({ sort: value || null, page: null });
  };

  const handleClearFilters = () => {
    setPriceFrom('');
    setPriceTo('');
    setSort('');
    updateUrl({ 
      'filter[price_from]': null, 
      'filter[price_to]': null, 
      sort: null, 
      page: null 
    });
  };

  // Fetch products when search params change
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  // Update local state when URL params change
  useEffect(() => {
    setPriceFrom(searchParams.get('filter[price_from]') || '');
    setPriceTo(searchParams.get('filter[price_to]') || '');
    setSort(searchParams.get('sort') || '');
  }, [searchParams]);

  if (loading) {
    return (
      <main className="w-[1720px] mx-auto mt-18 pb-14">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">Loading products...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-[1720px] mx-auto mt-18 pb-14">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      </main>
    );
  }

  if (!productsData) {
    return (
      <main className="w-[1720px] mx-auto mt-18 pb-14">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">No products data available</div>
        </div>
      </main>
    );
  }

  const products = productsData.data;
  const meta = productsData.meta;
  const totalPages = Math.ceil((meta.from + products.length - 1) / meta.per_page);

  return (
    <main className="w-[1720px] mx-auto mt-18 pb-14">
      <ProductFilters
        priceFrom={priceFrom}
        priceTo={priceTo}
        sort={sort}
        onPriceFromChange={handlePriceFromChange}
        onPriceToChange={handlePriceToChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Results info */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {meta.from}-{meta.to} of {meta.from + products.length - 1} results
      </div>

      {products.length > 0 ? (
        <>
          <div className="w-full grid grid-cols-4 gap-6 mb-8">
            {products.map((product: ProductApiResponse) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                cover_image={product.image}
                images={[product.image]}
                available_colors={[]}
                available_sizes={[]}
                description=""
                release_year={parseInt(product.release_year)}
              />
            ))}
          </div>

          <SimplePagination
            currentPage={meta.current_page}
            totalPages={totalPages}
            baseUrl="/products"
            queryParams={{
              'filter[price_from]': priceFrom || undefined,
              'filter[price_to]': priceTo || undefined,
              sort: sort || undefined,
            }}
          />
        </>
      ) : (
        <div className="w-max mx-auto mt-40 text-2xl">
          No products found matching your criteria.
        </div>
      )}
    </main>
  );
};

export default ProductsPage;
