import React, { useState, useCallback, useRef } from 'react';
import { useCart } from '../context/Cartcontext';
import logoCarrera from '../assets/images/carrera.png'
import { createOrder, updateOrder, getPersonByDocument, getOrderById, getOrderByPerson } from '../api/orderService';
import Swal from 'sweetalert2';

// PDFs de términos y autorizaciones
import pdfAutorizacionDatos from '../assets/pdfs/AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES, DATOS SENSIBLES Y USO DE IMAGEN TCS RUN.pdf';
import pdfTerminosCondiciones from '../assets/pdfs/Política términos y condiciones TCS Run.pdf';

// Imágenes de guía de tallas
import tallasAdultos from '../assets/images/shirt_sizes/TALLAS ADULTOS.png';
import tallasNinos from '../assets/images/shirt_sizes/TALLAS NIÑOS.png';

// Componente de Modal de Éxito
const SuccessModal = ({ isOpen, onClose, eventName, attendeesCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[95vh] overflow-y-auto animate-bounce-in">
        {/* Fondo con gradiente y partículas decorativas */}
        <div className="relative bg-gradient-to-br from-[#02afd7] via-[#0295b9] to-[#017b9a] px-8 py-12 text-center overflow-hidden">
          {/* Círculos decorativos */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full"></div>

          {/* Icono de éxito animado */}
          <div className="relative z-10 mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg animate-success-check">
            <svg className="w-14 h-14 text-[#02afd7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="relative z-10 text-3xl font-black text-white mb-2 uppercase leading-tight">¡Falta un último paso,<br />corre a hacer tu PAGO!</h2>
        </div>

        {/* Contenido */}
        <div className="px-8 py-6">
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-700 leading-relaxed text-center font-medium">
              Recuerda que para confirmar tu registro a TCS Run debes ir al carrito de compras a hacer check-out y realizar el proceso de pago. De esta forma tu inscripción quedará confirmada. 🏃‍➡️
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-amber-800 font-medium">
                Tu inscripción NO está confirmada hasta completar el pago.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-black text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Ya mismo voy a pagar
          </button>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes success-check {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-success-check {
          animation: success-check 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
        }
      `}</style>
    </div>
  );
};

// Nuevo Componente de Modal de Notificación/Información
const NotificationModal = ({ isOpen, onClose, title, message, type = 'info' }) => {
  if (!isOpen) return null;

  const bgGradient = type === 'warning'
    ? 'from-amber-400 to-orange-500'
    : type === 'soldout'
      ? 'from-gray-700 to-gray-900'
      : 'from-blue-500 to-indigo-600';

  const icon = type === 'warning' ? (
    <svg className="w-14 h-14 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ) : type === 'soldout' ? (
    <svg className="w-14 h-14 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg className="w-14 h-14 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto animate-bounce-in">
        <div className={`relative bg-gradient-to-br ${bgGradient} px-8 py-10 text-center overflow-hidden`}>
          <div className="absolute top-0 right-0 text-white/10 text-8xl transform translate-x-4 -translate-y-4">⚡</div>
          <div className="relative z-10 mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl">
            {icon}
          </div>
          <h2 className="relative z-10 text-2xl font-black text-white px-4 leading-tight">
            {title}
          </h2>
        </div>
        <div className="px-8 py-8">
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-center font-medium whitespace-pre-line">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-black text-lg transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95"
          >
            ¡ENTENDIDO!
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Modal para Guía de Tallas
const SizeGuideModal = ({ isOpen, onClose, initialType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[80] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto animate-bounce-in relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-blue-100">
              Información de Kit
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-2">
              Guía de Tallas 👕
            </h3>
            <p className="text-gray-600 font-medium text-lg">
              Consulta las medidas para elegir tu talla ideal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`text-center p-6 rounded-3xl border-2 transition-all ${initialType === 'adulto' ? 'border-[#f5522a] bg-orange-50/50 shadow-inner' : 'border-gray-100 bg-gray-50/30'}`}>
              <h4 className="text-2xl font-black mb-6 flex items-center justify-center gap-2" style={{ color: '#f5522a' }}>
                <span className="text-3xl">👨‍🎤</span> Tallas Adultos
              </h4>
              <img src={tallasAdultos} alt="Guía de tallas adultos" className="w-full rounded-2xl shadow-xl border border-gray-200" />
            </div>
            <div className={`text-center p-6 rounded-3xl border-2 transition-all ${initialType === 'nino' ? 'border-[#02afd7] bg-blue-50/50 shadow-inner' : 'border-gray-100 bg-gray-50/30'}`}>
              <h4 className="text-2xl font-black mb-6 flex items-center justify-center gap-2" style={{ color: '#02afd7' }}>
                <span className="text-3xl">🎸</span> Tallas Niños
              </h4>
              <img src={tallasNinos} alt="Guía de tallas niños" className="w-full rounded-2xl shadow-xl border border-gray-200" />
            </div>
          </div>

          <div className="mt-10 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-bold text-lg mb-1">Nota importante sobre el kit:</p>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Las medidas son aproximadas. Para las inscripciones realizadas después del <span className="text-[#f5522a] font-bold">10 de abril de 2026</span> no se garantiza disponibilidad de talla. Recibirás el kit con las tallas disponibles que tengamos en el inventario.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-10 py-5 bg-gray-900 hover:bg-black text-white rounded-2xl font-black text-xl transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-[0.98] uppercase tracking-widest"
          >
            Cerrar Guía
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Error Inline mejorado
const FieldError = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-red-500 animate-shake">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <span className="text-xs font-medium">{error}</span>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

// Función helper para clases de input con error
const getInputClasses = (hasError, baseClasses = '') => {
  const base = `w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${baseClasses}`;
  if (hasError) {
    return `${base} border-red-400 bg-red-50 focus:ring-red-500`;
  }
  return `${base} border-gray-300 hover:border-gray-400`;
};

const EventRegistrationModal = ({ isOpen, onClose, event }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState({ eventName: '', attendeesCount: 0 });

  const [notification, setNotification] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showNotification = (title, message, type = 'info') => {
    setNotification({ isOpen: true, title, message, type });
  };

  const emptyPerson = {
    nit_type: 'CC',
    nit: '',
    first_name: '',
    middle_name: '',
    last_name_1: '',
    last_name_2: '',
    birth_date: '',
    email: '',
    cell_phone: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_eps: '',
    medical_info: '',
    participant_type: 'adulto',
    shirt_size: '',
    age_range: '',
    person_source: '', // Se llena con lo que devuelve el backend
    siesa_id: '' // Se llena con lo que devuelve el backend
  };

  const ageRanges = [
    '3-10 años',
    '11-17 años',
    '18-25 años',
    '26-35 años',
    '36-45 años',
    '46-55 años',
    '56-65 años',
    '65+ años'
  ];

  const adultSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const kidSizes = ['6', '8', '10', '12', '14', '16'];

  // Estado separado para buyer y attendees
  const [buyer, setBuyer] = useState({ ...emptyPerson });
  const [attendees, setAttendees] = useState([]);
  const [buyerErrors, setBuyerErrors] = useState({});
  const [attendeeErrors, setAttendeeErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchingBuyerDoc, setSearchingBuyerDoc] = useState(false);
  const [searchingAttendeeDoc, setSearchingAttendeeDoc] = useState({});
  const [useBuyerAsFirstAttendee, setUseBuyerAsFirstAttendee] = useState(false);
  const [acceptDataTreatment, setAcceptDataTreatment] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptImageUse, setAcceptImageUse] = useState(false);
  const [useSameEmergencyForAll, setUseSameEmergencyForAll] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeGuideType, setSizeGuideType] = useState('adulto');

  // Refs para debouncing y evitar duplicados
  const buyerSearchTimeout = useRef(null);
  const attendeeSearchTimeouts = useRef({});
  const lastSearchedBuyerNit = useRef('');
  const lastSearchedAttendeeNits = useRef({});

  // Cargar datos del comprador y asistentes si ya existen en el carrito
  React.useEffect(() => {
    if (isOpen && cartItems.length > 0) {
      const existingTicket = cartItems.find(item => item.type === 'ticket' && item.buyer);
      if (existingTicket) {
        if (existingTicket.buyer) {
          setBuyer(prev => ({
            ...prev,
            ...existingTicket.buyer,
            siesa_id: existingTicket.buyer.siesa_id || existingTicket.buyer.nit || ''
          }));
        }

        if (existingTicket.attendees && existingTicket.attendees.length > 0) {
          setAttendees(existingTicket.attendees);
          setAttendeeErrors(new Array(existingTicket.attendees.length).fill({}));

          // Verificar si el primer asistente es el mismo comprador para marcar el checkbox
          if (existingTicket.buyer && existingTicket.attendees[0] &&
            existingTicket.buyer.nit === existingTicket.attendees[0].nit) {
            setUseBuyerAsFirstAttendee(true);
          }
        }
      }
    }
  }, [isOpen, cartItems]);

  // Buscar persona por documento para buyer
  const searchBuyerByDocument = useCallback(async (nit_type, nit) => {
    // Evitar buscar si es el mismo NIT que la última vez
    if (nit === lastSearchedBuyerNit.current) return;
    lastSearchedBuyerNit.current = nit;

    setSearchingBuyerDoc(true);

    try {
      const result = await getPersonByDocument(nit);

      if (result.found && result.person) {
        const person = result.person;

        setBuyer({
          nit_type: person.nit_type || nit_type,
          nit: person.nit || nit,
          first_name: person.first_name || '',
          middle_name: person.middle_name || '',
          last_name_1: person.last_name_1 || '',
          last_name_2: person.last_name_2 || '',
          birth_date: person.birth_date || '',
          email: person.email || '',
          cell_phone: person.cell_phone || '',
          person_source: person.person_source || '',
          siesa_id: person.siesa_id || ''
        });

        setBuyerErrors({});
      } else {
        // Cédula no encontrada - limpiar datos
        setBuyer(prev => ({
          ...prev, // Mantener nit_type del select
          nit: nit,
          first_name: '',
          middle_name: '',
          last_name_1: '',
          last_name_2: '',
          birth_date: '',
          email: '',
          cell_phone: '',
          person_source: '',
          siesa_id: ''
        }));

        showNotification(
          '¡Nos encanta que quieras ser parte de TCS Run! 🎶🤘',
          'Si haces parte de nuestra comunidad y/o eres egresado, y tienes inconvenientes al momento de inscribirte, puedes escribirnos a tech911@columbus.edu.co para validar tu documento y seguir adelante con la inscripción.\n\nSi nos visitas desde otro lugar, te invitamos a que contactes a alguien de la comunidad y se inscriban juntos. Aquí se corre mejor en combo. ¡Te esperamos! 🏃‍♀️🎉',
          'info'
        );
      }
    } catch (error) {
      console.error('Error buscando comprador:', error);

      // En caso de error, limpiar datos
      setBuyer(prev => ({
        ...prev,
        nit: nit,
        first_name: '',
        middle_name: '',
        last_name_1: '',
        last_name_2: '',
        birth_date: '',
        email: '',
        cell_phone: '',
        person_source: '',
        siesa_id: ''
      }));

      showNotification(
        '¡Nos encanta que quieras ser parte de TCS Run! 🎶🤘',
        'Si haces parte de nuestra comunidad y/o eres egresado, y tienes inconvenientes al momento de inscribirte, puedes escribirnos a tech911@columbus.edu.co para validar tu documento y seguir adelante con la inscripción.\n\nSi nos visitas desde otro lugar, te invitamos a que contactes a alguien de la comunidad y se inscriban juntos. Aquí se corre mejor en combo. ¡Te esperamos! 🏃‍♀️🎉',
        'info'
      );
    } finally {
      setSearchingBuyerDoc(false);
    }
  }, []);

  // Buscar persona por documento para attendees
  const searchAttendeeByDocument = useCallback(async (index, nit_type, nit) => {
    if (!nit || nit.length < 5) return;

    // Evitar buscar si es el mismo NIT que la última vez para este índice
    if (nit === lastSearchedAttendeeNits.current[index]) return;
    lastSearchedAttendeeNits.current[index] = nit;

    setSearchingAttendeeDoc(prev => ({ ...prev, [index]: true }));

    try {
      const result = await getPersonByDocument(nit);

      if (result.found && result.person) {
        const person = result.person;

        // Validar duplicados
        let duplicateMsg = '';
        let hasAlreadyPaid = false;

        // 1. Validar si ya tiene una orden pagada en el backend
        try {
          const existingOrder = await getOrderByPerson(nit_type, nit);
          if (existingOrder && existingOrder.status === 'PAID') {
            hasAlreadyPaid = true;
            duplicateMsg = 'Esta persona ya tiene una inscripción pagada para este evento';
            showNotification(
              '¡Este corredor ya está inscrito! 🏃‍♂️',
              `${person.first_name} ${person.last_name_1} ya tiene una inscripción pagada para este evento.\n\nSi crees que esto es un error, por favor escríbenos a tech911@columbus.edu.co`,
              'warning'
            );
          }
        } catch (orderError) {
          // Continuamos - puede ser que no tenga orden
        }

        // 2. Validar en carrito (solo si no hay error de orden pagada)
        if (!duplicateMsg) {
          const isInCart = cartItems.some(item =>
            item.type === 'ticket' &&
            item.attendees?.some(a => a.nit === nit)
          );
          if (isInCart) duplicateMsg = 'Esta persona ya tiene una entrada en el carrito';
        }

        // 3. Validar en lista actual
        if (!duplicateMsg) {
          const isInList = attendees.some((att, i) => i !== index && att.nit === nit);
          if (isInList) duplicateMsg = 'Este documento ya está en la lista actual';
        }

        // Si ya pagó, no llenar los datos - solo mostrar el error
        if (hasAlreadyPaid) {
          setAttendeeErrors(prevErrors => {
            const newErrors = [...prevErrors];
            newErrors[index] = { nit: duplicateMsg };
            return newErrors;
          });
          return;
        }

        // Autocompletar datos si la persona está en la comunidad
        setAttendees(prevAttendees => {
          const newAttendees = [...prevAttendees];
          const currentAttendee = newAttendees[index];

          newAttendees[index] = {
            ...currentAttendee,
            nit_type: person.nit_type || nit_type,
            nit: person.nit || nit,
            first_name: person.first_name || '',
            middle_name: person.middle_name || '',
            last_name_1: person.last_name_1 || '',
            last_name_2: person.last_name_2 || '',
            birth_date: person.birth_date || '',
            email: person.email || '',
            cell_phone: person.cell_phone || '',
            person_source: person.person_source || 'INVITED',
            siesa_id: person.siesa_id || ''
          };

          return newAttendees;
        });

        setAttendeeErrors(prevErrors => {
          const newErrors = [...prevErrors];
          if (duplicateMsg) {
            newErrors[index] = { nit: duplicateMsg };
          } else {
            newErrors[index] = {};
          }
          return newErrors;
        });

      } else {
        // Persona no encontrada en la comunidad - puede continuar con inscripción
        setAttendees(prevAttendees => {
          const newAttendees = [...prevAttendees];
          const currentAttendee = newAttendees[index];

          newAttendees[index] = {
            ...currentAttendee,
            nit_type: nit_type,
            nit: nit,
            first_name: '',
            middle_name: '',
            last_name_1: '',
            last_name_2: '',
            birth_date: '',
            email: '',
            cell_phone: '',
            person_source: 'INVITED',
            siesa_id: ''
          };

          return newAttendees;
        });

        setAttendeeErrors(prevErrors => {
          const newErrors = [...prevErrors];
          newErrors[index] = {};
          return newErrors;
        });
      }
    } catch (error) {
      // En caso de error en la búsqueda, permitimos continuar
      console.error('Error buscando persona:', error);

      setAttendees(prevAttendees => {
        const newAttendees = [...prevAttendees];
        const currentAttendee = newAttendees[index];

        newAttendees[index] = {
          ...currentAttendee,
          nit_type: nit_type,
          nit: nit,
          first_name: '',
          middle_name: '',
          last_name_1: '',
          last_name_2: '',
          birth_date: '',
          email: '',
          cell_phone: '',
          person_source: 'INVITED',
          siesa_id: ''
        };

        return newAttendees;
      });

      setAttendeeErrors(prevErrors => {
        const newErrors = [...prevErrors];
        newErrors[index] = {};
        return newErrors;
      });
    } finally {
      setSearchingAttendeeDoc(prev => ({ ...prev, [index]: false }));
    }
  }, [cartItems, attendees]);

  const debounceBuyerSearch = useCallback((nit_type, nit) => {
    if (buyerSearchTimeout.current) clearTimeout(buyerSearchTimeout.current);
    buyerSearchTimeout.current = setTimeout(() => {
      searchBuyerByDocument(nit_type, nit);
    }, 600);
  }, [searchBuyerByDocument]);

  const debounceAttendeeSearch = useCallback((index, nit_type, nit) => {
    if (attendeeSearchTimeouts.current[index]) clearTimeout(attendeeSearchTimeouts.current[index]);
    attendeeSearchTimeouts.current[index] = setTimeout(() => {
      searchAttendeeByDocument(index, nit_type, nit);
    }, 600);
  }, [searchAttendeeByDocument]);

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    const newBuyer = { ...buyer, [name]: value };
    setBuyer(newBuyer);

    if (buyerErrors[name]) {
      setBuyerErrors({ ...buyerErrors, [name]: '' });
    }

    if (name === 'nit' && value.length >= 5) {
      debounceBuyerSearch(buyer.nit_type, value);
    }

    // Si está marcado "El comprador también va a correr", actualizar el primer asistente
    if (useBuyerAsFirstAttendee && attendees.length > 0) {
      const newAttendees = [...attendees];
      // Solo actualizamos campos básicos que coinciden, no sobrescribimos talla, etc.
      if (['nit_type', 'nit', 'first_name', 'middle_name', 'last_name_1', 'last_name_2', 'birth_date', 'email', 'cell_phone'].includes(name)) {
        newAttendees[0] = { ...newAttendees[0], [name]: value };
        setAttendees(newAttendees);
      }
    }
  };

  const handleBuyerDocTypeChange = (e) => {
    const { value } = e.target;
    setBuyer({ ...buyer, nit_type: value });

    if (buyer.nit?.length >= 5) {
      debounceBuyerSearch(value, buyer.nit);
    }
  };

  const handleBuyerDocumentBlur = () => {
    if (buyer.nit?.length >= 5) {
      searchBuyerByDocument(buyer.nit_type, buyer.nit);
    }
  };

  const handleAttendeeChange = (index, e) => {
    const { name, value } = e.target;
    let newAttendees = [...attendees];
    newAttendees[index] = { ...newAttendees[index], [name]: value };

    // Si es el primer corredor y se marcó usar la misma info para todos
    if (index === 0 && useSameEmergencyForAll && ['emergency_contact_name', 'emergency_contact_phone', 'emergency_eps', 'medical_info'].includes(name)) {
      newAttendees = newAttendees.map((att, i) => {
        if (i === 0) return att;
        return { ...att, [name]: value };
      });
    }

    setAttendees(newAttendees);

    if (attendeeErrors[index]?.[name]) {
      const newErrors = [...attendeeErrors];
      newErrors[index] = { ...newErrors[index], [name]: '' };
      setAttendeeErrors(newErrors);
    }

    if (name === 'nit' && value.length >= 5) {
      debounceAttendeeSearch(index, newAttendees[index].nit_type, value);
    }
  };

  const handleAttendeeDocTypeChange = (index, e) => {
    const { value } = e.target;
    const newAttendees = [...attendees];
    newAttendees[index] = { ...newAttendees[index], nit_type: value };
    setAttendees(newAttendees);

    if (newAttendees[index].nit?.length >= 5) {
      debounceAttendeeSearch(index, value, newAttendees[index].nit);
    }
  };

  const handleAttendeeDocumentBlur = (index) => {
    const attendee = attendees[index];
    if (attendee.nit?.length >= 5) {
      searchAttendeeByDocument(index, attendee.nit_type, attendee.nit);
    }
  };

  const addAttendee = () => {
    if (attendees.length >= 10) {
      showNotification(
        '¡Gracias por creer en este evento! 🎶🏃',
        'Ya has comprado inscripciones, eso nos llena de emoción 🤘.\n\nRecuerda que el límite es de 10 inscripciones por titular de la compra. Si quieres sumar más integrantes a tu combo, intenta realizar la compra con otra cédula o escríbenos a tech911@columbus.edu.co y con gusto te ayudamos a conseguir más cupos (si tenemos disponibles). Queremos que nadie se quede por fuera. 🎸🏃‍♂️',
        'warning'
      );
      return;
    }

    let newAttendee = { ...emptyPerson };

    // Si está activa la sincronización de emergencia, copiar datos del primer asistente
    if (useSameEmergencyForAll && attendees.length > 0) {
      const first = attendees[0];
      newAttendee = {
        ...newAttendee,
        emergency_contact_name: first.emergency_contact_name,
        emergency_contact_phone: first.emergency_contact_phone,
        emergency_eps: first.emergency_eps,
        medical_info: first.medical_info
      };
    }

    setAttendees([...attendees, newAttendee]);
    setAttendeeErrors([...attendeeErrors, {}]);
  };

  const removeAttendee = (index) => {
    setAttendees(attendees.filter((_, i) => i !== index));
    setAttendeeErrors(attendeeErrors.filter((_, i) => i !== index));
  };

  const isValidDate = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  const isValidAge = (dateString) => {
    if (!isValidDate(dateString)) return false;
    const birthDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age >= 3) return true;
    return false;
  };

  // Validar formato de email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar formato de celular (solo números, 10 dígitos para Colombia)
  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Validar documento (solo números y letras, mínimo 5 caracteres)
  const isValidDocument = (doc) => {
    return doc && doc.length >= 5 && /^[a-zA-Z0-9]+$/.test(doc);
  };

  const isValidAgeRange = (participantType, ageRange) => {
    if (!ageRange) return false;

    // Si es adulto, el rango no puede ser de niños
    if (participantType === 'adulto') {
      return !['3-10 años', '11-17 años'].includes(ageRange);
    }

    // Si es niño, el rango debe ser de niños
    if (participantType === 'nino') {
      return ['3-10 años', '11-17 años'].includes(ageRange);
    }

    return true;
  };

  const validateBuyer = (buyer, isBuyerAlsoRunner) => {
    const errs = {};

    // Documento
    if (!buyer.nit) {
      errs.nit = 'Ingresa el documento';
    } else if (!isValidDocument(buyer.nit)) {
      errs.nit = 'Mínimo 5 caracteres';
    } else if (!buyer.person_source) {
      errs.nit = 'Este número de identificación no está registrado en nuestra organización';
    }

    // Nombre
    if (!buyer.first_name) {
      errs.first_name = 'Ingresa el nombre';
    } else if (buyer.first_name.length < 2) {
      errs.first_name = 'Mínimo 2 caracteres';
    }

    // Apellido
    if (!buyer.last_name_1) {
      errs.last_name_1 = 'Ingresa el apellido';
    } else if (buyer.last_name_1.length < 2) {
      errs.last_name_1 = 'Mínimo 2 caracteres';
    }

    // Email (obligatorio para comprador)
    if (!buyer.email) {
      errs.email = 'Ingresa el email';
    } else if (!isValidEmail(buyer.email)) {
      errs.email = 'Email inválido';
    }

    // Celular (obligatorio para comprador)
    if (!buyer.cell_phone) {
      errs.cell_phone = 'Ingresa el celular';
    } else if (!isValidPhone(buyer.cell_phone)) {
      errs.cell_phone = '10 dígitos';
    }

    // Fecha de nacimiento
    if (!buyer.birth_date) {
      errs.birth_date = 'Ingresa la fecha';
    } else if (!isValidDate(buyer.birth_date)) {
      errs.birth_date = 'Fecha inválida';
    } else if (new Date(buyer.birth_date).toDateString() === new Date().toDateString()) {
      errs.birth_date = 'La fecha no puede ser hoy';
    } else if (!isValidAge(buyer.birth_date)) {
      errs.birth_date = 'Mínimo 3 años';
    }

    // Solo validar campos de corredor si el comprador también va a correr
    if (isBuyerAlsoRunner) {
      // Tipo de participante
      if (!buyer.participant_type) {
        errs.participant_type = 'Selecciona una opción';
      }

      // Talla - obligatoria
      if (!buyer.shirt_size) {
        errs.shirt_size = 'Selecciona una talla';
      }

      // Rango de edad - obligatorio
      if (!buyer.age_range) {
        errs.age_range = 'Selecciona un rango de edad';
      } else if (!isValidAgeRange(buyer.participant_type, buyer.age_range)) {
        errs.age_range = buyer.participant_type === 'adulto'
          ? 'El rango de edad no corresponde a un adulto'
          : 'El rango de edad no corresponde a un niño';
      }
    }

    return errs;
  };

  const validateAttendee = (attendee) => {
    const errs = {};

    // Documento
    if (!attendee.nit) {
      errs.nit = 'Ingresa el documento';
    } else if (!isValidDocument(attendee.nit)) {
      errs.nit = 'Mínimo 5 caracteres';
    }

    // Nombre
    if (!attendee.first_name) {
      errs.first_name = 'Ingresa el nombre';
    } else if (attendee.first_name.length < 2) {
      errs.first_name = 'Mínimo 2 caracteres';
    }

    // Apellido
    if (!attendee.last_name_1) {
      errs.last_name_1 = 'Ingresa el apellido';
    } else if (attendee.last_name_1.length < 2) {
      errs.last_name_1 = 'Mínimo 2 caracteres';
    }

    // Email - NO obligatorio, pero si se ingresa debe ser válido
    if (attendee.email && !isValidEmail(attendee.email)) {
      errs.email = 'Email inválido';
    }

    // Celular - obligatorio para asistentes
    if (!attendee.cell_phone) {
      errs.cell_phone = 'Ingresa el celular';
    } else if (!isValidPhone(attendee.cell_phone)) {
      errs.cell_phone = '10 dígitos';
    }

    // Fecha de nacimiento
    if (!attendee.birth_date) {
      errs.birth_date = 'Ingresa la fecha';
    } else if (!isValidDate(attendee.birth_date)) {
      errs.birth_date = 'Fecha inválida';
    } else if (new Date(attendee.birth_date).toDateString() === new Date().toDateString()) {
      errs.birth_date = 'La fecha no puede ser hoy';
    } else if (!isValidAge(attendee.birth_date)) {
      errs.birth_date = 'Mínimo 3 años';
    }

    // Tipo de participante
    if (!attendee.participant_type) {
      errs.participant_type = 'Selecciona una opción';
    }

    // Talla - obligatoria
    if (!attendee.shirt_size) {
      errs.shirt_size = 'Selecciona una talla';
    }

    // Rango de edad - obligatorio
    if (!attendee.age_range) {
      errs.age_range = 'Selecciona un rango de edad';
    } else if (!isValidAgeRange(attendee.participant_type, attendee.age_range)) {
      errs.age_range = attendee.participant_type === 'adulto'
        ? 'El rango de edad no corresponde a un adulto'
        : 'El rango de edad no corresponde a un niño';
    }

    // Contacto de emergencia - obligatorio
    if (!attendee.emergency_contact_name) {
      errs.emergency_contact_name = 'Ingresa el contacto';
    }

    if (!attendee.emergency_contact_phone) {
      errs.emergency_contact_phone = 'Ingresa el teléfono';
    } else if (!isValidPhone(attendee.emergency_contact_phone)) {
      errs.emergency_contact_phone = '10 dígitos';
    }

    if (!attendee.emergency_eps) {
      errs.emergency_eps = 'Ingresa la EPS';
    }

    // Información médica - obligatorio
    if (!attendee.medical_info) {
      errs.medical_info = 'Ingresa información médica o "Ninguna"';
    }

    return errs;
  };

  const validateAll = () => {
    const buyerErrs = validateBuyer(buyer);

    // Validar checkboxes
    if (!acceptDataTreatment || !acceptTerms) {
      buyerErrs.terms = 'Debes aceptar ambas opciones para continuar';
    }

    setBuyerErrors(buyerErrs);

    let isValid = Object.keys(buyerErrs).length === 0;

    // Los asistentes ahora son obligatorios (debe haber al menos 1)
    if (attendees.length === 0) {
      Swal.fire('¡Espera!', 'Debes agregar al menos un corredor para continuar.', 'info');
      return false;
    }

    const attendeeErrs = attendees.map(att => validateAttendee(att));

    // Obtener NITs ya existentes en el carrito
    const cartNits = new Set();
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach(item => {
        if (item.type === 'ticket' && item.attendees) {
          item.attendees.forEach(a => {
            if (a.nit) cartNits.add(a.nit);
          });
        }
      });
    }

    // Validar duplicados en la lista actual y en el carrito
    const seenNits = new Set();
    attendees.forEach((att, index) => {
      if (att.nit) {
        if (seenNits.has(att.nit)) {
          attendeeErrs[index] = { ...attendeeErrs[index], nit: 'Este documento ya está en la lista actual' };
        } else if (cartNits.has(att.nit)) {
          attendeeErrs[index] = { ...attendeeErrs[index], nit: 'Esta persona ya tiene una entrada en el carrito' };
        }
        seenNits.add(att.nit);
      }
    });

    setAttendeeErrors(attendeeErrs);
    isValid = isValid && attendeeErrs.every(err => Object.keys(err).length === 0);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Validar que el buyer tenga un person_source asignado (buscado en el backend)
    if (!buyer.person_source) {
      setBuyerErrors(prev => ({ ...prev, nit: 'El comprador debe ser parte de la comunidad' }));
      return;
    }

    if (!validateAll()) {
      return;
    }


    setIsLoading(true);

    try {

      const buyerData = {
        nit_type: buyer.nit_type,
        nit: buyer.nit,
        first_name: buyer.first_name,
        middle_name: buyer.middle_name || '',
        last_name_1: buyer.last_name_1,
        last_name_2: buyer.last_name_2 || '',
        birth_date: buyer.birth_date || '',
        email: buyer.email,
        cell_phone: buyer.cell_phone,
        event_id: 1,
        person_source: buyer.person_source,
        siesa_id: buyer.siesa_id || buyer.nit || '',
        shirt_size: buyer.shirt_size,
        is_adult: buyer.participant_type === 'adulto',
        emergency_contact_name: buyer.emergency_contact_name || '',
        emergency_contact_phone: buyer.emergency_contact_phone || '',
        eps: buyer.emergency_eps || '',
        medical_info: buyer.medical_info || ''
      };


      // Función para comparar si dos personas tienen los mismos datos relevantes
      const isSamePerson = (person1, person2) => {
        return (
          person1.nit_type === person2.nit_type &&
          person1.nit === person2.nit &&
          person1.first_name === person2.first_name &&
          person1.last_name_1 === person2.last_name_1
        );
      };

      let attendeesData = [];

      // Función para construir los datos de un asistente
      const buildAttendeeData = (attendee, fallbackPersonSource = null) => ({
        nit_type: attendee.nit_type,
        nit: attendee.nit,
        first_name: attendee.first_name,
        middle_name: attendee.middle_name || '',
        last_name_1: attendee.last_name_1,
        last_name_2: attendee.last_name_2 || '',
        birth_date: attendee.birth_date || '',
        email: attendee.email || '',
        cell_phone: attendee.cell_phone,
        event_id: 1,
        person_source: attendee.person_source || fallbackPersonSource || '',
        siesa_id: attendee.siesa_id || attendee.nit || '',
        shirt_size: attendee.shirt_size,
        is_adult: attendee.participant_type === 'adulto',
        emergency_contact_name: attendee.emergency_contact_name || '',
        emergency_contact_phone: attendee.emergency_contact_phone || '',
        eps: attendee.emergency_eps || '',
        medical_info: attendee.medical_info || '',
        age_range: attendee.age_range || ''
      });

      // Si se marcó "usar mis datos como primer asistente"
      if (useBuyerAsFirstAttendee) {
        // Primer asistente usa person_source del buyer como fallback
        attendeesData.push(buildAttendeeData(attendees[0], buyer.person_source));

        // Agregar los otros asistentes (si los hay, empezando desde el índice 1)
        for (let i = 1; i < attendees.length; i++) {
          attendeesData.push(buildAttendeeData(attendees[i]));
        }
      } else {
        // Si NO se marcó "usar mis datos", agregar los asistentes normalmente
        attendeesData = attendees.map(attendee => buildAttendeeData(attendee));
      }


      // Verificar si ya existe una orden activa en el carrito
      let existingTicket = null;
      let backendOrderId = null;

      if (cartItems.length > 0) {
        existingTicket = cartItems.find(item => item.type === 'ticket' && item.backendOrderId);
        if (existingTicket) {
          backendOrderId = existingTicket.backendOrderId;
        }
      }

      let response;
      let finalAttendeesData = [];

      if (backendOrderId && existingTicket) {
        // --- EDITAR ORDEN EXISTENTE ---

        // Combinar asistentes existentes con los nuevos
        const previousAttendees = existingTicket.attendees || [];
        finalAttendeesData = [...previousAttendees, ...attendeesData];

        const orderData = {
          buyer: buyerData,
          attendees: finalAttendeesData
        };


        response = await updateOrder(backendOrderId, orderData);
        // Asegurar que la respuesta tenga el ID correcto si el back no lo devuelve en update
        if (!response.order_id) response.order_id = backendOrderId;

        // Eliminar el item anterior del carrito para reemplazarlo
        removeFromCart(existingTicket.id);

      } else {
        // --- CREAR NUEVA ORDEN ---
        finalAttendeesData = attendeesData;

        const orderData = {
          buyer: buyerData,
          attendees: finalAttendeesData
        };


        response = await createOrder(orderData);
      }


      // Obtener los detalles de la orden (incluyendo el total calculado por el backend)
      const orderDetails = await getOrderById(response.order_id);

      const ticketItem = {
        id: `event-${event.id}-${Date.now()}`,
        type: 'ticket',
        name: `${event.eventName} - ${event.distance}`,
        eventId: event.id,
        eventName: event.eventName,
        distance: event.distance,
        date: event.date,
        location: event.location,
        price: event.price,
        // Si se marcó "usar mis datos", attendeesData ya incluye al buyer como primer elemento
        // Si no se marcó, attendeesData tiene solo asistentes, así que suma 1 por el buyer
        quantity: useBuyerAsFirstAttendee ? finalAttendeesData.length : 1 + finalAttendeesData.length,
        // Usar los datos que se enviaron al backend, no los que devuelve
        // El buyer siempre tiene person_source: "employees"
        // Los attendees tienen person_source: "family"
        buyer: buyerData,
        attendees: finalAttendeesData,
        imageUrl: logoCarrera,
        backendOrderId: response.order_id,
        total: orderDetails.total // Total calculado por el backend
      };

      addToCart(ticketItem);

      // Mostrar modal de éxito en lugar de alert
      setSuccessData({
        eventName: `${event.eventName} - ${event.distance}`,
        attendeesCount: finalAttendeesData.length
      });
      setShowSuccessModal(true);
    } catch (error) {
      // Verificar si el error es por documento duplicado
      const errorData = error.response?.data;
      const errorMessage = errorData?.message || errorData?.detail || errorData?.error ||
        (typeof errorData === 'string' ? errorData : JSON.stringify(errorData || ''));

      console.error('Error:', errorMessage);

      const isDuplicateError = errorMessage.toLowerCase().includes('duplicate') ||
        errorMessage.toLowerCase().includes('already') ||
        errorMessage.toLowerCase().includes('existe') ||
        errorMessage.toLowerCase().includes('registrad') ||
        errorMessage.toLowerCase().includes('inscrit') ||
        errorMessage.toLowerCase().includes('ticket') ||
        error.response?.status === 409 ||
        error.response?.status === 400;

      if (isDuplicateError) {
        showNotification(
          '¡Este corredor ya está inscrito! 🏃‍♂️',
          'Uno o más documentos ingresados ya tienen un ticket registrado para este evento.\n\nSi crees que esto es un error, por favor escríbenos a tech911@columbus.edu.co',
          'warning'
        );
      } else {
        showNotification(
          'Hubo un error',
          'Hubo un error al procesar tu registro. Por favor, intenta nuevamente.',
          'warning'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setBuyer({ ...emptyPerson });
    setAttendees([]);
    setBuyerErrors({});
    setAttendeeErrors([]);
    setSearchingBuyerDoc(false);
    setSearchingAttendeeDoc({});
    setUseBuyerAsFirstAttendee(false);
    setAcceptDataTreatment(false);
    setAcceptTerms(false);
    setUseSameEmergencyForAll(false);
    setShowSuccessModal(false);
    // Limpiar refs de búsqueda para permitir re-búsqueda al abrir de nuevo
    lastSearchedBuyerNit.current = '';
    lastSearchedAttendeeNits.current = {};
    // Limpiar timeouts pendientes
    if (buyerSearchTimeout.current) clearTimeout(buyerSearchTimeout.current);
    Object.values(attendeeSearchTimeouts.current).forEach(t => clearTimeout(t));
    attendeeSearchTimeouts.current = {};
    onClose();
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    handleClose();
  };

  if (!isOpen || !event) return null;

  return (
    <>
      {/* Modal de Éxito */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        eventName={successData.eventName}
        attendeesCount={successData.attendeesCount}
      />

      {/* Modal de Notificaciones */}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />

      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        initialType={sizeGuideType}
      />

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-white">{event.eventName}</h2>
                <p className="text-blue-100 text-sm mt-1">{event.distance} • {event.date}</p>
                <p className="text-blue-200 text-sm">{event.location}</p>
              </div>
              <button onClick={handleClose} className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-full transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Buyer Form - Secci\u00f3n Fija */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Datos del comprador
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Obligatorio</span>
                </div>

                {/* Documento con búsqueda automática para buyer */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tipo Doc.</label>
                    <select
                      name="nit_type"
                      value={buyer.nit_type}
                      onChange={handleBuyerDocTypeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="CC">Cédula de ciudadanía</option>
                      <option value="CE">Cédula de extranjería</option>
                      <option value="TI">Tarjeta de identidad</option>
                      <option value="RC">Registro civil</option>
                      <option value="PE">Permiso de permanencia</option>
                      <option value="P">Pasaporte</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Número *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="nit"
                        value={buyer.nit}
                        onChange={handleBuyerChange}
                        onBlur={handleBuyerDocumentBlur}
                        className={`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 pr-10 ${buyerErrors.nit ? 'border-red-400 bg-red-50 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}`}
                        placeholder="Ingresa el documento para buscar"
                      />
                      {searchingBuyerDoc && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg className="animate-spin w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        </div>
                      )}
                      {!searchingBuyerDoc && buyer.person_source && buyer.nit?.length >= 5 && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {buyer.nit?.length >= 5 && buyer.person_source && !buyerErrors.nit && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Datos encontrados y completados
                      </p>
                    )}
                    {buyerErrors.nit && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {buyerErrors.nit}
                      </p>
                    )}
                  </div>
                </div>

                {/* Nombres para buyer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Primer Nombre *</label>
                    <input type="text" name="first_name" value={buyer.first_name} onChange={handleBuyerChange}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${buyerErrors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Juan" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Segundo Nombre</label>
                    <input type="text" name="middle_name" value={buyer.middle_name} onChange={handleBuyerChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Carlos" />
                  </div>
                </div>

                {/* Apellidos para buyer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Primer Apellido *</label>
                    <input type="text" name="last_name_1" value={buyer.last_name_1} onChange={handleBuyerChange}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${buyerErrors.last_name_1 ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Pérez" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Segundo Apellido</label>
                    <input type="text" name="last_name_2" value={buyer.last_name_2} onChange={handleBuyerChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="García" />
                  </div>
                </div>

                {/* Email, Celular y Fecha para buyer */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                    <input type="email" name="email" value={buyer.email} onChange={handleBuyerChange}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${buyerErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="correo@ejemplo.com" />
                    {buyerErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{buyerErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Celular *</label>
                    <input type="tel" name="cell_phone" value={buyer.cell_phone} onChange={handleBuyerChange}
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${buyerErrors.cell_phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="3001234567" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Fecha Nacimiento *</label>
                    <input type="date" name="birth_date" value={buyer.birth_date} onChange={handleBuyerChange}
                      min="1940-01-01"
                      max="2023-06-01"
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${buyerErrors.birth_date ? 'border-red-500' : 'border-gray-300'}`} />
                    {buyerErrors.birth_date && (
                      <p className="text-red-500 text-[10px] mt-1 font-medium">{buyerErrors.birth_date}</p>
                    )}
                  </div>
                </div>

                {/* Checkbox: ¿El comprador también va a correr? */}
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 mt-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useBuyerAsFirstAttendee}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setUseBuyerAsFirstAttendee(isChecked);

                        if (isChecked) {
                          // Si se marca, aseguramos que haya al menos un asistente y lo llenamos con info del buyer
                          let newAttendees = [...attendees];
                          if (newAttendees.length === 0) {
                            newAttendees.push({ ...emptyPerson });
                          }

                          // Llenamos el primer asistente con los datos del comprador
                          newAttendees[0] = {
                            ...newAttendees[0],
                            nit_type: buyer.nit_type,
                            nit: buyer.nit,
                            first_name: buyer.first_name,
                            middle_name: buyer.middle_name,
                            last_name_1: buyer.last_name_1,
                            last_name_2: buyer.last_name_2,
                            email: buyer.email,
                            cell_phone: buyer.cell_phone,
                            birth_date: buyer.birth_date,
                            person_source: buyer.person_source
                          };
                          setAttendees(newAttendees);
                        } else {
                          // Si se desmarca, limpiar los datos del primer asistente
                          if (attendees.length > 0) {
                            let newAttendees = [...attendees];
                            newAttendees[0] = {
                              ...emptyPerson,
                              // Mantener solo los campos específicos de corredor que no están en buyer
                              participant_type: newAttendees[0].participant_type || 'adulto',
                              shirt_size: newAttendees[0].shirt_size || '',
                              age_range: newAttendees[0].age_range || '',
                              emergency_contact_name: newAttendees[0].emergency_contact_name || '',
                              emergency_contact_phone: newAttendees[0].emergency_contact_phone || '',
                              emergency_eps: newAttendees[0].emergency_eps || '',
                              medical_info: newAttendees[0].medical_info || ''
                            };
                            setAttendees(newAttendees);
                          }
                        }
                      }}
                      className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-800">¿El comprador también va a correr?</span>
                      <p className="text-xs text-gray-500">Si marcas esta opción, completa los datos de corredor abajo</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Sección de Asistentes - Obligatoria */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 7a1 1 0 11-2 0 1 1 0 012 0zm7 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Corredores <span className="text-red-600">*</span></p>
                    <p className="text-xs text-blue-700">Debes agregar al menos 1 corredor para continuar</p>
                  </div>
                </div>
              </div>

              {/* Attendees Forms */}
              {attendees.map((attendee, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  {/* Attendee Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <span className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      Corredor {index + 1}
                    </h3>
                    <button type="button" onClick={() => removeAttendee(index)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </div>

                  {/* Documento con búsqueda automática para attendee */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Tipo Doc.</label>
                      <select
                        name="nit_type"
                        value={attendee.nit_type}
                        onChange={(e) => handleAttendeeDocTypeChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="CC">Cédula de ciudadanía</option>
                        <option value="CE">Cédula de extranjería</option>
                        <option value="TI">Tarjeta de identidad</option>
                        <option value="RC">Registro civil</option>
                        <option value="PE">Permiso de permanencia</option>
                        <option value="P">Pasaporte</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Número *</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="nit"
                          value={attendee.nit}
                          onChange={(e) => handleAttendeeChange(index, e)}
                          onBlur={() => handleAttendeeDocumentBlur(index)}
                          className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 pr-10 ${attendeeErrors[index]?.nit ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Ingresa el documento para buscar"
                        />
                        {searchingAttendeeDoc[index] && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg className="animate-spin w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          </div>
                        )}
                        {!searchingAttendeeDoc[index] && attendee.person_source && attendee.person_source !== 'INVITED' && attendee.nit?.length >= 5 && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {attendee.nit?.length >= 5 && attendee.person_source && attendee.person_source !== 'INVITED' && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Datos encontrados y completados
                        </p>
                      )}
                      {attendeeErrors[index]?.nit && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {attendeeErrors[index].nit}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Nombres */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Primer Nombre *</label>
                      <input type="text" name="first_name" value={attendee.first_name} onChange={(e) => handleAttendeeChange(index, e)}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.first_name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Juan" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Segundo Nombre</label>
                      <input type="text" name="middle_name" value={attendee.middle_name} onChange={(e) => handleAttendeeChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Carlos" />
                    </div>
                  </div>

                  {/* Apellidos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Primer Apellido *</label>
                      <input type="text" name="last_name_1" value={attendee.last_name_1} onChange={(e) => handleAttendeeChange(index, e)}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.last_name_1 ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Pérez" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Segundo Apellido</label>
                      <input type="text" name="last_name_2" value={attendee.last_name_2} onChange={(e) => handleAttendeeChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="García" />
                    </div>
                  </div>

                  {/* Email, Celular y Fecha */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                      <input type="email" name="email" value={attendee.email} onChange={(e) => handleAttendeeChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="correo@ejemplo.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Celular *</label>
                      <input type="tel" name="cell_phone" value={attendee.cell_phone} onChange={(e) => handleAttendeeChange(index, e)}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.cell_phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="3001234567" />
                      {attendeeErrors[index]?.cell_phone && (
                        <p className="text-red-500 text-xs mt-1">{attendeeErrors[index].cell_phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Fecha Nacimiento *</label>
                      <input type="date" name="birth_date" value={attendee.birth_date} onChange={(e) => handleAttendeeChange(index, e)}
                        min="1940-01-01"
                        max="2023-06-01"
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.birth_date ? 'border-red-500' : 'border-gray-300'}`} />
                      {attendeeErrors[index]?.birth_date && (
                        <p className="text-red-500 text-[10px] mt-1 font-medium">{attendeeErrors[index].birth_date}</p>
                      )}
                    </div>
                  </div>

                  {/* Niño o Papá y Talla */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de Participante *</label>
                      <select
                        name="participant_type"
                        value={attendee.participant_type || 'adulto'}
                        onChange={(e) => {
                          const newAttendees = [...attendees];
                          newAttendees[index] = { ...newAttendees[index], participant_type: e.target.value, shirt_size: '' };
                          setAttendees(newAttendees);
                        }}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.participant_type ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="adulto">Adulto</option>
                        <option value="nino">Niño</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Talla *</label>
                      <select
                        name="shirt_size"
                        value={attendee.shirt_size}
                        onChange={(e) => handleAttendeeChange(index, e)}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.shirt_size ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Selecciona una talla</option>
                        {(attendee.participant_type === 'nino' ? kidSizes : adultSizes).map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                      <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                        * Para inscripciones después del 10 de abril de 2026 no se garantiza disponibilidad de talla. Recibirá el kit con las tallas disponibles en inventario.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSizeGuideType(attendee.participant_type === 'nino' ? 'nino' : 'adulto');
                          setShowSizeGuide(true);
                        }}
                        className="mt-2 flex items-center gap-1.5 text-xs font-bold hover:underline transition-all active:scale-95"
                        style={{ color: '#02afd7' }}
                      >
                        📏 Ver guía de tallas
                      </button>
                    </div>
                  </div>

                  {/* Rango de Edad y Condiciones Médicas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Rango de Edad *</label>
                      <select
                        name="age_range"
                        value={attendee.age_range}
                        onChange={(e) => handleAttendeeChange(index, e)}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.age_range ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Selecciona un rango</option>
                        {ageRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      {attendeeErrors[index]?.age_range && (
                        <p className="text-red-500 text-xs mt-1">{attendeeErrors[index].age_range}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Condiciones Médicas / Alergias *</label>
                      <input type="text" name="medical_info" value={attendee.medical_info} onChange={(e) => handleAttendeeChange(index, e)}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.medical_info ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Condición médica, alergia o 'Ninguna'" />
                      {attendeeErrors[index]?.medical_info && (
                        <p className="text-red-500 text-xs mt-1">{attendeeErrors[index].medical_info}</p>
                      )}
                    </div>
                  </div>

                  {/* Contacto de Emergencia */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-600 mb-2">Contacto de Emergencia *</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nombre de contacto *</label>
                        <input type="text" name="emergency_contact_name" value={attendee.emergency_contact_name} onChange={(e) => handleAttendeeChange(index, e)}
                          className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.emergency_contact_name ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Nombre completo" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Teléfono de emergencia *</label>
                        <input type="tel" name="emergency_contact_phone" value={attendee.emergency_contact_phone} onChange={(e) => handleAttendeeChange(index, e)}
                          className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.emergency_contact_phone ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="3001234567" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">EPS *</label>
                        <input type="text" name="emergency_eps" value={attendee.emergency_eps} onChange={(e) => handleAttendeeChange(index, e)}
                          className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${attendeeErrors[index]?.emergency_eps ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Nombre de la EPS" />
                      </div>
                    </div>
                  </div>

                  {/* Checkbox para usar la misma info en todos (solo para el primer corredor si hay más de uno) */}
                  {index === 0 && attendees.length > 1 && (
                    <div className="mt-4 bg-orange-50 rounded-xl p-3 border border-orange-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useSameEmergencyForAll}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setUseSameEmergencyForAll(isChecked);
                            if (isChecked) {
                              const first = attendees[0];
                              const syncedAttendees = attendees.map((att, i) => {
                                if (i === 0) return att;
                                return {
                                  ...att,
                                  emergency_contact_name: first.emergency_contact_name,
                                  emergency_contact_phone: first.emergency_contact_phone,
                                  emergency_eps: first.emergency_eps,
                                  medical_info: first.medical_info
                                };
                              });
                              setAttendees(syncedAttendees);
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-800">Usar esta información de emergencia para todos</span>
                          <span className="text-xs text-gray-500">Se copiará el contacto y la información médica a los otros corredores</span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Attendee Button */}
              <button type="button" onClick={addAttendee}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar otro corredor
              </button>

              {/* Checkboxes de Términos y Condiciones */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Autorizaciones
                </h4>

                {/* Checkbox Tratamiento de Datos */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acceptDataTreatment}
                    onChange={(e) => setAcceptDataTreatment(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Autorización para el tratamiento de datos personales *
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Si soy mayor de edad, autorizo el tratamiento de mis datos personales y sensibles. Si el participante es menor de edad, como padre/madre o acudiente autorizado, consiento el tratamiento de los datos personales y sensibles del menor.{' '}
                      <a
                        href={pdfAutorizacionDatos}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver documento completo
                      </a>
                    </p>
                  </div>
                </label>

                {/* Checkbox Términos y Condiciones */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Acepto los términos y condiciones *
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      He leído y acepto los términos y condiciones del evento, incluyendo las normas de participación, exoneración de responsabilidad y políticas de reembolso.{' '}
                      <a
                        href={pdfTerminosCondiciones}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver documento completo
                      </a>
                    </p>
                  </div>
                </label>

                {/* Checkbox Uso de Imagen (Opcional) */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acceptImageUse}
                    onChange={(e) => setAcceptImageUse(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Autorización para uso de imagen
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Si soy mayor de edad, autorizo el uso de mi imagen. Si el participante es menor de edad, como padre/madre o acudiente autorizado, consiento el uso de la imagen del menor para fines promocionales del evento.{' '}
                      <a
                        href={pdfAutorizacionDatos}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver documento completo
                      </a>
                    </p>
                  </div>
                </label>

                {/* Mensaje de error si no acepta */}
                {(!acceptDataTreatment || !acceptTerms) && buyerErrors.terms && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Debes aceptar las autorizaciones obligatorias para continuar
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 px-6 py-4 mt-6 -mx-6 -mb-6">
              <div className="flex gap-3">
                <button type="button" onClick={handleClose}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition">
                  Cancelar
                </button>
                <button type="submit" disabled={isLoading}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Confirmar Registro
                    </>
                  )}
                </button>
              </div>
            </div>
          </form >
        </div >
      </div >
    </>
  );
};

export default EventRegistrationModal;