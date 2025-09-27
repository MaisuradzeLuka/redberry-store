"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  subtotal: number;
  delivery: number;
  total: number;
}

const CartSummary = ({ subtotal, delivery, total }: CartSummaryProps) => {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="border-t border-gray-200 p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items subtotal</span>
          <span className="font-medium">$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery</span>
          <span className="font-medium">$ {delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>$ {total.toFixed(2)}</span>
        </div>
      </div>

      <Button 
        onClick={handleCheckout}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-medium"
      >
        Go to checkout
      </Button>
    </div>
  );
};

export default CartSummary;
