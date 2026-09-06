import React, { useState } from 'react';
import { CartItem } from '../types';
import { STORE_SETTINGS } from '../data/products';
import { formatBRL } from '../utils/format';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [customerName, setCustomerName] = useState('');

  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWholesale = cart.reduce((sum, item) => sum + (item.product.wholesalePrice * item.quantity), 0);

  const handleCheckoutWhatsApp = () => {
    let msg = `*🛍️ NOVO PEDIDO - BA PARFUMS*\n`;
    if (customerName) {
      msg += `*Cliente:* ${customerName}\n\n`;
    }
    msg += `*Itens do Pedido:*\n`;

    cart.forEach((item, index) => {
      const sub = item.product.wholesalePrice * item.quantity;
      msg += `${item.quantity}x ${item.product.name} - ${formatBRL(sub)}\n`;
    });

    msg += `\n*Total de Peças:* ${totalItems} un.\n`;
    msg += `*VALOR TOTAL:* ${formatBRL(totalWholesale)}\n`;

    const encodedText = encodeURIComponent(msg);
    const url = `https://wa.me/55${STORE_SETTINGS.whatsappNumber}?text=${encodedText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white dark:bg-[#121212] border-l border-black/10 dark:border-white/10 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-white dark:bg-[#121212] border-b border-black/10 dark:border-white/10 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-black dark:text-white" />
            <h2 className="text-lg font-bold text-black dark:text-white">Seu Pedido</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#0B0B0B] transition-colors">
          {cart.length === 0 ? (
            <div className="py-14 text-center">
              <ShoppingCart className="w-12 h-12 text-black/20 dark:text-white/20 mx-auto mb-3" />
              <h3 className="text-black/50 dark:text-white/50">Seu carrinho está vazio</h3>
              <p className="mt-3 text-[11px] text-black/50 dark:text-white/50 px-6">⚠️ Os preços podem sofrer variações. Consulte via WhatsApp {STORE_SETTINGS.whatsappDisplay}.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => {
                return (
                  <div
                    key={item.product.id}
                    className="p-3 bg-white dark:bg-white/5 rounded-none border border-black/10 dark:border-white/10 flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-none bg-[#F8F8F8] object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-black dark:text-white truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-sm font-bold text-[#D4AF37]">
                        {formatBRL(item.product.wholesalePrice)}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center bg-[#F8F8F8] dark:bg-white/10 border border-black/10 dark:border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-black/60 dark:text-white/60 hover:text-[#D4AF37]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-black dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-black/60 dark:text-white/60 hover:text-[#D4AF37]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white font-semibold flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Trash2 className="w-3 h-3" /> Remover
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4">
                <label className="block text-sm font-bold text-black dark:text-white mb-1 uppercase tracking-wider">Seu Nome (Opcional):</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full px-3 py-2 rounded-none border border-black/20 dark:border-white/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none bg-white dark:bg-white/10 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                />
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 bg-white dark:bg-[#121212] border-t border-black/10 dark:border-white/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-black/60 dark:text-white/60 font-medium uppercase tracking-wider text-xs">Total ({totalItems} itens)</span>
              <span className="text-xl font-bold text-black dark:text-white">{formatBRL(totalWholesale)}</span>
            </div>

            <p className="text-[11px] leading-relaxed text-black/60 dark:text-white/60 bg-[#F8F8F8] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md px-3 py-2 mb-3">
              ⚠️ Os preços podem sofrer variações. Para confirmar os valores atualizados, consulte via WhatsApp {STORE_SETTINGS.whatsappDisplay}.
            </p>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3 bg-black dark:bg-[#D4AF37] hover:bg-[#D4AF37] dark:hover:bg-white text-white dark:text-black hover:text-black font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              ENVIAR PEDIDO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
