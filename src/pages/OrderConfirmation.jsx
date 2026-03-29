import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Truck, Smartphone, Sparkles } from 'lucide-react';
import StarField from '../components/bits/StarField.jsx';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const metalStyle = {
  background: 'linear-gradient(180deg, #E6C76A 0%, #D4AF37 40%, #C9A227 70%, #E6C76A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

function AnimSection({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }
    fetch(`/api/stripe/session/${sessionId}`)
      .then((r) => r.json())
      .then((data) => { setOrder(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [sessionId]);

  const isPremium = order?.product === 'crystal-code-premium';

  return (
    <main className="relative min-h-screen bg-[#0B0B0B] pb-20">
      <StarField count={40} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-20">

        {/* ── 1. HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/30 mb-8">
            <span className="text-3xl">🔮</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">
            Your Crystal Code is being prepared.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-4 font-sans">
            Your purchase has been confirmed. Your crystal will be delivered in the next few days.
          </p>
          <p className="font-serif text-xl" style={metalStyle}>
            You've just made an important decision.
          </p>
        </motion.div>

        {/* ── 2. EMOTIONAL REINFORCEMENT ── */}
        <AnimSection className="mb-16">
          <motion.div variants={fadeUp} className="card-gold rounded-2xl p-8 text-center">
            <p className="font-serif text-xl md:text-2xl mb-4" style={metalStyle}>
              You didn't buy on impulse. You bought because something wasn't working.
            </p>
            <p className="text-white/60 font-sans leading-relaxed mb-4">
              Now you're closer to understanding it.
            </p>
            <p className="font-serif text-lg" style={metalStyle}>
              That already changes everything.
            </p>
          </motion.div>
        </AnimSection>

        {/* ── 3. WHAT HAPPENS NEXT ── */}
        <AnimSection className="mb-16">
          <motion.h2 variants={fadeUp} className="font-serif text-2xl md:text-3xl text-center mb-8">
            What happens next
          </motion.h2>
          <div className="space-y-4 mb-6">
            {[
              { icon: <Package size={20} />, label: 'Processing', detail: '1–3 days' },
              { icon: <Truck size={20} />, label: 'Shipping to your address', detail: '' },
              { icon: <Smartphone size={20} />, label: 'Portal access when scanned', detail: '' },
              { icon: <Sparkles size={20} />, label: 'Activation of your analysis', detail: '' },
            ].map(({ icon, label, detail }) => (
              <motion.div key={label} variants={fadeUp} className="card-glass rounded-2xl p-5 flex items-center gap-4">
                <span className="text-gold flex-shrink-0">{icon}</span>
                <div>
                  <p className="text-white/80 font-sans">{label}</p>
                  {detail && <p className="text-white/40 font-sans text-sm">{detail}</p>}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p variants={fadeUp} className="text-center text-white/40 font-sans italic">
            Everything is already in motion.
          </motion.p>
        </AnimSection>

        {/* ── 4. PREPARE NOW ── */}
        <AnimSection className="mb-16">
          <motion.div variants={fadeUp} className="card-glass rounded-2xl p-8">
            <h2 className="font-serif text-xl md:text-2xl mb-4">Your experience starts now. Have ready:</h2>
            <ul className="space-y-2">
              {['Birth date', 'Time (if known)', 'Birth city'].map(item => (
                <li key={item} className="flex items-center gap-3 text-white/60 font-sans">
                  <span className="text-gold">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimSection>

        {/* ── 5. MICRO-EXPERIENCE ── */}
        <AnimSection className="mb-16">
          <motion.div variants={fadeUp} className="card-glass rounded-2xl p-8">
            <h2 className="font-serif text-xl md:text-2xl mb-4">While your Crystal Code arrives…</h2>
            <p className="text-white/60 font-sans leading-relaxed mb-4">
              Start noticing:
            </p>
            <ul className="space-y-2 mb-6">
              {['Repeated decisions', 'Recurring situations', 'Patterns in money or relationships'].map(item => (
                <li key={item} className="flex items-center gap-3 text-white/60 font-sans">
                  <span className="text-gold">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-serif text-lg" style={metalStyle}>
              This will make sense very soon.
            </p>
          </motion.div>
        </AnimSection>

        {/* ── 6. UPSELL (only if not premium) ── */}
        {!loading && !isPremium && (
          <AnimSection className="mb-16">
            <motion.div variants={fadeUp} className="card-gold rounded-2xl p-8 border border-gold/40 text-center">
              <p className="text-2xl mb-4">🔥</p>
              <h3 className="font-serif text-xl mb-3" style={metalStyle}>
                Add your energy bracelet with 20% OFF
              </h3>
              <p className="text-white/60 font-sans leading-relaxed mb-6">
                Integrate your process into your daily life with a physical reminder.
              </p>
              <button
                disabled
                className="btn-gold w-full opacity-60 cursor-not-allowed"
              >
                Add to my order — coming soon
              </button>
            </motion.div>
          </AnimSection>
        )}

        {/* ── 7. SUPPORT ── */}
        <AnimSection>
          <motion.div variants={fadeUp} className="text-center">
            <p className="text-white/40 font-sans text-sm">
              Need help? Contact us:{' '}
              <a href="mailto:support@abundancecode.com" className="text-gold hover:underline">
                support@abundancecode.com
              </a>
            </p>
          </motion.div>
        </AnimSection>

      </div>
    </main>
  );
}
