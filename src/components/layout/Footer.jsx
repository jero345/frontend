import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-serif text-gold text-xl tracking-widest uppercase">Abundance Code</span>
            <p className="mt-4 text-white/50 text-sm leading-relaxed">
              Crystal Code is a personalized digital and physical product.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Producto', href: '/abundance-code-sphere' },
                { label: 'Sobre Nosotros', href: '/about' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contacto', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Legal</p>
            <ul className="space-y-2">
              {[
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Refund Policy', href: '/returns' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© 2026 Abundance Code. All rights reserved.</p>
          <p className="text-white/20 text-xs">www.abundancecode.com</p>
        </div>
      </div>
    </footer>
  );
}
