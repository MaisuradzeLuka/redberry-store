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

export type MetaType = {
  current_page: number;
  from: number;
  last_page: number;
  links: string[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};
