import React from 'react';
import { Product } from '../types';
import { formatBRL } from '../utils/format';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onSelect,
}) => {
  return (
    <div className="bg-white dark:bg-[#151515] group rounded-none border border-black/10 dark:border-white/10 overflow-hidden flex flex-col h-full hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300">
      <div
        className="relative aspect-square w-full bg-white dark:bg-white border-b border-black/10 dark:border-white/10 overflow-hidden cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <img
          src={`/imagens/produtos/${product.code}.jpg`}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Se falhar o jpg local, tenta o png local
            if (target.src.endsWith('.jpg')) {
              target.src = `/imagens/produtos/${product.code}.png`;
            } else if (target.src.endsWith('.png')) {
              // Se falhar o png local, usa a imagem do banco de dados (unsplash)
              target.src = product.image;
            } else {
              target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400';
            }
          }}
        />
        <div className="absolute top-0 left-0 bg-black/70 text-[#D4AF37]/90 text-[8px] font-medium px-1.5 py-0.5 uppercase tracking-wide">
          CÓD: {product.code}
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1 text-center">
        <div className="cursor-pointer" onClick={() => onSelect(product)}>
          <h3 className="text-xs sm:text-[13px] font-bold text-black dark:text-white uppercase tracking-tight line-clamp-2 leading-snug mb-0.5">
            {product.name}
          </h3>
          <p className="text-[9px] sm:text-[10px] text-black/70 dark:text-white/60 uppercase tracking-widest line-clamp-1 mb-2">
            Ref: {product.inspiration}
          </p>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex flex-col items-center justify-center gap-0">
            <span className="font-extrabold text-lg text-black dark:text-white tracking-tight">{formatBRL(product.wholesalePrice)}</span>
          </div>

          {quantityInCart > 0 ? (
            <div className="flex items-center justify-between bg-black dark:bg-[#D4AF37] text-white dark:text-black rounded-none p-1 h-8 border border-black dark:border-[#D4AF37]">
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product, -1); }}
                className="w-8 h-full flex items-center justify-center hover:text-[#D4AF37] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-xs">{quantityInCart}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); }}
                className="w-8 h-full flex items-center justify-center hover:text-[#D4AF37] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product, 1); }}
              className="w-full h-8 bg-transparent border border-black dark:border-white/30 text-black dark:text-white font-bold text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Adicionar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
