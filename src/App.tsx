import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Product, CartItem } from './types';
import { generateFullCatalog, STORE_SETTINGS } from './data/products';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { MenuDrawer } from './components/MenuDrawer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const masterCatalog = useMemo(() => generateFullCatalog(), []);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('ba_dark_mode');
      if (saved !== null) return saved === '1';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('ba_dark_mode', darkMode ? '1' : '0');
    } catch {
      // ignore
    }
  }, [darkMode]);
  
  const [selectedCategory, setSelectedCategory] = useState<Category>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('perfumaria_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('perfumaria_cart', JSON.stringify(cart));
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: Category[] = [
    'TODOS',
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
  ];

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    // Add a slight delay to allow React to render the filtered list before scrolling
    setTimeout(() => {
      document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return masterCatalog.filter((p) => {
      if (selectedCategory !== 'TODOS' && p.category !== selectedCategory) return false;
      if (query) {
        return p.name.toLowerCase().includes(query) || p.code.toLowerCase().includes(query) || p.inspiration.toLowerCase().includes(query);
      }
      return true;
    });
  }, [masterCatalog, selectedCategory, searchQuery]);

  useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategory, searchQuery]);

  const displayedProducts = useMemo(() => filteredProducts.slice(0, visibleCount), [filteredProducts, visibleCount]);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty <= 0) return prev.filter(i => i.product.id !== product.id);
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: newQty } : i);
      }
      if (quantity > 0) return [...prev, { product, quantity }];
      return prev;
    });
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    cart.forEach(item => { map[item.product.id] = item.quantity; });
    return map;
  }, [cart]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#F8F8F8] dark:bg-[#0B0B0B] text-black dark:text-neutral-100 font-sans transition-colors"
    >
      <Header
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        storeName={STORE_SETTINGS.storeName}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(v => !v)}
      />

      {/* Hero Banner Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="w-full h-[180px] sm:h-[350px] md:h-[360px] bg-white relative overflow-hidden flex items-center justify-center border-b-2 border-[#D4AF37]"
      >
        <img
          src="/barbara6.jpg"
          alt="BA PARFUMS"
          className="w-full h-full object-cover object-[50%_46%]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/barbara.jpeg';
            target.onerror = () => {
              target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=2000';
              target.className = "w-full h-full object-cover";
            };
          }}
        />
      </motion.div>

      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        categories={categories}
      />

      <div className="max-w-3xl mx-auto px-4 mt-8 mb-4 md:hidden">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-black/40 dark:text-white/40 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar fragrâncias ou referências..."
            className="w-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-full py-3 pl-12 pr-10 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <main id="produtos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-black/60 dark:text-white/60 font-medium">
            Nenhum produto encontrado.
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
            >
              <AnimatePresence>
                {displayedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 24 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: (index % 12) * 0.04 }}
                  >
                    <ProductCard
                      product={product}
                      quantityInCart={cartQuantityMap[product.id] || 0}
                      onAddToCart={handleAddToCart}
                      onSelect={setSelectedProduct}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            {visibleCount < filteredProducts.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount(v => v + 24)}
                  className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  Carregar Mais Produtos
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-black dark:bg-[#121212] dark:border-t dark:border-[#D4AF37]/30 text-white py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} {STORE_SETTINGS.storeName}. Todos os direitos reservados.</p>
        <p className="mt-2 text-xs text-white/60">⚠️ Os preços podem sofrer variações. Consulte via WhatsApp {STORE_SETTINGS.whatsappDisplay}.</p>
      </footer>

      <BackToTop />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={(id, delta) => {
          const item = cart.find(i => i.product.id === id);
          if (item) handleAddToCart(item.product, delta);
        }}
        onRemoveItem={(id) => {
          const item = cart.find(i => i.product.id === id);
          if (item) handleAddToCart(item.product, -item.quantity);
        }}
      />
      
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(quantity) => handleAddToCart(selectedProduct, quantity)}
          />
        )}
      </AnimatePresence>

      {/* Floating Cart for Mobile */}
      {cartTotalItems > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="sm:hidden fixed bottom-6 right-6 bg-[#D4AF37] text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-40"
        >
          <div className="relative">
             <ShoppingCart className="w-6 h-6" />
             <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
               {cartTotalItems}
             </span>
          </div>
        </button>
      )}
    </motion.div>
  );
}
