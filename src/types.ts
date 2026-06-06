export interface Review {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export type BrandMode = 'STEAGG' | 'STEAGG_KAWAII';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  gallery: string[];
  brandMode: BrandMode;
  rating: number;
  reviews: Review[];
  features: string[];
  sizes: string[];
  colorHexes: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  stock?: number;
}

export interface CartItem {
  id: string; // unique cart line ID
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface BrandingSettings {
  brandName: string;
  luxurySlogan: string;
  kawaiiSlogan: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  announcementText: string;
  promotionBanner: string;
  qrText: string;
  qrSubtext: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  joinedDate: string;
}
