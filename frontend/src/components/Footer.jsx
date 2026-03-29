import logoColumbus from '../assets/images/columbus.png'
import logoAsopaf from '../assets/images/asopaf.png'
import pdfTerminos from '../assets/pdfs/Política términos y condiciones TCS Run.pdf'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="text-white" style={{ background: 'linear-gradient(135deg, #02afd7 0%, #0891b2 50%, #02afd7 100%)' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Logo y Descripción */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* Logos */}
              <div className="flex items-center gap-4">
                <div className="bg-white/95 backdrop-blur rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 sm:gap-5">
                  <img src={logoColumbus} alt="Columbus Life" className="h-8 sm:h-12 w-auto object-contain" />
                  <img src={logoAsopaf} alt="ASOPAF" className="h-10 sm:h-14 w-auto object-contain" />
                </div>
              </div>
            </div>

            <h4 className="text-3xl font-black mb-4" style={{ color: '#f5522a', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
              TCS RUN Rock & Roll 2026
            </h4>
            <p className="text-white mb-6 leading-relaxed text-lg font-medium">
              El evento deportivo más esperado del año. Una experiencia única que combina
              deporte, música y comunidad. ¡Prepárate para correr al ritmo del rock!
            </p>

            {/* Red Social - Solo Instagram */}
            <div className="flex gap-3">
              <a href="https://www.instagram.com/thecolumbusschool?igsh=MWtuYnlodjB0b2JucQ==" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center transition-all transform hover:scale-110"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5522a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-2xl font-black mb-6" style={{ color: '#f5522a', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Enlaces Rápidos</h4>
            <ul className="space-y-4">
              <li>
                <a href="#inicio" className="text-white transition font-semibold text-lg flex items-center gap-2 hover:translate-x-1"
                  onMouseEnter={(e) => e.target.style.color = '#f5522a'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}>
                  <span style={{ color: '#f5522a' }}>▸</span> Inicio
                </a>
              </li>
              <li>
                <a href="#evento" className="text-white transition font-semibold text-lg flex items-center gap-2 hover:translate-x-1"
                  onMouseEnter={(e) => e.target.style.color = '#f5522a'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}>
                  <span style={{ color: '#f5522a' }}>▸</span> El Evento
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-white transition font-semibold text-lg flex items-center gap-2 hover:translate-x-1"
                  onMouseEnter={(e) => e.target.style.color = '#f5522a'}
                  onMouseLeave={(e) => e.target.style.color = 'white'}>
                  <span style={{ color: '#f5522a' }}>▸</span> Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-2xl font-black mb-6" style={{ color: '#f5522a', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Contáctanos</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-white">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#f5522a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-bold text-white">Email</p>
                  <a href="mailto:tcsrun@columbus.edu.co" className="transition text-white/90 hover:text-white"
                    onMouseEnter={(e) => e.target.style.color = '#f5522a'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}>
                    tcsrun@columbus.edu.co
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#f5522a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-bold text-white">Teléfono</p>
                  <a href="tel:+573001234567" className="transition text-white/90 hover:text-white"
                    onMouseEnter={(e) => e.target.style.color = '#f5522a'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}>
                    +57 300 123 4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#f5522a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-bold text-white">Ubicación</p>
                  <span className="text-white/90">Campus The Columbus School</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-center md:text-left font-semibold">
              © {currentYear} ColumbusLife Deportes - The Columbus School. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-base">
              <a href={pdfTerminos} target="_blank" rel="noopener noreferrer" className="text-white/90 transition font-semibold hover:text-white"
                onMouseEnter={(e) => e.target.style.color = '#f5522a'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}>
                Términos y Condiciones
              </a>
              <a href={pdfTerminos} target="_blank" rel="noopener noreferrer" className="text-white/90 transition font-semibold hover:text-white"
                onMouseEnter={(e) => e.target.style.color = '#f5522a'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}>
                Política de Privacidad
              </a>
            </div>
          </div>

          {/* Organizadores */}
          <div className="mt-10 text-center">
            <p className="text-white font-bold text-lg mb-6">Organizado por</p>
            <div className="flex justify-center items-center">
              <div className="bg-white/95 backdrop-blur rounded-2xl px-8 py-5 shadow-lg flex items-center gap-6 sm:gap-10 hover:scale-105 transition-transform">
                <img src={logoColumbus} alt="Columbus Life" className="h-10 sm:h-14 w-auto object-contain" />
                <img src={logoAsopaf} alt="ASOPAF" className="h-12 sm:h-18 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
