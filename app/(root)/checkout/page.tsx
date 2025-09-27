import React from "react";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";

const CheckoutPage = () => {
  return (
    <div className="h-[650px] bg-white">
      <div className="max-w-[1720px] h-full mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-black mb-8">Checkout</h1>

        <div className="w-full h-full flex items-start gap-20">
          <div className="w-[1100px] h-full bg-[#F8F6F7] p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Order details
            </h2>

            <CheckoutForm />
          </div>

          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
