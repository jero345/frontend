// src/components/MyOrdersModal.jsx

import React, { useState, useEffect } from 'react';
import { getOrdersByDocument } from '../api/orderService';
import authService from '../api/authService';

const MyOrdersModal = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = authService.getCurrentUser();

      if (!user || !user.nit_type || !user.nit) {
        setError('No se encontró información del usuario');
        setLoading(false);
        return;
      }

      const data = await getOrdersByDocument(user.nit_type, user.nit);
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (err) {
      setError('Error al cargar tus pedidos');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' },
      paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Pagado' },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Confirmado' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelado' },
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-700', label: 'Aprobado' },
      DECLINED: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rechazado' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getFilteredOrders = () => {
    if (activeTab === 'all') return orders;
    return orders.filter(order => {
      const items = order.items || order.Items || [];
      const hasTickets = items.some(item => item.type === 'ticket');
      const hasProducts = items.some(item => item.type === 'product');
      if (activeTab === 'tickets') return hasTickets;
      if (activeTab === 'products') return hasProducts;
      return true;
    });
  };

  const getTabCounts = () => {
    let tickets = 0, products = 0;
    orders.forEach(order => {
      const items = order.items || order.Items || [];
      items.forEach(item => {
        if (item.type === 'ticket') tickets++;
        else if (item.type === 'product') products++;
      });
    });
    return { tickets, products, all: orders.length };
  };

  const getOrderItems = (order) => {
    return order.items || order.Items || [];
  };

  const getOrderAttendees = (order) => {
    return order.attendees || order.Attendees || [];
  };

  // Obtener el subtotal del item (usa subtotal si existe)
  const getItemSubtotal = (item) => {
    if (item.subtotal !== undefined && item.subtotal !== null) {
      return item.subtotal;
    }
    const price = item.price || item.unit_price || 0;
    const quantity = item.quantity || 1;
    return price * quantity;
  };

  // Obtener precio unitario
  const getItemUnitPrice = (item) => {
    return item.price || item.unit_price || 0;
  };

  if (!isOpen) return null;

  const tabCounts = getTabCounts();
  const filteredOrders = getFilteredOrders();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
          style={{ animation: 'modalIn 0.2s ease-out' }}
        >

          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Mis Pedidos</h2>
              <p className="text-sm text-gray-500">Inscripciones, tickets y compras</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="px-6 py-3 bg-gray-50 border-b flex gap-2 overflow-x-auto">
            {[
              { key: 'all', label: 'Todos', icon: null },
              { key: 'tickets', label: 'Inscripciones', icon: '🎫' },
              { key: 'products', label: 'Artículos', icon: '📦' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${activeTab === tab.key
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                  }`}
              >
                {tab.icon && <span className="mr-1">{tab.icon}</span>}
                {tab.label}
                <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                  {tabCounts[tab.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(85vh - 140px)' }}>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-sm">Cargando pedidos...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-3">{error}</p>
                <button onClick={fetchOrders} className="text-orange-500 hover:text-orange-600 font-medium">
                  Reintentar
                </button>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">No tienes pedidos aún</h3>
                <p className="text-gray-500 text-sm mb-4">Cuando realices una compra o inscripción, aparecerá aquí</p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition"
                >
                  Explorar Eventos
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => {
                  const items = getOrderItems(order);
                  const attendees = getOrderAttendees(order);

                  return (
                    <div
                      key={order.id}
                      className="bg-gray-50 rounded-xl overflow-hidden border hover:border-orange-200 transition"
                    >
                      {/* Order header */}
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow">
                              #{order.id?.toString().slice(-3) || '000'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">
                                Pedido #{order.reference || order.id}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(order.created_at || order.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(order.status)}
                            <span className="font-bold text-gray-800">{formatPrice(order.total)}</span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {/* Items preview */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {items.slice(0, 3).map((item, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded-full text-xs ${item.type === 'ticket' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                }`}
                            >
                              {item.type === 'ticket' ? '🎫' : '📦'} {item.name?.substring(0, 25)}{item.name?.length > 25 ? '...' : ''}
                            </span>
                          ))}
                          {items.length > 3 && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-600">
                              +{items.length - 3} más
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expanded details */}
                      {expandedOrder === order.id && (
                        <div className="border-t bg-white p-4 space-y-4" style={{ animation: 'fadeIn 0.2s ease-out' }}>
                          {/* Tickets */}
                          {items.filter(i => i.type === 'ticket').length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                                <span>🎫</span> INSCRIPCIONES / TICKETS
                              </p>
                              <div className="bg-purple-50 rounded-lg p-3 space-y-3">
                                {items.filter(i => i.type === 'ticket').map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <p className="text-gray-800 font-medium text-sm">{item.name}</p>
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        {formatPrice(getItemUnitPrice(item))} × {item.quantity || 1} unidad(es)
                                      </p>
                                    </div>
                                    <span className="font-bold text-purple-700">
                                      {formatPrice(getItemSubtotal(item))}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Products */}
                          {items.filter(i => i.type === 'product').length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                                <span>📦</span> ARTÍCULOS
                              </p>
                              <div className="bg-blue-50 rounded-lg p-3 space-y-3">
                                {items.filter(i => i.type === 'product').map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <p className="text-gray-800 font-medium text-sm">{item.name}</p>
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        {formatPrice(getItemUnitPrice(item))} × {item.quantity || 1} unidad(es)
                                      </p>
                                    </div>
                                    <span className="font-bold text-blue-700">
                                      {formatPrice(getItemSubtotal(item))}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Attendees */}
                          {attendees.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-2">👥 ASISTENTES REGISTRADOS</p>
                              <div className="flex flex-wrap gap-2">
                                {attendees.map((att, idx) => (
                                  <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                                    <span className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                      {att.first_name?.charAt(0)}{att.last_name_1?.charAt(0)}
                                    </span>
                                    <div className="text-xs">
                                      <p className="font-medium text-gray-800">{att.first_name} {att.last_name_1}</p>
                                      <p className="text-gray-500">{att.nit_type} {att.nit}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Total */}
                          <div className="pt-3 border-t">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-700">Total pagado</span>
                              <span className="text-xl font-bold text-orange-600">{formatPrice(order.total)}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {(order.status === 'paid' || order.status === 'APPROVED') && items.some(i => i.type === 'ticket') && (
                              <button className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Descargar Tickets
                              </button>
                            )}
                            <button className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Ayuda
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MyOrdersModal;