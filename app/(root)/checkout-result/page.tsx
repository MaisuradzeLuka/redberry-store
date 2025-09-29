"use client";

import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderData {
  name: string;
  surname: string;
  email: string;
  address: string;
  zipCode: string;
  orderId: string;
  timestamp: string;
}

const CheckoutResultPage = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedOrderData = sessionStorage.getItem("orderData");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
      // Clear the order data from session storage after displaying
      sessionStorage.removeItem("orderData");
    } else {
      // If no order data, redirect to home page
      router.push("/");
    }
  }, [router]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Success Icon and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <FaCheck className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. We'll send you a confirmation email
            shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Order Details
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Order ID</p>
                <p className="text-lg font-mono text-gray-900">
                  #{orderData.orderId}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Order Date</p>
                <p className="text-lg text-gray-900">
                  {formatDate(orderData.timestamp)}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Shipping Information
              </h3>
              <div className="space-y-2">
                <p className="text-gray-900">
                  <span className="font-medium">Name:</span> {orderData.name}{" "}
                  {orderData.surname}
                </p>
                <p className="text-gray-900">
                  <span className="font-medium">Email:</span> {orderData.email}
                </p>
                <p className="text-gray-900">
                  <span className="font-medium">Address:</span>{" "}
                  {orderData.address}
                </p>
                <p className="text-gray-900">
                  <span className="font-medium">Zip Code:</span>{" "}
                  {orderData.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors"
          >
            Browse Products
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@redberry.com"
              className="text-orange-500 hover:text-orange-600"
            >
              support@redberry.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default CheckoutResultPage;
