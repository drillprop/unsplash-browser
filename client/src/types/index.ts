// Generated with https://app.quicktype.io/

export interface UnsplashAutocompleteResponse {
  query: string;
  priority: number;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: Result[];
}

export interface Source {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: Result;
}

export interface Tag {
  type: Type;
  title: string;
  source?: Source;
}

export interface Result {
  id: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: null | string;
  urls: Urls;
  links: ResultLinks;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  user: User;
  tags?: Tag[];
}

export interface Ancestry {
  type: Category;
  category?: Category;
  subcategory?: Category;
}

export interface Category {
  slug: string;
  pretty_slug: string;
}

export enum Type {
  LandingPage = 'landing_page',
  Search = 'search',
}

export interface ResultLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: null | string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}
