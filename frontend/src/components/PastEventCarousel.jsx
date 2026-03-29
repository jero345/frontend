import React, { useState, useEffect } from 'react'
import hero1Img from '../assets/images/carousel/hero_1.jpg'
import hero2Img from '../assets/images/carousel/hero_2.jpg'
import hero3Img from '../assets/images/carousel/hero_3.jpg'
import hero4Img from '../assets/images/carousel/hero_4.jpg'
import hero5Img from '../assets/images/carousel/hero_5.jpg'
import carreraImg from '../assets/images/carrera.png'

const PastEventCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const images = [
    { src: hero1Img, alt: 'Corredores en la primera edición' },
    { src: hero2Img, alt: 'Participantes del evento' },
    { src: hero3Img, alt: 'Momentos del evento' },
    { src: hero4Img, alt: 'Comunidad corriendo' },
    { src: hero5Img, alt: 'Calentamiento previo' },
    { src: carreraImg, alt: 'La carrera en acción' }
  ]

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#02afd7' }}></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#f5522a' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-white font-black text-sm uppercase tracking-wider px-6 py-2 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #f5522a 0%, #02afd7 100%)' }}>
            Primera Edición
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Recuerdos de <span style={{ color: '#f5522a' }}>TCS Character Counts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recordemos juntos momentos inolvidables que vivimos en nuestra primera edición realizada el 7 de junio de 2025
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center bg-white rounded-2xl px-8 py-4 shadow-lg border-2 border-gray-100">
            <p className="text-4xl font-black" style={{ color: '#f5522a' }}>475</p>
            <p className="text-gray-600 font-bold">Corredores</p>
          </div>
          <div className="text-center bg-white rounded-2xl px-8 py-4 shadow-lg border-2 border-gray-100">
            <p className="text-4xl font-black" style={{ color: '#02afd7' }}>2025</p>
            <p className="text-gray-600 font-bold">Primera Edición</p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-900">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                  }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            ))}

            {/* Image Counter */}
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur px-4 py-2 rounded-full">
              <span className="text-white font-bold">{currentIndex + 1} / {images.length}</span>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full flex items-center justify-center transition-all transform hover:scale-110 group"
            >
              <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full flex items-center justify-center transition-all transform hover:scale-110 group"
            >
              <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-6">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden transition-all duration-300 ${index === currentIndex
                    ? 'ring-4 scale-110 shadow-lg'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                style={{ ringColor: index === currentIndex ? '#f5522a' : 'transparent' }}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 border-4 rounded-xl" style={{ borderColor: '#f5522a' }}></div>
                )}
              </button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                style={{ backgroundColor: index === currentIndex ? '#f5522a' : undefined }}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg mb-4">
            Este 2026, la experiencia será aún mejor
          </p>
          <a
            href="#evento"
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
            style={{ background: 'linear-gradient(135deg, #f5522a 0%, #02afd7 100%)' }}
          >
            <span>Ver Categorías 2026</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default PastEventCarousel
