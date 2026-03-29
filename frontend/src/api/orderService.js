// src/api/orderService.js

import axios from './axios';

// ============ ORDERS ============

// Crear una nueva orden - POST /api/orders/new
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post('/api/orders/new', orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Editar una orden existente - PUT /api/orders/edit/{order_id}
export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`/api/orders/edit/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener orden por ID - GET /api/orders/{order_id}
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Buscar orden por documento - GET /api/orders/by-person?nit_type=XX&nit=XXX
export const getOrderByPerson = async (nit_type, nit) => {
  try {
    const response = await axios.get(`/api/orders/by-person?nit_type=${nit_type}&nit=${nit}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null; // No se encontró orden
    }
    throw error;
  }
};

// Eliminar orden - DELETE /api/orders/del/{order_id}
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`/api/orders/del/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener órdenes
export const getAllOrders = async (supportKey) => {
  try {
    const response = await axios.get('/api/orders', {
      headers: {
        'X-SUPPORT-KEY': supportKey
      },
      params: {
        event_id: 1
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============ PAYMENTS ============

// Inicializar pago con Wompi - POST /api/payments/init/{order_id}
export const initPayment = async (orderId) => {
  try {
    const response = await axios.post(`/api/payments/init/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener pagos aprobados - GET /api/payments/approved
export const getApprovedPayments = async () => {
  try {
    const response = await axios.get('/api/payments/approved');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============ PERSONS ============

// Buscar persona por documento - GET /api/persons/by-document?nit=XXX
export const getPersonByDocument = async (nit) => {
  try {
    const response = await axios.get(`/api/persons/by-document?nit=${nit}`);
    return response.data;
  } catch (error) {
    return { found: false, person: null };
  }
};

// ============ EVENTS ============

// Obtener todos los eventos - GET /api/events
export const getEvents = async () => {
  try {
    const response = await axios.get('/api/events');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener evento por ID - GET /api/events/{event_id}
export const getEventById = async (eventId) => {
  try {
    const response = await axios.get(`/api/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear nuevo evento - POST /api/events/new
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post('/api/events/new', eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Exportar una función adicional que se usa en MyOrdersModal (que parece estar faltando o es un alias)
export const getOrdersByDocument = getOrderByPerson;
