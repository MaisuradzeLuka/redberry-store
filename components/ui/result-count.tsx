"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ResultCountProps {
  from: number;
  to: number;
  total: number;
  className?: string;
}

export function ResultCount({ from, to, total, className }: ResultCountProps) {
  return (
    <span className={cn("text-gray-700 text-sm", className)}>
      Showing {from}-{to} of {total} results
    </span>
  );
}

