"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex space-x-4">
      {/* Thumbnail Images - Left Side */}
      <div className="flex flex-col space-y-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
              selectedImage === index ? "border-gray-900" : "border-gray-200"
            }`}
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="aspect-[4/5] relative bg-gray-100 rounded-lg overflow-hidden flex-1">
        <Image
          src={images[selectedImage] || images[0]}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
