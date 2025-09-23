"use client";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "created_at", label: "New products first" },
  { value: "-created_at", label: "Old products first" },
  { value: "price", label: "Price, low to high" },
  { value: "-price", label: "Price, high to low" },
];

export function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      const option = sortOptions.find((opt) => opt.value === sortParam);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", option.value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <span className="text-sm">Sort by</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 border border-[#E1DFE1] bg-white rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Sort by</h3>
          </div>
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedOption?.value === option.value
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
