import React, { useRef } from 'react';
import { Category } from '../types';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  categories: Category[];
}

// Fotos oficiais das categorias (CDN oficial).
// Também salvas localmente em /imagens/categorias/<categoria>.jpg ("/" vira "_").
const CATEGORY_IMAGES: Record<string, string> = {
  'TODOS': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200&auto=format&fit=crop',
  'Arabic Collection': 'https://cdn.vendizap.com/vendizap-categorias/c3bb307d8a7769abb95bc32bcaf8b664.webp',
  'Árabe': 'https://cdn.vendizap.com/vendizap-categorias/8d05d8748114ce84ecfbf8022cd8206d.webp',
  'Body Splash Brand Colletion': 'https://cdn.vendizap.com/vendizap-categorias/5c43833f0370e87f8b6e8e482b898db8.webp',
  'Brand 25ml': 'https://cdn.vendizap.com/vendizap-categorias/5c5ed2e65d34c8236588f622ea7a471e.webp',
  'Brand 80/100ml': 'https://cdn.vendizap.com/vendizap-categorias/23af23b39a3a0df252574f4c8fb6950e.webp',
  'Decant 5ml': 'https://cdn.vendizap.com/vendizap-categorias/807168895e6a252a3d42bcfdf0e646ca.webp',
  'Dream Brand 25ml': 'https://cdn.vendizap.com/vendizap-categorias/d69d275a8a8b8c037b8054221d6ceb42.webp',
  'Isabelle La Belle': 'https://cdn.vendizap.com/vendizap-categorias/5b792b96e492c4411111b891250eea54.webp',
  'Sapatinhos 25ml': 'https://cdn.vendizap.com/vendizap-categorias/35a48509a17f963007da1cbbf178ff10.webp',
  'Splash Árabe': 'https://cdn.vendizap.com/vendizap-categorias/0c442d53089bc9781a6762a1db5a5d8e.webp',
  'Tubetes 30ml': 'https://cdn.vendizap.com/vendizap-categorias/d6b90e3a8002c4ab57f333d183c02e8f.webp',
};

// Nome do arquivo local da categoria ("/" não pode em nome de arquivo).
export function categoryImageFile(category: string): string {
  return category.replace(/\//g, '_');
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  categories
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: number) => {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  const arrowClass =
    'hidden md:flex shrink-0 w-9 h-9 items-center justify-center rounded-full border border-black/15 dark:border-white/20 bg-white dark:bg-white/10 text-black/60 dark:text-white/60 shadow hover:border-[#D4AF37] hover:text-black dark:hover:text-white transition-colors';

  return (
    <div className="bg-white dark:bg-[#121212] border-b border-black/5 dark:border-white/10 py-5 px-2 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <button
          onClick={() => scrollCategories(-1)}
          className={arrowClass}
          aria-label="Categorias anteriores"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div ref={scrollRef} className="flex flex-1 items-start gap-4 sm:gap-6 overflow-x-auto hide-scrollbar px-3 pt-1 pb-3">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category;
          const image = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['TODOS'];

          return (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.08, transition: { delay: 0, duration: 0.2 } }}
              whileTap={{ scale: 0.94, transition: { delay: 0, duration: 0.15 } }}
              key={category}
              onClick={() => onSelectCategory(category)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer shrink-0"
              style={{ width: '70px' }}
            >
              <div 
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-md ${
                  isSelected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37] ring-offset-2' : 'border-black/10 group-hover:border-[#D4AF37]'
                }`}
              >
                <img
                  src={`/imagens/categorias/${categoryImageFile(category)}.jpg`}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith('.jpg')) {
                      target.src = `/imagens/categorias/${categoryImageFile(category)}.png`;
                    } else if (target.src.endsWith('.png')) {
                      target.src = image; // fallback to the default unsplash image
                    } else {
                      target.src = CATEGORY_IMAGES['TODOS'];
                    }
                  }}
                />
              </div>
              <span
                className={`text-[9px] sm:text-[10px] text-center font-semibold uppercase leading-tight line-clamp-2 ${
                  isSelected ? 'text-black dark:text-white' : 'text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white'
                }`}
              >
                {category === 'TODOS' ? 'Todos' : category}
              </span>
            </motion.button>
          );
        })}
        </div>
        <button
          onClick={() => scrollCategories(1)}
          className={arrowClass}
          aria-label="Próximas categorias"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

