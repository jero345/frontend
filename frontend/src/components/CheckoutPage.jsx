import React, { useState, useEffect } from 'react'
import { useCart } from '../context/Cartcontext'
import { initPayment } from '../api/orderService'
import WompiPaymentButton from './WompiPaymentButton'
import Swal from 'sweetalert2';

const CheckoutPage = ({ isOpen, onClose }) => {
  const { cartItems, subtotal, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Resumen, 2: Pago
  const [paymentData, setPaymentData] = useState(null)

  // Reset step cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setPaymentData(null)
    }
  }, [isOpen])

  const formatPrice = (price) => `$${price?.toLocaleString('es-CO') || 0}`

  // Calcular totales
  const ticketItems = cartItems.filter(item => item.type === 'ticket')
  const productItems = cartItems.filter(item => item.type !== 'ticket')

  // Si los tickets tienen total del backend, usarlo; si no, calcular localmente
  const ticketsTotal = ticketItems.reduce((acc, item) => {
    if (item.total !== undefined) {
      return acc + item.total
    }
    const qty = item.attendees?.length || item.quantity || 1
    return acc + (item.price * qty)
  }, 0)

  const productsTotal = productItems.reduce((acc, item) => {
    return acc + (item.price * (item.quantity || 1))
  }, 0)

  const serviceFee = Math.round(productsTotal * 0.05)
  const total = ticketsTotal + productsTotal + serviceFee

  // Obtener datos del buyer del primer ticket en el carrito
  const getBuyerFromCart = () => {
    const firstTicket = ticketItems[0]
    if (firstTicket?.buyer) {
      return firstTicket.buyer
    }
    return null
  }

  // Función para procesar el pago
  const handleConfirmPayment = async () => {
    setIsLoading(true)

    try {
      // Obtener el order_id del primer ticket
      const firstTicket = ticketItems[0]
      const orderId = firstTicket?.backendOrderId

      if (!orderId) {
        Swal.fire('Error', 'No se encontró la orden. Por favor, vuelve a registrar.', 'error');
        return
      }


      // Inicializar pago con Wompi
      const paymentResponse = await initPayment(orderId)

      // Guardar datos del pago y pasar al paso 2
      setPaymentData(paymentResponse)
      setStep(2)

    } catch (error) {
      Swal.fire('Error', 'No se pudo procesar tu pago. Intenta nuevamente.', 'error');
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const buyerData = getBuyerFromCart()

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110] flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="bg-white sm:rounded-3xl shadow-2xl w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500">

        {/* Header */}
        <div className="bg-gray-900 px-6 py-8 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

          <div className="relative flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Finalizar Compra</h2>
              <p className="text-gray-400 text-sm font-medium mt-1">Revisa tu pedido antes de proceder al pago</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 shadow-lg ${step >= 1 ? 'bg-orange-500 text-white ring-4 ring-orange-500/20' : 'bg-gray-800 text-gray-500'}`}>
                  {step > 1 ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  ) : '01'}
                </div>
                <span className={`text-[10px] font-bold uppercase mt-2 tracking-widest ${step >= 1 ? 'text-orange-500' : 'text-gray-600'}`}>Resumen</span>
              </div>

              <div className={`w-16 h-[2px] mb-6 transition-colors duration-500 ${step > 1 ? 'bg-orange-500' : 'bg-gray-800'}`}></div>

              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 shadow-lg ${step >= 2 ? 'bg-orange-500 text-white ring-4 ring-orange-500/20' : 'bg-gray-800 text-gray-500'}`}>
                  02
                </div>
                <span className={`text-[10px] font-bold uppercase mt-2 tracking-widest ${step >= 2 ? 'text-orange-500' : 'text-gray-600'}`}>Pago Seguro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="flex flex-col lg:flex-row">

            {/* Main Content Area */}
            <div className="flex-1 p-6 lg:p-10">

              {/* Step 1: Resumen */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                  {/* Tickets Section */}
                  {ticketItems.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <span className="text-lg">🎟️</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Mis Entradas</h3>
                      </div>

                      {ticketItems.map(item => (
                        <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 group">
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                              <img
                                src={item.imageUrl}
                                alt={item.eventName}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col h-full justify-between">
                                <div>
                                  <h4 className="text-xl font-black text-gray-900 leading-tight">{item.eventName}</h4>
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                                    <p className="text-sm font-bold text-blue-600 flex items-center gap-1.5">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                      {item.distance}
                                    </p>
                                    <p className="text-sm font-medium text-gray-400 flex items-center gap-1.5">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
                                      {item.date}
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Total Tickets</span>
                                  <span className="text-xl font-black text-gray-900">{formatPrice(item.total || (item.price * (item.attendees?.length || 1)))}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Attendees Peek */}
                          {item.attendees && (
                            <div className="mt-6 space-y-2">
                              {item.attendees.map((att, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-50/50 px-4 py-3 rounded-xl border border-gray-100 flex-wrap gap-2">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-black text-gray-400 shadow-sm">
                                      {idx + 1}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{att.first_name} {att.last_name_1}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {att.shirt_size && (
                                      <span className="text-[10px] font-black uppercase text-gray-400 px-2 py-1 bg-white border border-gray-100 rounded-md">Talla: {att.shirt_size}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Products Section */}
                  {productItems.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                          <span className="text-lg">🛍️</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Productos Extra</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {productItems.map(item => (
                          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center group">
                            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 truncate leading-tight">{item.name}</h4>
                              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Cantidad: {item.quantity}</p>
                              <p className="text-sm font-black text-[#f5522a] mt-2">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Buyer Data Section */}
                  {buyerData && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white text-xl shadow-lg">
                          {buyerData.first_name[0]}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Información de Facturación</p>
                          <h4 className="text-base font-bold text-gray-900 leading-tight">{buyerData.first_name} {buyerData.last_name_1}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{buyerData.email} • {buyerData.cell_phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Payment Section */}
              {step === 2 && paymentData && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="bg-white rounded-3xl p-10 shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">¡Orden Generada!</h3>
                    <p className="text-gray-500 mt-2 font-medium">Estás a un paso de completar tu inscripción.</p>

                    <div className="my-8 py-6 border-y border-gray-50 flex flex-col items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total a Pagar</span>
                      <span className="text-5xl font-black text-gray-900 tracking-tighter">{formatPrice(total)}</span>
                      <span className="text-xs font-bold text-gray-400 mt-4 px-3 py-1 bg-gray-100 rounded-full">REF: {paymentData.reference}</span>
                    </div>

                    <div className="max-w-xs mx-auto">
                      <WompiPaymentButton payment={paymentData} buyer={buyerData} />
                    </div>

                    <p className="text-xs text-gray-400 mt-8 leading-relaxed max-w-sm mx-auto">
                      Operación procesada de forma segura por <strong>Wompi</strong>. Completa tu pago en la ventana que se abrirá a continuación.
                    </p>
                  </div>

                  {/* Payment Methods Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 grayscale opacity-60">
                    {['Cards', 'PSE', 'Nequi', 'Efecty'].map(method => (
                      <div key={method} className="bg-white px-4 py-3 rounded-xl border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar Summary */}
            <div className="w-full lg:w-[360px] bg-white lg:bg-gray-50/50 p-6 lg:p-10 border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="sticky top-10">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Resumen de Pago</h4>

                <div className="space-y-6">
                  {ticketsTotal > 0 && (
                    <div className="flex justify-between items-center group">
                      <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        Entradas ({ticketItems.length})
                      </span>
                      <span className="text-sm font-black text-gray-900">{formatPrice(ticketsTotal)}</span>
                    </div>
                  )}
                  {productsTotal > 0 && (
                    <div className="flex justify-between items-center group">
                      <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f5522a]"></span>
                        Productos ({productItems.length})
                      </span>
                      <span className="text-sm font-black text-gray-900">{formatPrice(productsTotal)}</span>
                    </div>
                  )}

                  {productsTotal > 0 && (
                    <div className="pt-6 border-t border-gray-200 space-y-4">
                      <div className="flex justify-between items-center group">
                        <span className="text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors">Cargo por servicio (5%)</span>
                        <span className="text-sm font-black text-gray-900">{formatPrice(serviceFee)}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-8 border-t-[3px] border-gray-900 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Final</span>
                      <span className="text-sm font-bold text-[#f5522a]">IVA incluido</span>
                    </div>
                    <span className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Pago 100% Seguro</h5>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">Cifrado de grado bancario SSL de 256 bits.</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 py-4">
                    {/* Wompi logos removed per user request */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="border-t border-gray-100 bg-white px-6 py-6 lg:px-10">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl ml-0">
            {step === 2 ? (
              <button
                onClick={onClose}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-xs hover:bg-[#f5522a] transition-all active:scale-95 shadow-xl shadow-gray-200"
              >
                Cerrar Checkout
              </button>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-[0.15em] text-xs hover:border-gray-900 hover:text-gray-900 transition-all active:scale-95"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleConfirmPayment}
                  disabled={isLoading}
                  className="flex-2 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-xs hover:bg-[#f5522a] transition-all active:scale-95 disabled:opacity-50 disabled:hover:bg-gray-900 flex items-center justify-center gap-3 shadow-xl shadow-gray-200 min-w-[240px]"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Procesando solicitud...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceder al pago seguro</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
