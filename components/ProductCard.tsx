import { ProductsType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ images, name, price, id }: ProductsType) => {
  return (
    <Link href={`/products/${id}`} className="w-full">
      <Image
        width={410}
        height={550}
        alt="product image"
        src={images[0]}
        className="object-cover w-[410px] h-[550px]"
      />

      <div>
        <h3>{name}</h3>
        <p>&#36; {price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
