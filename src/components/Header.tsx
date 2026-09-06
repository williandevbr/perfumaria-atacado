import React, { useState } from 'react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  storeName: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenMenu,
  storeName,
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-white text-black shadow-sm relative z-40"
    >
      <div className="mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="flex items-center justify-between gap-4">
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center font-serif cursor-pointer"
          >
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="Logo BA" 
                className="h-6 sm:h-8 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="border border-[#D4AF37] p-0.5">
                <span className="text-[#D4AF37] text-2xl sm:text-3xl tracking-tighter block leading-none pb-1 pr-1">BA</span>
              </div>
            )}
          </motion.div>

          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative flex items-center w-full max-w-2xl">
              <Search className="absolute left-4 text-black/40 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar fragrâncias ou referências..."
                className="w-full bg-white border border-black/25 rounded-full py-2.5 pl-12 pr-10 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all"
              />
              {searchQuery && (
                <button onClick={onClearSearch} className="absolute right-4 text-black/40 hover:text-black transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-black hover:text-[#D4AF37] transition-colors"
            >
              <ShoppingCart className="w-6 h-6 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -translate-y-1 translate-x-1 bg-[#D4AF37] text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button
              onClick={onOpenMenu}
              className="p-2 text-black hover:text-[#D4AF37] transition-colors"
            >
              <Menu className="w-6 h-6 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
