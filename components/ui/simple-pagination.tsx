"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  queryParams?: Record<string, string | number>;
}

export function SimplePagination({ 
  currentPage, 
  totalPages, 
  baseUrl, 
  queryParams = {} 
}: SimplePaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    
    // Add existing query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    
    // Add page parameter
    if (page > 1) {
      params.append('page', page.toString());
    }
    
    const queryString = params.toString();
    return `${baseUrl}${queryString ? `?${queryString}` : ''}`;
  };

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link href={buildUrl(currentPage - 1)} className="text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="text-gray-400 cursor-not-allowed">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center space-x-2">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="text-gray-600">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Link key={pageNum} href={buildUrl(pageNum)}>
              {isCurrentPage ? (
                <div className="w-8 h-8 flex items-center justify-center border border-red-500 bg-red-50 text-red-600 font-medium rounded">
                  {pageNum}
                </div>
              ) : (
                <span className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 font-medium">
                  {pageNum}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link href={buildUrl(currentPage + 1)} className="text-gray-600 hover:text-gray-900">
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="text-gray-400 cursor-not-allowed">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
