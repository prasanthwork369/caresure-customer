import type { ImageSourcePropType } from "react-native";

export interface CategoryTab {
  id: string;
  label: string;
  imageActive?: { uri: string };
  imageInactive?: { uri: string };
}

export interface CategoryCard {
  id: string;
  slug: string;
  familyId: string;
  familySlug: string;
  label: string;
  image: { uri: string } | null;
  bgColor: string;
}

export interface Product {
  id: string;
  productId: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: ImageSourcePropType | null;
  requiresPrescription?: boolean;
}

export interface ApiHero {
  image: string;
  title: string;
  labelImage: string;
  status_text: string;
  highlighted_text: string[];
}

export interface ApiBanner {
  alt: string;
  link: string;
  imageUrl: string;
}

export interface ApiPromiseItem {
  label: string;
  iconUrl: string;
}

export interface ApiPromise {
  title: string;
  items: ApiPromiseItem[];
}

export interface ApiFooterLabel {
  icon: string;
  text: string;
}

export interface ApiFooter {
  title: string;
  labels: ApiFooterLabel[];
  iconUrl: string;
  imageUrl: string;
}

export interface ApiAppContent {
  hero: ApiHero;
  banners: ApiBanner[];
  promise: ApiPromise;
  footer: ApiFooter;
}
