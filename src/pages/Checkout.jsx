import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, RefreshCw, ChevronRight, Check, Sparkles } from 'lucide-react';
import StarField from '../components/bits/StarField.jsx';
import CrystalSphere from '../components/bits/CrystalSphere.jsx';

const PRODUCTS = {
  'crystal-code': { key: 'crystal-code', name: 'Crystal Code', price: 177, label: '🔮' },
  'crystal-code-premium': { key: 'crystal-code-premium', name: 'Crystal Code Premium', price: 217, label: '✨' },
};

const metalStyle = {
  background: 'linear-gradient(180deg, #E6C76A 0%, #D4AF37 40%, #C9A227 70%, #E6C76A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialProduct = searchParams.get('product') === 'crystal-code-premium'
    ? 'crystal-code-premium'
    : 'crystal-code';

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const product = PRODUCTS[selectedProduct];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email.'); return; }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerEmail: email, customerName: name, product: selectedProduct }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Could not start checkout. Please try again.');
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-24 pb-20">
      <StarField count={30} />
      <div className="relative z-10 max-w-2xl mx-auto px-6">

        {/* Header — micro-close */}
        <motion.div
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-10"
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] font-sans font-medium mb-3" style={metalStyle}>
            Secure Checkout
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-2">
            You're one step away from seeing your pattern clearly
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/40 font-sans text-sm">
            Complete your purchase and activate your Crystal Code.
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Product selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <p className="text-white/50 text-xs uppercase tracking-widest font-sans mb-3">Choose your experience</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* Crystal Code */}
              <button
                type="button"
                onClick={() => setSelectedProduct('crystal-code')}
                className={`relative rounded-2xl p-5 text-left transition-all border ${
                  selectedProduct === 'crystal-code'
                    ? 'border-gold/60 bg-gold/5'
                    : 'border-white/10 bg-white/3 hover:border-white/25'
                }`}
              >
                {selectedProduct === 'crystal-code' && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                    <Check size={11} className="text-black" />
                  </span>
                )}
                <p className="text-xl mb-1">🔮</p>
                <p className="font-serif text-base text-white mb-0.5">Crystal Code</p>
                <ul className="text-white/45 text-xs font-sans space-y-0.5 mb-3">
                  <li>Engraved crystal sphere</li>
                  <li>Illuminated base + premium box</li>
                  <li>Personalized portal</li>
                  <li>Full diagnosis (5 areas)</li>
                </ul>
                <p className="font-serif text-xl" style={metalStyle}>$177 USD</p>
              </button>

              {/* Crystal Code Premium */}
              <button
                type="button"
                onClick={() => setSelectedProduct('crystal-code-premium')}
                className={`relative rounded-2xl p-5 text-left transition-all border ${
                  selectedProduct === 'crystal-code-premium'
                    ? 'border-gold/60 bg-gold/5'
                    : 'border-white/10 bg-white/3 hover:border-white/25'
                }`}
              >
                {selectedProduct === 'crystal-code-premium' && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                    <Check size={11} className="text-black" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl">✨</p>
                  <span className="text-[10px] uppercase tracking-widest font-sans px-2 py-0.5 rounded-full bg-gold/20 text-gold">Best Value</span>
                </div>
                <p className="font-serif text-base text-white mb-0.5">Crystal Code Premium</p>
                <ul className="text-white/45 text-xs font-sans space-y-0.5 mb-3">
                  <li>Everything in Crystal Code</li>
                  <li className="text-gold/80">+ Energy bracelet included</li>
                </ul>
                <p className="font-serif text-xl" style={metalStyle}>$217 USD</p>
              </button>
            </div>

            {/* Order bump — only shown when Crystal Code is selected */}
            {selectedProduct === 'crystal-code' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 rounded-xl border border-gold/25 bg-gold/5 p-4 flex items-center gap-4"
              >
                <div className="flex-shrink-0">
                  <Sparkles size={20} className="text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-sans font-medium">🔥 Add your energy bracelet for just <span style={metalStyle} className="font-semibold">$40 more</span></p>
                  <p className="text-white/40 text-xs font-sans mt-0.5">Integrate your process into your daily life with a constant physical reminder.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct('crystal-code-premium')}
                  className="flex-shrink-0 text-xs font-sans font-semibold px-3 py-1.5 rounded-lg bg-gold text-black hover:bg-gold/90 transition-colors"
                >
                  Add
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-white/3 p-6 mb-5"
          >
            <p className="text-white/50 text-xs uppercase tracking-widest font-sans mb-4">Your details</p>
            <div className="space-y-4">
              <div>
                <label className="block text-white/50 text-xs font-sans mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm font-sans focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-sans mb-1.5">Email <span className="text-gold">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm font-sans focus:outline-none focus:border-gold/50 transition-colors"
                />
                <p className="text-white/25 text-xs font-sans mt-1.5">Your activation code will be sent here. Shipping address collected at next step.</p>
              </div>
            </div>
          </motion.div>

          {/* Security block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/8 p-4 mb-5 flex flex-wrap gap-6 justify-center"
          >
            {[
              { icon: <Lock size={15} />, label: '100% secure payment' },
              { icon: <Shield size={15} />, label: 'Card / PayPal' },
              { icon: <RefreshCw size={15} />, label: '7-day guarantee' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/40 text-xs font-sans">
                <span className="text-gold/70">{icon}</span>
                {label}
              </div>
            ))}
          </motion.div>

          {/* Final reinforcement */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-center mb-6"
          >
            <p className="font-serif text-white text-lg mb-1">You're not buying a sphere.</p>
            <p className="font-serif text-white/60 text-base">You're accessing clarity about your life.</p>
          </motion.div>

          {error && (
            <p className="text-red-400 text-sm font-sans text-center mb-4">{error}</p>
          )}

          {/* Payment button */}
          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full btn-gold text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mb-4"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Redirecting to secure checkout...
              </>
            ) : (
              <>
                Complete Purchase — ${product.price} USD
                <ChevronRight size={18} />
              </>
            )}
          </motion.button>

          {/* Micro-objections below button */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-white/30 text-xs font-sans">
            {['✔ Lifetime access', '✔ Shipping in 5–15 days', '✔ Risk-free guarantee'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </form>

        {/* Order summary sticky */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 rounded-2xl border border-gold/20 bg-gold/5 p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{product.label}</span>
              <div>
                <p className="font-serif text-white text-sm">{product.name}</p>
                <p className="text-white/40 text-xs font-sans">Crystal sphere + personalized portal</p>
              </div>
            </div>
            <p className="font-serif text-lg" style={metalStyle}>${product.price} USD</p>
          </div>
          <p className="text-white/30 text-xs font-sans">
            As soon as you confirm your purchase, you'll receive access to a preview of your portal.
            Your sphere activates the full analysis once it arrives.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
