import React, { useState } from 'react'
import { useCart } from '../context/Cartcontext'
import CheckoutPage from '../components/CheckoutPage'
import './Cart.css'

const CartDrawer = () => {
  const { cartItems, subtotal, isCartOpen, closeCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price || 0)
  }

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)

  // Calcular el total considerando item.total del backend para tickets
  const cartTotal = cartItems.reduce((acc, item) => {
    if (item.type === 'ticket' && item.total !== undefined) {
      return acc + item.total
    }
    return acc + (item.price * (item.quantity || 1))
  }, 0)

  const handleProceedToCheckout = () => {
    closeCart()
    setShowCheckout(true)
  }

  if (!isCartOpen && !showCheckout) return null

  return (
    <>
      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity cart-drawer-overlay"
            onClick={closeCart}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full flex flex-col cart-drawer-container shadow-[-20px_0_50px_rgba(0,0,0,0.2)]">

            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Tu Carrito</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <p className="text-gray-500 text-sm font-medium">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items Content */}
            <div className="flex-1 overflow-y-auto cart-items-list px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-6 cart-empty-icon">
                    <svg className="w-16 h-16 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Está vacío?</h3>
                  <p className="text-gray-500 max-w-[240px] mb-8">Parece que aún no tienes nada en tu carrito de compras.</p>
                  <button
                    onClick={closeCart}
                    className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-orange-500 transition-colors active:scale-95 shadow-lg shadow-gray-200"
                  >
                    Empezar a comprar
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item-card rounded-2xl p-2 group">
                      <div className="flex gap-4">
                        {/* Image Wrapper */}
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 shadow-sm border border-gray-100 flex items-center justify-center p-2">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0 py-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              {item.type === 'ticket' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full mb-1">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" /></svg>
                                  Evento
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full mb-1">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                                  Producto
                                </span>
                              )}
                              <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1 truncate">
                                {item.type === 'ticket' ? item.eventName : item.name}
                              </h4>
                              {item.type === 'ticket' ? (
                                <p className="text-xs text-gray-500 font-medium">{item.distance} • {item.date}</p>
                              ) : (
                                <p className="text-xs text-gray-500 font-medium">Precio unitario: {formatPrice(item.price)}</p>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-300 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Item Footer (Quantity/Price) */}
                          <div className="flex items-center justify-between mt-3">
                            {item.type !== 'ticket' ? (
                              <div className="flex items-center bg-gray-50 p-0.5 rounded-lg border border-gray-100">
                                <button
                                  onClick={() => decrementQuantity(item.id)}
                                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 rounded-md transition-all shadow-sm cart-quantity-btn"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="w-8 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                                <button
                                  onClick={() => incrementQuantity(item.id)}
                                  className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 rounded-md transition-all shadow-sm cart-quantity-btn"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <div className="flex -space-x-2 overflow-hidden">
                                  {item.attendees?.slice(0, 3).map((_, i) => (
                                    <div key={i} className="h-6 w-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                    </div>
                                  ))}
                                  {item.attendees?.length > 3 && (
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 border-2 border-white text-[8px] font-bold text-gray-600">
                                      +{item.attendees.length - 3}
                                    </div>
                                  )}
                                </div>
                                <span className="text-xs font-medium text-gray-500">{item.attendees?.length} Asistentes</span>
                              </div>
                            )}
                            <p className="font-bold text-gray-900">
                              {item.type === 'ticket' && item.total !== undefined ? formatPrice(item.total) : formatPrice(item.price * (item.quantity || item.attendees?.length || 1))}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Attendee Details Peek */}
                      {item.type === 'ticket' && item.attendees && (
                        <div className="mt-3 bg-gray-50/50 rounded-xl p-3 border border-dashed border-gray-200">
                          <div className="space-y-1.5">
                            {item.attendees.slice(0, 2).map((att, idx) => (
                              <div key={idx} className="flex items-center justify-between text-[11px] text-gray-600">
                                <span className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                  {att.first_name} {att.last_name_1}
                                </span>
                                {att.shirt_size && <span className="text-gray-400">Talla {att.shirt_size}</span>}
                              </div>
                            ))}
                            {item.attendees.length > 2 && (
                              <p className="text-[10px] text-orange-500 font-bold ml-3.5">+ Ver otros {item.attendees.length - 2} en el pago</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-gray-900 font-semibold">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Envío / Impuestos</span>
                    <span className="text-green-600 font-semibold uppercase text-xs tracking-wider">Calculado en el pago</span>
                  </div>
                  <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-black text-orange-500">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-[#f5522a] hover:bg-[#d43d1a] text-white py-4 rounded-2xl font-bold tracking-tight shadow-xl shadow-orange-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 cart-checkout-btn"
                  >
                    <span>Proceder al Pago</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest py-2 flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Vaciar mi carrito
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
                    <p className="text-[10px] text-orange-700 leading-tight italic">
                      * Para las inscripciones realizadas después del 10 de abril de 2026 no se garantiza disponibilidad de talla. Recibirá el kit con las tallas disponibles en inventario.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-4 py-2 text-center">
                    <p className="text-[10px] text-gray-400 font-medium">Pago Seguro SSL</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutPage
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </>
  )
}

export default CartDrawer