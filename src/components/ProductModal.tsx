import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatBRL } from '../utils/format';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative bg-white dark:bg-[#151515] w-full max-w-3xl max-h-[90vh] overflow-y-auto border-t-4 border-[#D4AF37] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black text-white p-2 hover:bg-[#D4AF37] hover:text-black transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="relative bg-white border-b sm:border-b-0 sm:border-r border-black/10 min-h-[280px]">
            <img
              src={`/imagens/produtos/${product.code}.jpg`}
              alt={product.name}
              className="w-full h-full object-cover p-4 mix-blend-multiply"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.endsWith('.jpg')) {
                  target.src = `/imagens/produtos/${product.code}.png`;
                } else if (target.src.endsWith('.png')) {
                  target.src = product.image;
                } else {
                  target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800';
                }
              }}
            />
            <div className="absolute top-2 left-2 bg-black/70 text-[#D4AF37]/90 text-[8px] font-medium px-1.5 py-0.5 uppercase tracking-wide">
              CÓD: {product.code}
            </div>
          </div>

          <div className="p-5 sm:p-6 flex flex-col">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">
              {product.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white uppercase tracking-tight leading-snug">
              {product.name}
            </h2>
            <p className="text-xs text-black/60 dark:text-white/60 uppercase tracking-widest mt-1 mb-4">
              Ref: {product.inspiration}
            </p>

            {(product.volume || product.gender) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.volume && (
                  <span className="text-[10px] font-bold uppercase tracking-widest border border-black/15 px-2 py-1">
                    {product.volume}
                  </span>
                )}
                {product.gender && (
                  <span className="text-[10px] font-bold uppercase tracking-widest border border-black/15 px-2 py-1">
                    {product.gender}
                  </span>
                )}
              </div>
            )}

            {product.description && (
              <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-4">
                {product.description}
              </p>
            )}

            <div className="mt-auto pt-2">
              <div className="font-extrabold text-3xl text-black dark:text-white tracking-tight mb-1">
                {formatBRL(product.wholesalePrice)}
              </div>
              <p className="text-[11px] text-black/50 dark:text-white/50 mb-4">⚠️ Preços podem sofrer variações. Consulte via WhatsApp.</p>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-black text-white h-11">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-full flex items-center justify-center hover:text-[#D4AF37] transition-colors"
                    aria-label="Diminuir"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-full flex items-center justify-center hover:text-[#D4AF37] transition-colors"
                    aria-label="Aumentar"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(quantity);
                    onClose();
                  }}
                  className="flex-1 h-11 bg-transparent border border-black text-black font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
