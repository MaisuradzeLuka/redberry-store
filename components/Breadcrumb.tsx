import React from "react";
import { ChevronLeft } from "lucide-react";

const Breadcrumb = () => {
  return (
    <div className="border-b border-gray-200 px-6 py-4">
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <span>Listing</span>
        <ChevronLeft className="h-4 w-4 rotate-180" />
        <span className="text-gray-900">Product</span>
      </nav>
    </div>
  );
};

export default Breadcrumb;
