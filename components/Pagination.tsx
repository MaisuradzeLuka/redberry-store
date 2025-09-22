"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
  showEllipsis?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showEllipsis = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  const router = useRouter();
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    const addRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) pages.push(i);
    };

    if (totalPages <= maxVisiblePages) {
      addRange(1, totalPages);
      return pages;
    }

    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;

    pages.push(1);

    if (!showLeftEllipsis) {
      addRange(2, Math.min(maxVisiblePages - 1, totalPages - 1));
      if (showRightEllipsis) pages.push("...");
    } else if (!showRightEllipsis) {
      pages.push("...");
      addRange(totalPages - (maxVisiblePages - 2), totalPages - 1);
    } else {
      pages.push("...");
      addRange(currentPage - 1, currentPage + 1);
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("page");
    searchParams.append("page", value);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname, { scroll: false });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("page");
      searchParams.append("page", (currentPage - 1).toString());

      const newPathname = `${
        window.location.pathname
      }?${searchParams.toString()}`;
      router.push(newPathname, { scroll: false });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("page");
      searchParams.append("page", (currentPage + 1).toString());

      const newPathname = `${
        window.location.pathname
      }?${searchParams.toString()}`;
      router.push(newPathname, { scroll: false });
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={cn("flex items-center justify-center gap-4 mt-22", className)}
    >
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <button
                key={`ellipsis-${index}`}
                disabled
                className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium cursor-default"
                aria-hidden="true"
              >
                ...
              </button>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              value={page}
              onClick={handleClick}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-md text-sm font-medium transition-all hover:scale-105",
                isActive
                  ? "bg-white border-2 border-orange-500 text-orange-500 shadow-sm"
                  : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
              )}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
