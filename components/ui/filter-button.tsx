"use client";

import * as React from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function FilterButton({ 
  className, 
  isActive = false, 
  children, 
  ...props 
}: FilterButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors",
        isActive && "text-gray-900 font-medium",
        className
      )}
      {...props}
    >
      <Filter className="h-4 w-4" />
      {children}
    </button>
  );
}

