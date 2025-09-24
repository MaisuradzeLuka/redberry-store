import React from "react";
import { ProductsType } from "@/types";
import Breadcrumb from "@/components/Breadcrumb";
import ImageGallery from "@/components/ImageGallery";
import ProductDetails from "@/components/ProductDetails";
import ProductInfo from "@/components/ProductInfo";
import { getProduct } from "@/actions/products";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const res = await getProduct(params.id);

  if (!res.success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Product not found
          </h1>
          <p className="text-gray-600 mt-2">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const product: ProductsType = res.data;

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ImageGallery images={product.images} productName={product.name} />

          <div className="space-y-6">
            <ProductDetails product={product} id={params.id} />
            <ProductInfo
              brand={product.brand}
              description={product.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
