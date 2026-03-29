import React from 'react'
import { useCart } from '../context/Cartcontext'

const CartButton = ({ scrolled }) => {
  const { cartItems, cartCount, toggleCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const cartTotal = cartItems.reduce((acc, item) => {
    if (item.type === 'ticket' && item.total !== undefined) {
      return acc + item.total
    }
    return acc + (item.price * (item.quantity || 1))
  }, 0)

  return (
    <button
      onClick={toggleCart}
      className={`relative flex items-center gap-4 px-6 py-3 rounded-2xl transition-all duration-500 group shadow-xl ${scrolled
        ? 'bg-gray-900 border border-gray-800 text-white hover:bg-[#f5522a] hover:shadow-orange-500/40 hover:scale-[1.02]'
        : 'bg-gray-900/90 backdrop-blur-md border border-white/10 text-white hover:bg-gray-900'
        }`}
    >
      <div className="relative">
        <svg
          className="w-5 h-5 transition-transform duration-500 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>

        {cartCount > 0 && (
          <span className="absolute -top-3 -right-3 bg-[#f5522a] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-900 animate-pulse">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </div>

      <div className="flex flex-col items-start leading-none gap-1">
        <span className="text-[9px] uppercase font-black tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors">Mi Carrito</span>
        <span className="text-sm font-black tracking-tight">{formatPrice(cartTotal)}</span>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </button>
  )
}

export default CartButton