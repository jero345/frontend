import React, { useState, useCallback } from 'react';
import { Eye, X, LogOut } from 'lucide-react';
import * as orderService from '../api/orderService';
import Swal from 'sweetalert2';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Estados para estadísticas
  const [totalVentas, setTotalVentas] = useState(0);
  const [ordenesHoy, setOrdenesHoy] = useState(0);
  const [totalParticipantes, setTotalParticipantes] = useState(0);
  const [ingresosMes, setIngresosMes] = useState(0);

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ncY^0Z05OB&e') {
      setIsAuthenticated(true);
      setAdminToken('admin-token');
      setPassword('');
      fetchOrders();
    } else {
      Swal.fire('Error', 'Contraseña incorrecta.', 'error');
    }
  };

  // Fetch orders pagadas
  const fetchOrders = async () => {
    try {
      const allOrders = await orderService.getAllOrders(import.meta.env.VITE_SUPPORT_KEY);
      setOrders(allOrders || []);
      calculateStats(allOrders || []);
    } catch (error) {
    }
  };

  // Calculate statistics
  const calculateStats = (allOrders) => {
    if (!allOrders || allOrders.length === 0) return;

    // Filtrar solo órdenes pagadas para la mayoría de estadísticas
    const paidOrders = allOrders.filter((o) => o.status === 'PAID');

    const total = paidOrders.length;
    const today = new Date().toDateString();

    // Órdenes de hoy: TODAS las órdenes sin filtrar por estado
    const todayOrders = allOrders.filter(
      (o) => new Date(o.created_at).toDateString() === today
    ).length;

    const totalAttendees = paidOrders.reduce((sum, o) => {
      return sum + (o.attendees?.length || 0);
    }, 0);

    const monthStart = new Date();
    monthStart.setDate(1);

    const monthOrders = paidOrders.filter(
      (o) => new Date(o.created_at) >= monthStart
    );

    const monthIncome = monthOrders.reduce((sum, o) => {
      return sum + (o.total || 0);
    }, 0);

    setTotalVentas(total);
    setOrdenesHoy(todayOrders);
    setTotalParticipantes(totalAttendees);
    setIngresosMes(monthIncome);
  };

  // Apply filters
  const applyFilters = useCallback(() => {
    let filtered = orders;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.order_id?.toLowerCase().includes(term) ||
          o.buyer?.first_name?.toLowerCase().includes(term) ||
          o.buyer?.last_name_1?.toLowerCase().includes(term) ||
          o.buyer?.email?.toLowerCase().includes(term) ||
          o.buyer?.nit?.includes(term)
      );
    }

    if (filterDate) {
      const selectedDate = new Date(filterDate + 'T00:00:00').toDateString();
      filtered = filtered.filter(
        (o) => new Date(o.created_at).toDateString() === selectedDate
      );
    }

    if (filterStatus) {
      filtered = filtered.filter((o) => o.status === filterStatus);
    }

    return filtered;
  }, [orders, searchTerm, filterDate, filterStatus]);

  const filteredOrders = applyFilters();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminToken('');
    setOrders([]);
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-CO');
  };

  const exportToExcel = () => {
    const headers = [
      'Orden ID', 'Fecha', 'Estado', 'Total',
      'Comprador Nombre', 'Comprador Email', 'Comprador Teléfono', 'Comprador Documento',
      'Participante #', 'Participante Nombre', 'Participante Documento',
      'Participante Talla', 'Participante Celular', 'Participante Edad'
    ];

    const rows = [headers];

    filteredOrders.forEach((order) => {
      const statusLabel = order.status === 'PAID' ? 'Pagado'
        : order.status === 'PENDING' ? 'Pendiente'
        : order.status === 'FAILED' ? 'Fallido'
        : order.status || '';

      const baseRow = [
        order.order_id || '',
        formatDate(order.created_at),
        statusLabel,
        order.total || 0,
        order.buyer ? `${order.buyer.first_name || ''} ${order.buyer.last_name_1 || ''}`.trim() : '',
        order.buyer?.email || '',
        order.buyer?.cell_phone || '',
        `${order.buyer?.nit_type || ''} ${order.buyer?.nit || ''}`.trim(),
      ];

      if (order.attendees && order.attendees.length > 0) {
        order.attendees.forEach((att, idx) => {
          rows.push([
            ...baseRow,
            idx + 1,
            `${att.first_name || ''} ${att.last_name_1 || ''}`.trim(),
            `${att.nit_type || ''} ${att.nit || ''}`.trim(),
            att.shirt_size || '',
            att.cell_phone || '',
            att.age_range || '',
          ]);
        });
      } else {
        rows.push([...baseRow, '', '', '', '', '', '']);
      }
    });

    const csvContent = rows
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ordenes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Panel Admin</h1>
          <p className="text-gray-600 text-center mb-8">Sistema de Gestión de Órdenes</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ingrese la contraseña"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition-shadow"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Panel de <span className="hidden md:inline">Administración</span>
              <span className="md:hidden">Admin</span>
            </h1>
            <p className="text-purple-100 text-sm md:text-base">Gestión de Órdenes</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Salir
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Ventas</p>
              <p className="text-2xl font-bold text-blue-600">{totalVentas}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Órdenes Hoy</p>
              <p className="text-2xl font-bold text-green-600">{ordenesHoy}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Participantes</p>
              <p className="text-2xl font-bold text-purple-600">{totalParticipantes}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Ingresos Mes</p>
              <p className="text-2xl font-bold text-orange-600">
                ${ingresosMes.toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              🔍 Búsqueda y Filtros
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Búsqueda */}
            <input
              type="text"
              placeholder="Orden, cliente o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />

            {/* Filtros de fecha y estado en grid responsivo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Filtro de fecha */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Filtrar por día:</span>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    min="2026-02-06"
                    max={new Date().toISOString().split('T')[0]}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {filterDate && (
                    <button
                      onClick={() => setFilterDate('')}
                      className="text-xs text-purple-600 hover:text-purple-800 font-bold whitespace-nowrap"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {/* Filtro de estado */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Estado:</span>
                <div className="flex items-center gap-2 flex-1">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Todos</option>
                    <option value="PAID">Pagado</option>
                    <option value="PENDING">Pendiente</option>
                    <option value="FAILED">Fallido</option>
                  </select>
                  {filterStatus && (
                    <button
                      onClick={() => setFilterStatus('')}
                      className="text-xs text-purple-600 hover:text-purple-800 font-bold whitespace-nowrap"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Órdenes */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Órdenes ({filteredOrders.length})
            </h2>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-white text-purple-700 font-bold px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm shadow"
            >
              📥 Exportar a Excel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Orden ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium font-mono" title={order.order_id}>
                        #{order.order_id?.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {order.buyer ? `${order.buyer.first_name} ${order.buyer.last_name_1 || ''}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {order.buyer?.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {order.status === 'PAID'
                            ? 'Pagado'
                            : order.status === 'PENDING'
                              ? 'Pendiente'
                              : order.status === 'FAILED'
                                ? 'Fallido'
                                : order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-bold text-purple-600">
                        ${order.total?.toLocaleString('es-CO') || '0'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => openOrderModal(order)}
                          className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors"
                          title="Ver detalles"
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No hay órdenes disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
                <div className="flex justify-between items-center text-white">
                  <h3 className="text-xl font-bold">Detalles de la Orden</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Orden ID Completo</p>
                    <p className="font-semibold font-mono text-xs break-all">
                      {selectedOrder.order_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha</p>
                    <p className="font-semibold break-words">
                      {formatDate(selectedOrder.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <p className="font-semibold break-words">{selectedOrder.status}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-semibold text-lg text-purple-600">
                      ${selectedOrder.total?.toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Información del Comprador</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Nombre</p>
                      <p className="break-words">{selectedOrder.buyer?.first_name} {selectedOrder.buyer?.last_name_1}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="break-all text-sm">{selectedOrder.buyer?.email || 'N/A'}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Teléfono</p>
                      <p className="break-words">{selectedOrder.buyer?.cell_phone || 'N/A'}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-600">Documento</p>
                      <p className="break-words">{selectedOrder.buyer?.nit_type} {selectedOrder.buyer?.nit}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Participantes ({selectedOrder.attendees?.length || 0})</h4>
                  <div className="space-y-3">
                    {selectedOrder.attendees?.map((att, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm border border-gray-100">
                        <p className="font-semibold break-words">{att.first_name} {att.last_name_1}</p>
                        <div className="grid grid-cols-2 gap-2 mt-1 text-gray-600 text-xs">
                          <p className="break-words">Doc: {att.nit_type || ''} {att.nit || 'N/A'}</p>
                          <p className="break-words">Talla: {att.shirt_size || 'N/A'}</p>
                          <p className="break-words">Cel: {att.cell_phone || 'N/A'}</p>
                          <p className="break-words">Edad: {att.age_range || 'N/A'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;