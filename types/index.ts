export type BrandType = {
  id: number;
  name: string;
  image: string;
};

export type ProductsType = {
  id: number;
  name: string;
  description: string;
  release_date: string;
  cover_image: string;
  images: string[];
  price: number;
  total_price: number;
  quantity: number;
  brand: BrandType;
  available_colors: string[];
  available_sizes: string[];
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

export type UserType = {
  avatar: string;
  email: string;
  id: number;
  username: string;
};
