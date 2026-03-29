import React from 'react'
import { useCart } from '../context/Cartcontext'
import './Cart.css'

const FloatingCart = () => {
    const { cartCount, toggleCart, isCartOpen } = useCart()

    // Siempre visible en móvil si el drawer está cerrado
    if (isCartOpen) return null

    return (
        <button
            onClick={toggleCart}
            className="cart-floating-mobile lg:hidden"
            aria-label="Ver Carrito"
        >
            <div className="relative flex items-center justify-center w-full h-full">
                <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                {cartCount > 0 && (
                    <span className="cart-mobile-badge animate-bounce shadow-lg">
                        {cartCount > 99 ? '99+' : cartCount}
                    </span>
                )}
            </div>
        </button>
    )
}

export default FloatingCart
