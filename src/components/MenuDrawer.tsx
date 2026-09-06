import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 flex justify-start">
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-[280px] bg-white h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-black flex items-center justify-between border-b border-[#D4AF37]">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Categorias</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-[#D4AF37] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onSelectCategory(category);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-6 py-4 text-left border-b border-black/5 transition-colors ${
                selectedCategory === category 
                  ? 'bg-[#F8F8F8] text-[#D4AF37] font-bold' 
                  : 'text-black hover:bg-black/5 font-medium'
              }`}
            >
              <span className="text-sm uppercase tracking-wide">
                {category === 'TODOS' ? 'Todos os Produtos' : category}
              </span>
              <ChevronRight className={`w-4 h-4 ${selectedCategory === category ? 'text-[#D4AF37]' : 'text-black/30'}`} />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
