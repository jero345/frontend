import { useState, useEffect } from 'react'
import CartButton from '../cart/Cartbutton'
import logoColumbus from '../assets/images/columbus.png'
import logoAsopaf from '../assets/images/asopaf.png'
import logoSchool from '../assets/images/school.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#evento', label: 'El Evento' },
    { href: '#contacto', label: 'Contacto' }
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'nav-floating'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-28">

            {/* Logos & Badge (Left) */}
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <a href="#inicio" className="flex items-center gap-2 sm:gap-4 group">
                <div className="bg-white/90 backdrop-blur rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-md flex items-center gap-2 sm:gap-3">
                  <img src={logoColumbus} alt="Columbus Life" className="h-7 sm:h-12 w-auto" />
                  <img src={logoAsopaf} alt="ASOPAF" className="h-8 sm:h-14 w-auto" />
                  <img src={logoSchool} alt="TCS RUN" className="hidden sm:inline h-8 sm:h-12 w-auto" />
                </div>
              </a>

              {/* Event Badge (Desktop) */}
              <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 ${scrolled
                ? 'bg-gray-100 border-gray-200'
                : 'bg-white/10 border-white/10 shadow-lg shadow-black/5'
                }`}>
                <span className={`font-black text-[10px] tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>TCS RUN</span>
                <span className="bg-[#f5522a] text-white text-[9px] font-black px-1.5 py-0.5 rounded leading-none">2026</span>
              </div>
            </div>

            {/* Desktop Menu (Center) */}
            <div className="hidden md:flex flex-1 justify-center px-4">
              <div className={`flex items-center p-1 rounded-full backdrop-blur-xl transition-all duration-500 border ${scrolled
                ? 'bg-white/80 shadow-xl shadow-black/[0.03] border-gray-100'
                : 'bg-white/5 border-white/5'
                }`}>
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${scrolled
                      ? 'text-gray-500 hover:text-[#f5522a] hover:bg-[#f5522a]/5'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden md:block">
                <CartButton scrolled={scrolled} />
              </div>

              {/* Mobile Menu Button - Solo Móvil */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-3 rounded-2xl transition-all duration-300 ${scrolled
                  ? 'bg-gray-900 text-white shadow-xl shadow-gray-200'
                  : 'bg-white text-gray-900 shadow-lg'
                  }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          {isMenuOpen && (
            <div className="md:hidden py-6 animate-in slide-in-from-top-6 duration-300">
              <div className="bg-white rounded-[2rem] p-4 shadow-2xl border border-gray-100 space-y-1">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-8 py-5 text-sm font-black text-gray-900 uppercase tracking-widest hover:bg-orange-50 hover:text-[#f5522a] rounded-2xl transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
