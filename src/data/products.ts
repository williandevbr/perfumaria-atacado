import { Product } from '../types';
import { CATALOG } from './catalog';

// Catálogo real — BA PARFUMS (1973 produtos).
// Os dados estão em ./catalog.ts (gerado a partir do site oficial).
// Foto de cada produto: /imagens/produtos/<code>.jpg  (code = id oficial do produto)
// Preço de atacado = preço base do catálogo + acréscimo por categoria (tabela 2026).
export const PRICE_ADJUSTMENTS: Record<string, number> = {
  'Arabic Collection': 40.0,
  'Árabe': 62.0,
  'Body Splash Brand Colletion': 40.0,
  'Brand 25ml': 40.0,
  'Brand 80/100ml': 40.0,
  'Decant 5ml': 23.0,
  'Dream Brand 25ml': 40.0,
  'Isabelle La Belle': 42.0,
  'Sapatinhos 25ml': 38.0,
  'Splash Árabe': 39.0,
  'Tubetes 30ml': 35.0,
};

export function getPriceAdjustment(category: string): number {
  return PRICE_ADJUSTMENTS[category] ?? 0;
}

export function generateFullCatalog(): Product[] {
  return CATALOG.map((p) => {
    const add = getPriceAdjustment(p.category);
    if (!add) return p;
    const wholesalePrice = Math.round((p.wholesalePrice + add) * 100) / 100;
    const retailPrice = Math.round((p.retailPrice + add) * 100) / 100;
    return { ...p, wholesalePrice, retailPrice };
  });
}

export const STORE_SETTINGS = {
  storeName: 'BA PARFUMS',
  tagline: 'Distribuidora Oficial de Perfumes & Miniaturas',
  whatsappNumber: '38997256058',
  whatsappDisplay: '(38) 99725-6058',
  minWholesaleQuantity: 5, // 5 unidades variadas
  cityOrigin: 'Minas Gerais - Envio Nacional',
  address: 'Atendimento & Despacho para todo o Brasil',
  categories: [
    'Arabic Collection',
    'Árabe',
    'Body Splash Brand Colletion',
    'Brand 25ml',
    'Brand 80/100ml',
    'Decant 5ml',
    'Dream Brand 25ml',
    'Isabelle La Belle',
    'Sapatinhos 25ml',
    'Splash Árabe',
    'Tubetes 30ml'
  ] as const
};
