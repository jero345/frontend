import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../context/LanguageContext.jsx';

const metalStyle = {
  background: 'linear-gradient(180deg, #E6C76A 0%, #D4AF37 40%, #C9A227 70%, #E6C76A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const NAV_KEYS = [
  { key: 'nav.home',    href: '/' },
  { key: 'nav.product', href: '/abundance-code-sphere' },
  { key: 'nav.blog',    href: '/blog' },
  { key: 'nav.about',   href: '/about' },
  { key: 'nav.faq',     href: '/faq' },
  { key: 'nav.contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location                = useLocation();
  const { lang, toggle, t }     = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <span className="font-serif text-sm md:text-base tracking-[0.32em] uppercase select-none" style={metalStyle}>
              Abundance Code
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_KEYS.map(({ key, href }) => (
              <Link
                key={href}
                to={href}
                className={`font-sans text-sm transition-colors duration-200 ${
                  isActive(href) ? 'text-white font-medium' : 'text-white/50 hover:text-white'
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Lang toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggle}
              className="font-sans text-xs tracking-widest uppercase text-white/40 hover:text-white/80 transition-colors border border-white/10 hover:border-white/25 rounded px-2.5 py-1"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <Link to="/checkout" className="btn-gold text-xs px-6 py-2.5">
              {t('nav.cta')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span key="close"
                  initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.18 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.18 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            {/* Ambient stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 1.5 + 0.4,
                    height: Math.random() * 1.5 + 0.4,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.25 + 0.05,
                  }} />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-8">
              <nav className="flex flex-col items-center gap-6 mb-10 w-full">
                {NAV_KEYS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <Link
                      to={link.href}
                      className={`font-serif text-2xl md:text-3xl tracking-wide transition-all duration-200 ${
                        isActive(link.href) ? '' : 'text-white/55 hover:text-white'
                      }`}
                      style={isActive(link.href) ? metalStyle : {}}
                    >
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="w-full h-px mb-8"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.42 }}
                className="w-full"
              >
                <Link to="/checkout" className="btn-gold w-full text-sm py-4 text-center block">
                  {t('nav.cta')}
                </Link>
                <button
                  onClick={toggle}
                  className="mt-4 w-full font-sans text-xs tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors border border-white/10 hover:border-white/20 rounded py-2"
                >
                  {lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 flex items-center gap-5"
            >
              {[['Terms', '/terms'], ['Privacy', '/privacy'], ['Returns', '/returns']].map(([label, href]) => (
                <Link key={href} to={href} className="text-white/20 text-[10px] tracking-widest uppercase hover:text-white/45 transition-colors font-sans">
                  {label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
