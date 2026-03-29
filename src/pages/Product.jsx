import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarField from '../components/bits/StarField.jsx';
import CrystalSphere from '../components/bits/CrystalSphere.jsx';

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

export default function Product() {
  return (
    <main className="relative min-h-screen bg-[#0B0B0B] pt-24 pb-20">
      <StarField count={40} />

      {/* ── 1. HERO ── */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <CrystalSphere size={320} />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
                Do you do everything right… and still nothing changes?
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed mb-4 font-sans">
                Your pattern isn't in what you do. It's in what you don't see.
              </motion.p>
              <motion.p variants={fadeUp} className="font-serif text-xl mb-6" style={metalStyle}>
                Your personal diagnosis, engraved in crystal.
              </motion.p>
              <motion.p variants={fadeUp} className="text-white/60 leading-relaxed mb-6 font-sans">
                Scan your Crystal Code, enter your birth details, and access the analysis that reveals what's blocking your money, your decisions, and your life.
              </motion.p>
              <motion.ul variants={fadeUp} className="space-y-2 mb-8">
                {[
                  'Diagnosis in 5 areas',
                  'Based on your exact birth chart',
                  'Immediate lifetime access',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/70 font-sans text-sm">
                    <span className="text-gold">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp}>
                <p className="font-serif text-4xl mb-4" style={metalStyle}>$177 USD</p>
                <Link to="/checkout" className="btn-gold w-full text-center text-base mb-3 block">
                  I Want My Crystal Code
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT IS IT ── */}
      <section className="relative z-10 bg-[#080808] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection className="text-center max-w-2xl mx-auto">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-6">
              This isn't just a sphere. It's a personal system.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed mb-6 font-sans">
              A physical object designed as access to your personal portal, where you can clearly see the pattern you're repeating in your life.
            </motion.p>
            <motion.p variants={fadeUp} className="font-serif text-xl" style={metalStyle}>
              The crystal is the access. The analysis is the transformation.
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 3. WHAT'S INCLUDED ── */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center mb-12">
              Everything included in your Crystal Code
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { emoji: '🔮', text: 'Crystal sphere with unique engraved QR' },
                { emoji: '💡', text: 'Illuminated base' },
                { emoji: '📦', text: 'Premium box' },
                { emoji: '✨', text: 'Personalized portal' },
                { emoji: '🔍', text: 'Block diagnosis' },
                { emoji: '💫', text: 'Your Abundance Code' },
                { emoji: '🌟', text: 'Your unique energy symbol' },
                { emoji: '🙏', text: 'Activation ritual' },
                { emoji: '📱', text: 'Practical daily guide' },
              ].map(({ emoji, text }) => (
                <motion.div key={text} variants={fadeUp} className="card-glass rounded-2xl p-5 flex items-center gap-4">
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <p className="text-white/70 font-sans text-sm">{text}</p>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeUp} className="text-center text-white/40 font-sans italic">
              There is no other one like yours.
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 4. THE REAL PROBLEM ── */}
      <section className="relative z-10 bg-[#080808] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection className="text-center max-w-2xl mx-auto">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-6">
              The problem isn't lack of effort
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed mb-6 font-sans">
              It's that you're repeating decisions, relationships, and results without realizing it.
            </motion.p>
            <motion.p variants={fadeUp} className="font-serif text-xl" style={metalStyle}>
              And until you see it, it won't change.
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 5. THE 5 AREAS ── */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection>
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {[
                { emoji: '💰', label: 'Money', desc: "Why it doesn't flow or stay" },
                { emoji: '❤️', label: 'Relationships', desc: 'What pattern you repeat' },
                { emoji: '🎯', label: 'Purpose', desc: "What's holding you back" },
                { emoji: '😔', label: 'Self-worth', desc: 'What blocks your confidence' },
                { emoji: '🌿', label: 'Wellbeing', desc: 'How your energy reflects the pattern' },
              ].map(({ emoji, label, desc }) => (
                <motion.div key={label} variants={fadeUp} className="card-glass rounded-2xl p-6 text-center">
                  <span className="text-3xl block mb-3">{emoji}</span>
                  <p className="font-serif text-lg mb-1">{label}</p>
                  <p className="text-white/50 font-sans text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeUp} className="font-serif text-xl text-center" style={metalStyle}>
              One analysis. Everything is connected.
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ── */}
      <section className="relative z-10 bg-[#080808] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center mb-12">
              Simple and direct
            </motion.h2>
            <div className="grid md:grid-cols-5 gap-6 mb-6">
              {[
                { n: '1', text: 'Receive your Crystal Code' },
                { n: '2', text: 'Scan the QR' },
                { n: '3', text: 'Enter your details' },
                { n: '4', text: 'Your analysis is generated' },
                { n: '5', text: 'See your pattern clearly' },
              ].map(({ n, text }) => (
                <motion.div key={n} variants={fadeUp} className="text-center">
                  <div className="w-12 h-12 rounded-full border border-gold/40 bg-gold/5 flex items-center justify-center mx-auto mb-4 font-serif text-lg" style={metalStyle}>
                    {n}
                  </div>
                  <p className="text-white/60 font-sans text-sm leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeUp} className="text-center text-white/40 font-sans italic">
              No apps. No complexity.
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 7. RESULT ── */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection className="text-center max-w-2xl mx-auto">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-6">
              What changes when you see it
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed mb-6 font-sans">
              You understand why you repeat the same patterns. You stop making unconscious decisions. You start acting with clarity.
            </motion.p>
            <motion.p variants={fadeUp} className="font-serif text-xl" style={metalStyle}>
              It's not magic. It's real understanding.
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 8. OBJECTIONS ── */}
      <section className="relative z-10 bg-[#080808] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection className="max-w-2xl mx-auto">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center mb-10">
              Common questions
            </motion.h2>
            <div className="space-y-4">
              {[
                { q: 'Do I need to believe in this?', a: 'No. Just see if it accurately describes your life.' },
                { q: "What if I've tried everything?", a: "This isn't another tool. It's the root of the problem." },
                { q: "What if it's not for me?", a: "You have 7 days. If it's not for you, we refund you." },
              ].map(({ q, a }) => (
                <motion.div key={q} variants={fadeUp} className="card-glass rounded-2xl p-6">
                  <p className="font-serif text-lg mb-2">{q}</p>
                  <p className="text-white/60 font-sans leading-relaxed">{a}</p>
                </motion.div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── 9. OFFER ── */}
      <section className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center mb-12">
              Choose your experience
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="card-glass rounded-2xl p-8 flex flex-col">
                <span className="text-3xl mb-4 block">🔮</span>
                <h3 className="font-serif text-2xl mb-2">Crystal Code</h3>
                <p className="text-white/50 font-sans text-sm mb-6">Full system access</p>
                <p className="font-serif text-4xl mb-6" style={metalStyle}>$177 USD</p>
                <Link to="/checkout?product=crystal-code" className="btn-gold w-full text-center mt-auto block">
                  I Want My Crystal Code
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="card-gold rounded-2xl p-8 flex flex-col border border-gold/30">
                <span className="text-3xl mb-4 block">✨</span>
                <h3 className="font-serif text-2xl mb-2">Crystal Code Premium</h3>
                <p className="text-white/50 font-sans text-sm mb-6">+ Energy bracelet to integrate the process into your daily life</p>
                <p className="font-serif text-4xl mb-6" style={metalStyle}>$217 USD</p>
                <Link to="/checkout?product=crystal-code-premium" className="btn-gold w-full text-center mt-auto block">
                  I Want the Full Experience
                </Link>
              </motion.div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── 10. CLOSING ── */}
      <section className="relative z-10 bg-[#080808] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimSection className="text-center max-w-2xl mx-auto">
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-6">
              Repeating the same patterns is also a decision.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed mb-10 font-sans">
              You can keep trying… or finally see what's holding you back.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/checkout" className="btn-gold text-base px-12 py-5">
                I Want to See My Pattern
              </Link>
            </motion.div>
          </AnimSection>
        </div>
      </section>
    </main>
  );
}
