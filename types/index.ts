export type ProductsType = {
  available_colors: string[];
  available_sizes: string[];
  cover_image: string;
  description: string;
  id: number;
  images: string[];
  name: string;
  price: number;
  release_year: number;
};

// API Response Types
export type ProductApiResponse = {
  id: number;
  name: string;
  release_year: string;
  image: string;
  price: number;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginationMeta = {
  current_page: number;
  current_page_url: string;
  from: number;
  path: string;
  per_page: number;
  to: number;
};

export type ProductsApiResponse = {
  data: ProductApiResponse[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

// Query Parameters
export type ProductsQueryParams = {
  page?: number;
  "filter[price_from]"?: number;
  "filter[price_to]"?: number;
  sort?: string;
};

// Action Response
export type ProductsActionResponse = {
  success: boolean;
  data?: ProductsApiResponse;
  message?: string;
};
