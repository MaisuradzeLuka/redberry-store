import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">RedSeam Clothing</h1>
          <p className="text-gray-600">Welcome to your dashboard!</p>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            You have successfully authenticated with RedSeam Clothing.
          </p>
          
          <div className="pt-4 border-t border-gray-200">
            <Link
              href="/sign-in"
              className="text-orange-500 hover:text-orange-600 font-medium text-sm"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;