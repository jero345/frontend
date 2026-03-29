import React, { useState } from 'react'
import EventRegistrationModal from './EventRegistrationmodal'
import principalImg from '../assets/images/principal.png'
import logoColumbus from '../assets/images/columbus.png'
import logoAsopaf from '../assets/images/asopaf.png'

const Hero = () => {
  const [showModal, setShowModal] = useState(false)

  // Datos del evento TCS RUN Rock & Roll
  const event = {
    id: 1,
    eventName: "TCS RUN Rock & Roll",
    distance: "3K y 6K",
    date: "24 de Mayo, 2026",
    fullDate: "Domingo 24 de Mayo de 2026",
    location: "Campus The Columbus School",
    time: "8:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600",
    price: 80000,
    registrationOpen: true
  }

  return (
    <>
      <section id="inicio" className="relative min-h-screen flex items-center pt-32 sm:pt-40 lg:pt-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #02afd7 0%, #0891b2 40%, #f5522a 100%)' }}>
        {/* Burbujas Decorativas Visibles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Burbujas grandes con borde */}
          <div className="absolute top-16 left-8 w-24 h-24 rounded-full border-4 border-white/40 animate-float" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-32 left-32 w-16 h-16 rounded-full bg-white/20 animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 right-16 w-32 h-32 rounded-full border-4 border-white/30 animate-float" style={{ animationDuration: '6s', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-24 right-48 w-20 h-20 rounded-full bg-white/15 animate-float" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-16 w-14 h-14 rounded-full border-2 border-white/50 animate-float" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/4 right-1/3 w-10 h-10 rounded-full bg-white/25 animate-pulse"></div>
        </div>

        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-contain sm:bg-cover bg-center opacity-10 sm:opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${principalImg})`,
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              {/* Logos Organizadores */}
              <div className="flex justify-center lg:justify-start items-center gap-3 sm:gap-6 mb-4">
                <div className="bg-white/95 backdrop-blur rounded-2xl px-5 py-3 sm:px-6 sm:py-4 shadow-lg flex items-center gap-3 sm:gap-5">
                  <img src={logoColumbus} alt="Columbus Life" className="h-8 sm:h-14 w-auto object-contain hover:scale-105 transition-transform" />
                  <img src={logoAsopaf} alt="ASOPAF" className="h-10 sm:h-16 w-auto object-contain hover:scale-105 transition-transform" />
                </div>
              </div>

              {/* Badge Presentan */}
              <div className="inline-block bg-white/10 backdrop-blur border-2 border-white/30 rounded-full px-6 py-2 mb-6">
                <span className="text-white text-sm font-bold uppercase tracking-wider">Presentan</span>
              </div>

              {/* Título Principal con efecto Rock */}
              <div className="mb-6 relative">
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-1 leading-tight tracking-tight drop-shadow-lg">
                  TCS RUN
                </h1>
                <h2 className="text-3xl md:text-6xl lg:text-7xl font-black leading-tight">
                  <span className="drop-shadow-2xl" style={{ color: '#f5522a', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    Rock & Roll
                  </span>
                </h2>
              </div>

              {/* Categorías Destacadas */}
              <div className="flex justify-center lg:justify-start gap-4 mb-8">
                <div className="text-white px-8 py-3 rounded-2xl font-black text-3xl shadow-2xl transform hover:scale-110 transition-all hover:rotate-2 cursor-pointer" style={{ backgroundColor: '#f5522a' }}>
                  3K
                </div>
                <div className="text-white px-8 py-3 rounded-2xl font-black text-3xl shadow-2xl transform hover:scale-110 transition-all hover:-rotate-2 cursor-pointer" style={{ backgroundColor: '#02afd7' }}>
                  6K
                </div>
              </div>

              {/* Fecha Destacada */}
              <div className="bg-white/95 backdrop-blur rounded-3xl px-10 py-5 inline-block mb-8 shadow-2xl hover:shadow-3xl transition-shadow">
                <p className="font-black text-2xl md:text-3xl mb-1" style={{ color: '#f5522a' }}>
                  Domingo 24 de mayo
                </p>
                <p className="font-bold text-lg" style={{ color: '#02afd7' }}>
                  2026
                </p>
              </div>

              {/* Información del Evento */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8 text-white">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-2">
                  <svg className="w-6 h-6" style={{ color: '#f5522a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xl font-bold">{event.time}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-2">
                  <svg className="w-6 h-6" style={{ color: '#f5522a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-lg font-bold">{event.location}</span>
                </div>
              </div>

              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative inline-flex items-center justify-center gap-3 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-110 shadow-2xl overflow-hidden"
                  style={{ backgroundColor: '#f5522a' }}
                >
                  <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <svg className="w-7 h-7 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="relative z-10">¡INSCRÍBETE YA!</span>
                </button>

                <a
                  href="#evento"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border-2 border-white px-10 py-5 rounded-2xl font-black text-xl transition backdrop-blur"
                >
                  MÁS INFO
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Stats Section - Below */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all hover:scale-105">
              <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#f5522a' }}>2</div>
              <div className="text-white text-lg font-bold uppercase tracking-wide">Categorías</div>
              <div className="text-white/80 text-sm mt-2">3K & 6K</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all hover:scale-105">
              <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#f5522a' }}>700+</div>
              <div className="text-white text-lg font-bold uppercase tracking-wide">Corredores</div>
              <div className="text-white/80 text-sm mt-2">Esperados</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all hover:scale-105">
              <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#f5522a' }}>
                ${(event.price / 1000).toFixed(0)}K
              </div>
              <div className="text-white text-lg font-bold uppercase tracking-wide">Inversión</div>
              <div className="text-white/80 text-sm mt-2">Desde</div>
            </div>
          </div>
        </div>

        {/* Wave decorativo inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Modal de Inscripción */}
      <EventRegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        event={event}
      />
    </>
  )
}

export default Hero
