import { Product } from '../types';
import { CATALOG } from './catalog';

// Catálogo real — BA PERFUMS (1973 produtos).
// Os dados estão em ./catalog.ts (gerado a partir do site oficial).
// Foto de cada produto: /imagens/produtos/<code>.jpg  (code = id oficial do produto)
// Preço de atacado = preço promocional quando houver, senão preço normal.
export function generateFullCatalog(): Product[] {
  return CATALOG;
}

export const STORE_SETTINGS = {
  storeName: 'BA Araújo Parfum\'s',
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
