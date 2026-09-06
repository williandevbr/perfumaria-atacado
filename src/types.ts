export type Category =
  | 'TODOS'
  | 'Arabic Collection'
  | 'Árabe'
  | 'Body Splash Brand Colletion'
  | 'Brand 25ml'
  | 'Brand 80/100ml'
  | 'Decant 5ml'
  | 'Dream Brand 25ml'
  | 'Isabelle La Belle'
  | 'Sapatinhos 25ml'
  | 'Splash Árabe'
  | 'Tubetes 30ml';

export type Gender = 'Todos' | 'Feminino' | 'Masculino' | 'Unissex';

export type OlfactoryFamily =
  | 'Todas'
  | 'Amadeirado'
  | 'Oriental / Especiado'
  | 'Floral / Frutado'
  | 'Doce / Gourmand'
  | 'Cítrico / Fresco'
  | 'Chipre';

export interface Product {
  id: string;
  code: string; // e.g. "N° 098", "ARB-102", "SAP-04"
  name: string;
  category: Exclude<Category, 'TODOS'>;
  inspiration: string; // e.g. "Inspiração: Silver Scent - Jacques Bogart"
  gender: 'Feminino' | 'Masculino' | 'Unissex';
  olfactoryFamily: string;
  volume: string; // "25ml", "30ml", "100ml", "250ml", "5ml"
  wholesalePrice: number; // Preço no Atacado
  retailPrice: number; // Preço Sugerido Revenda
  image: string;
  inStock: boolean;
  isTopSeller?: boolean;
  isNew?: boolean;
  description?: string;
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderInfo {
  name: string;
  phone: string;
  city: string;
  state: string;
  shippingPreference: string;
  notes: string;
}

export type ViewMode = 'grid' | 'compact';
