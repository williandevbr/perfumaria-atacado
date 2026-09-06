import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-black dark:bg-[#D4AF37] text-white dark:text-black border border-[#D4AF37]/60 shadow-2xl flex items-center justify-center hover:bg-[#D4AF37] dark:hover:bg-white hover:text-black transition-all"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
