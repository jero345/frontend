import React, { createContext, useContext, useState, useEffect } from 'react'
import { deleteOrder, getOrderById } from '../api/orderService'
import Swal from 'sweetalert2';

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  // Inicializar estado desde localStorage directamente para evitar condiciones de carrera
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))

    // También guardar específicamente el orderId si existe para recuperación
    const orderId = cartItems.find(item => item.backendOrderId)?.backendOrderId
    if (orderId) {
      localStorage.setItem('activeOrderId', orderId)
    } else if (cartItems.length === 0) {
      // No limpiar activeOrderId inmediatamente para permitir recuperación si el carrito se vació por error
    }
  }, [cartItems])

  // Sincronizar con el backend al iniciar si hay un orderId
  useEffect(() => {
    const syncCartWithBackend = async () => {
      // 1. Buscar en los items actuales
      let orderId = cartItems.find(item => item.backendOrderId)?.backendOrderId

      // 2. Si no hay en items pero hay en localStorage, intentar recuperar
      if (!orderId) {
        orderId = localStorage.getItem('activeOrderId')
      }

      if (orderId) {
        try {
          const orderDetails = await getOrderById(orderId)

          if (orderDetails && orderDetails.order_id) {
            // IMPORTANTE: Verificar el status de la orden
            // Si NO es PENDING, significa que ya fue pagada - limpiar el carrito
            if (orderDetails.status && orderDetails.status !== 'PENDING') {
              setCartItems([])
              localStorage.removeItem('cart')
              localStorage.removeItem('activeOrderId')
              return
            }

            // Si es PENDING, sincronizar normalmente
            // Re-mapear los datos del backend al formato del carrito
            // Buscamos si ya existe el item para no duplicar si ya estaba en localStorage
            setCartItems(prevItems => {
              const existingTicketIndex = prevItems.findIndex(item => item.type === 'ticket')

              const newTicketItem = {
                id: prevItems[existingTicketIndex]?.id || `event-sync-${Date.now()}`,
                type: 'ticket',
                name: `TCS RUN Rock & Roll - ${orderDetails.attendees?.[0]?.is_adult ? '6K' : '3K'}`, // Fallback
                eventId: 1, // Por ahora fijo ya que es el único evento
                eventName: "TCS RUN Rock & Roll",
                distance: orderDetails.attendees?.[0]?.is_adult ? '6K' : '3K',
                date: "24 de mayo, 2026",
                location: "Campus The Columbus School",
                price: 90000,
                quantity: orderDetails.attendees?.length || 1,
                buyer: orderDetails.buyer,
                attendees: orderDetails.attendees,
                imageUrl: prevItems[existingTicketIndex]?.imageUrl || '',
                backendOrderId: orderDetails.order_id,
                total: orderDetails.total
              }

              if (existingTicketIndex > -1) {
                const updatedItems = [...prevItems]
                updatedItems[existingTicketIndex] = newTicketItem
                return updatedItems
              } else {
                return [...prevItems, newTicketItem]
              }
            })
          }
        } catch (error) {
          // Si el error es 404, el orderId ya no es válido
          if (error.response?.status === 404) {
            localStorage.removeItem('activeOrderId')
          }
        }
      }
    }

    syncCartWithBackend()
  }, []) // Solo al montar

  // Detectar retorno de pasarela de pago (Wompi) para limpiar el carrito
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get('id');

    // Si hay un ID en la URL, significa que venimos de Wompi (proceso terminado)
    if (transactionId) {

      // Limpiar el carrito localmente
      setCartItems([]);
      localStorage.removeItem('cart');
      localStorage.removeItem('activeOrderId');

      // Limpiar los parámetros de la URL para que no se limpie el carrito en cada recarga manual
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  // Agregar producto al carrito
  const addToCart = (product) => {
    // Calcular cantidad actual de corredores/items en el carrito
    const currentCount = cartItems.reduce((total, item) => {
      if (item.type === 'ticket' && item.attendees) {
        return total + item.attendees.length
      }
      return total + (item.quantity || 1)
    }, 0)

    // Calcular cantidad nueva a agregar
    let newQuantityToAdd = 1;
    if (product.type === 'ticket' && product.attendees) {
      newQuantityToAdd = product.attendees.length;
    }

    if (currentCount + newQuantityToAdd > 10) {
      Swal.fire('Aviso', 'El máximo de asistentes por compra son 10.', 'warning');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  // Remover producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Incrementar cantidad
  const incrementQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  // Decrementar cantidad
  const decrementQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  // Limpiar carrito
  const clearCart = async () => {
    // Buscar si hay órdenes pendientes en los items
    const orderIds = [...new Set(cartItems.map(item => item.backendOrderId).filter(id => id))];

    // También buscar en localStorage por si acaso
    const activeOrderId = localStorage.getItem('activeOrderId');
    if (activeOrderId && !orderIds.includes(activeOrderId)) {
      orderIds.push(activeOrderId);
    }

    if (orderIds.length > 0) {
      try {
        await Promise.all(orderIds.map(id => deleteOrder(id)));
      } catch (error) {
      }
    }

    localStorage.removeItem('activeOrderId');
    setCartItems([])
  }

  // Calcular total de items
  const cartCount = cartItems.reduce((total, item) => {
    if (item.type === 'ticket' && item.attendees) {
      return total + item.attendees.length
    }
    return total + (item.quantity || 1)
  }, 0)

  // Calcular subtotal
  const subtotal = cartItems.reduce((total, item) => {
    if (item.type === 'ticket' && item.attendees) {
      return total + (item.price * item.attendees.length)
    }
    return total + (item.price * (item.quantity || 1))
  }, 0)

  // Abrir/cerrar carrito
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen(prev => !prev)

  const value = {
    cartItems,
    cartCount,
    subtotal,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext