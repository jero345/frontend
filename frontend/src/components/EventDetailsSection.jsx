import React, { useState } from 'react'
import EventRegistrationModal from './EventRegistrationmodal'
import principalImg from '../assets/images/principal.png'
import carreraImg from '../assets/images/carrera.png'
import logoColumbus from '../assets/images/columbus.png'
import logoAsopaf from '../assets/images/asopaf.png'

// Componente de Modal de Notificación/Información (Reutilizado)
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
    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

const EventDetailsSection = () => {
  const [showModal, setShowModal] = useState(false)
  const [notification, setNotification] = useState({ isOpen: false, title: '', message: '', type: 'info' })

  // Cambiar a true para probar el mensaje de Sold Out
  const isSoldOut = false;

  const handleOpenRegistration = () => {
    if (isSoldOut) {
      setNotification({
        isOpen: true,
        title: '¡Esta experiencia ya está sold-out! 🌟🎶',
        message: 'Gracias por tu interés. Te esperamos con toda la energía en nuestra próxima edición.\nMantente atento a nuestras redes sociales para no perderte ninguna novedad.',
        type: 'soldout'
      });
      return;
    }
    setShowModal(true);
  };

  // Datos del evento TCS RUN Rock & Roll
  const event = {
    id: 3,
    eventName: "TCS RUN Rock & Roll",
    distance: "3K y 6K",
    date: "24 de mayo, 2026",
    location: "Campus The Columbus School",
    price: 90000
  }

  const categories = [
    {
      distance: "3K",
      name: "Carrera Familiar",
      description: "Perfecta para principiantes, familias y quienes se inician en el running",
      price: 90000,
      startTime: "8:30 AM",
      icon: "🎸",
      color: "#f5522a",
      features: [
        "Recorrido seguro dentro del campus",
        "Terreno variado: grama, arenilla y asfalto",
        "Ideal para todas las edades"
      ]
    },
    {
      distance: "6K",
      name: "Carrera Competitiva",
      description: "Para corredores con experiencia que buscan un desafío mayor",
      price: 90000,
      startTime: "8:00 AM",
      icon: "⚡",
      color: "#02afd7",
      features: [
        "Recorrido técnico y exigente",
        "Cronometraje profesional con chip",
        "Premiación top 3 por categoría"
      ]
    }
  ]

  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: "Kit de Corredor Completo",
      description: "Camiseta técnica oficial del evento, número de corredor personalizado y chip de cronometraje profesional."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Cronometraje Profesional",
      description: "Sistema de chip de última generación con resultados en tiempo real disponibles al finalizar."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Medalla Finisher Rock & Roll",
      description: "Medalla conmemorativa exclusiva con diseño rock para todos los que crucen la meta."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Hidratación y Snacks",
      description: "Estaciones de hidratación en todo el recorrido y refrigerio saludable al finalizar."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Cobertura Fotográfica",
      description: "Fotografía profesional del evento disponible para descarga gratuita."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      title: "Ambiente Rock & Roll",
      description: "Música en vivo, DJ y animación durante todo el evento, obsequios y participación en rifas con  premios increíbles."
    }
  ]

  const logistics = [
    {
      title: "Recorrido",
      description: "Carrera segura dentro de las instalaciones del colegio, pasando por diferentes terrenos: arenilla, grama natural y asfalto."
    },
    {
      title: "Seguridad",
      description: "Equipo médico profesional, hidratación constante y personal de apoyo en todo el recorrido."
    },
    {
      title: "Parqueadero",
      description: "Amplio parqueadero disponible dentro del campus con señalización."
    }
  ]

  return (
    <>
      <section id="evento" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-0 w-72 h-72 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#02afd7' }}></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#f5522a' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Imagen Principal del Evento */}
          <div className="mb-20">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
              <img
                src={principalImg}
                alt="TCS RUN Rock & Roll 2026"
                className="w-full h-auto md:h-[500px] object-contain md:object-cover"
              />
              {/* Gradiente solo visible en desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent hidden md:block"></div>
              {/* Texto superpuesto oculto en móvil, visible en desktop */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 hidden md:block">
                <div className="max-w-3xl">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
                    TCS RUN <span style={{ color: '#f5522a' }}>Rock & Roll</span>
                  </h2>
                  <p className="text-white/90 text-lg md:text-xl font-medium mb-6">
                    La carrera más esperada del año. Corre al ritmo del rock en el Campus The Columbus School.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl">
                      <span className="text-white font-bold">24 de mayo, 2026</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl">
                      <span className="text-white font-bold">8:00 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logos Organizadores - visible en mobile entre imagen y carrera */}
          <div className="mb-10 md:mb-16 flex justify-center md:hidden">
            <div className="bg-white rounded-2xl shadow-xl px-8 py-5 flex items-center gap-6 border border-gray-100">
              <img src={logoAsopaf} alt="ASOPAF" className="h-14 w-auto object-contain" />
              <img src={logoColumbus} alt="Columbus Life" className="h-12 w-auto object-contain" />
            </div>
          </div>

          {/* Imagen de la Carrera */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src={carreraImg}
                  alt="Corredores en acción"
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#02afd7]/80 to-transparent"></div>
                <div className="absolute top-1/2 left-8 -translate-y-1/2">
                  <p className="text-white text-5xl md:text-7xl font-black">3K & 6K</p>
                  <p className="text-white/90 text-xl font-bold mt-2">Dos categorías para todos</p>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-black text-gray-900">
                  Una experiencia <span style={{ color: '#f5522a' }}>única</span>
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Únete a cientos de corredores en esta experiencia deportiva que combina música,
                  diversión y deporte. Recorre el hermoso campus de The Columbus School mientras
                  disfrutas del mejor ambiente rock & roll.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                    <span className="text-2xl">🏃</span>
                    <span className="font-bold text-gray-700">Recorrido seguro</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                    <span className="text-2xl">🎸</span>
                    <span className="font-bold text-gray-700">Música en vivo</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                    <span className="text-2xl">🏅</span>
                    <span className="font-bold text-gray-700">Medalla finisher</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Qué Incluye - Moved Up */}
          <div className="mb-20 bg-white rounded-3xl shadow-2xl p-10 md:p-12 border-2 border-gray-100">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                ¿Qué incluye tu inscripción?
              </h3>
              <p className="text-xl text-gray-600 font-medium">
                Todo lo necesario para una experiencia inolvidable 🎸⚡
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg" style={{ background: index % 2 === 0 ? '#f5522a' : '#02afd7' }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Final Grande */}
            <div className="text-center rounded-2xl p-6 md:p-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5522a 0%, #02afd7 100%)' }}>
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/10 -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/10 translate-x-20 translate-y-20"></div>
              <p className="text-white text-xl md:text-2xl font-bold mb-6 relative z-10">
                ¡Los cupos son limitados! 🔥
              </p>
              <button
                onClick={handleOpenRegistration}
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 md:gap-3 bg-white hover:bg-gray-100 px-6 py-4 md:px-12 md:py-6 rounded-xl font-black text-lg md:text-2xl transition-all transform hover:scale-105 shadow-2xl relative z-10"
                style={{ color: '#02afd7' }}
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                ¡INSCRÍBETE AHORA!
              </button>
              <p className="text-white/90 mt-4 text-sm relative z-10">
                Asegura tu lugar en la carrera más rock de Medellín
              </p>
            </div>
          </div>

          {/* Sección Unificada de Inscripción - Now below 'Qué Incluye' */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="text-white font-black text-sm uppercase tracking-wider px-6 py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #f5522a 0%, #02afd7 100%)' }}>
                  Inscripciones Abiertas
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                TCS RUN
                <span style={{ color: '#f5522a' }}> Rock & Roll</span>
              </h2>
              <div className="flex justify-center gap-4 mb-6">
                <span className="text-white px-6 py-2 rounded-xl font-black text-2xl" style={{ backgroundColor: '#f5522a' }}>3K</span>
                <span className="text-white px-6 py-2 rounded-xl font-black text-2xl" style={{ backgroundColor: '#02afd7' }}>6K</span>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                El día de la carrera puedes escoger cuánto correr
              </p>
            </div>

            {/* Card Principal de Inscripción */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
                {/* Header */}
                <div className="p-8 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5522a 0%, #02afd7 100%)' }}>
                  <div className="absolute top-0 right-0 text-white/10 text-9xl transform translate-x-8 -translate-y-4">🎸</div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 -translate-x-16 translate-y-16"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Carrera Familiar</h3>
                    <p className="text-white/90 text-lg">Perfecta para principiantes, familias y quienes se inician en el running</p>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8">
                  {/* Características */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-medium">Recorrido seguro dentro del campus</span>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-medium">Terreno variado: grama, arenilla y asfalto</span>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-medium">Ideal para todas las edades</span>
                    </div>
                  </div>

                  {/* Tabla de Precios */}
                  <div className="mb-8">
                    <h4 className="text-xl font-black text-gray-900 mb-4 text-center">Valor Inscripción 2026</h4>
                    <div className="overflow-x-auto rounded-2xl border-2 border-gray-200">
                      <table className="w-full">
                        <thead>
                          <tr style={{ backgroundColor: '#02afd7' }}>
                            <th className="px-6 py-4 text-left text-white font-bold">Tipo de Inscripción</th>
                            <th className="px-6 py-4 text-right text-white font-bold">Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b border-gray-100">
                            <td className="px-6 py-4 font-bold text-gray-900">Precio por persona</td>
                            <td className="px-6 py-4 text-right text-2xl font-black" style={{ color: '#f5522a' }}>$90,000</td>
                          </tr>
                          <tr className="bg-gray-50 border-b border-gray-100">
                            <td className="px-6 py-4 font-medium text-gray-700">Precio Staff</td>
                            <td className="px-6 py-4 text-right text-xl font-bold text-gray-900">$80,000</td>
                          </tr>
                          <tr className="bg-white border-b border-gray-100">
                            <td className="px-6 py-4 font-medium text-gray-700">Combo 3 personas</td>
                            <td className="px-6 py-4 text-right text-xl font-bold" style={{ color: '#02afd7' }}>$250,000</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-700">Combo 4 personas</td>
                            <td className="px-6 py-4 text-right text-xl font-bold" style={{ color: '#02afd7' }}>$320,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 text-center">
                      <span className="font-bold">*Importante:</span> Los combos aplican para la misma familia en el mismo momento de pago. <br />
                      <span className="font-bold">Es el mismo precio para niño y adulto.</span><br />
                      <span className="font-bold" style={{ color: '#02afd7' }}>Por compras de 4 inscripciones en adelante, el valor unitario por inscripción es de $80,000.</span><br />
                      <span className="text-xs mt-2 block italic text-[#f5522a] font-medium border-t border-gray-100 pt-4">
                        Para las inscripciones realizadas después del 10 de abril de 2026 no se garantiza disponibilidad de talla. Recibirá el kit con las tallas disponibles que tengamos en el inventario.
                      </span>
                    </p>
                  </div>

                  {/* Límites */}
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-bold text-amber-800 mb-2">Información importante sobre cupos:</p>
                        <ul className="text-amber-700 space-y-1">
                          <li>• Límite de aforo general para la carrera: <span className="font-bold">700 inscripciones / corredores</span></li>
                          <li>• Límite de cantidad de inscripciones por usuario: <span className="font-bold">10 inscripciones por usuario</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Botón de Inscripción */}
                  <button
                    onClick={handleOpenRegistration}
                    className="w-full text-white py-5 rounded-xl font-black text-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
                    style={{ background: 'linear-gradient(135deg, #f5522a 0%, #02afd7 100%)' }}
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    ¡INSCRIBIRME AHORA!
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Logística del Evento */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-block text-white font-black text-sm uppercase tracking-wider px-6 py-2 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #f5522a 0%, #02afd7 100%)' }}>
                Información Importante
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900">
                Logística del <span style={{ color: '#f5522a' }}>Evento</span>
              </h3>
            </div>

            {/* Cards de Logística */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {logistics.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: index === 0 ? '#f5522a' : index === 1 ? '#02afd7' : '#f5522a' }}
                  >
                    {index === 0 && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    )}
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Información de Fecha, Hora y Lugar */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f5522a' }}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Fecha</p>
                  <p className="text-white text-xl md:text-2xl font-black">Domingo 24 de mayo</p>
                  <p className="text-white/80 font-bold">2026</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#02afd7' }}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Hora de Inicio</p>
                  <p className="text-white text-xl md:text-2xl font-black">8:00 AM</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f5522a' }}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Lugar</p>
                  <p className="text-white text-xl md:text-2xl font-black">Campus TCS</p>
                  <p className="text-white/80 font-bold">The Columbus School</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />

      <EventRegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        event={event}
      />
    </>
  )
}

export default EventDetailsSection
