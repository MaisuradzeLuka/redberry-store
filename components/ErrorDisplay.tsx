"use client";

import React from "react";
import { X } from "lucide-react";

interface ErrorDisplayProps {
  error: string | null;
  onDismiss: () => void;
}

const ErrorDisplay = ({ error, onDismiss }: ErrorDisplayProps) => {
  if (!error) return null;
  
  return (
    <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 ml-2 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
