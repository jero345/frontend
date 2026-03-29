import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarField from '../components/bits/StarField.jsx';
import Aurora from '../components/bits/Aurora.jsx';
import CrystalSphere from '../components/bits/CrystalSphere.jsx';
import ProsperityTree from '../components/bits/ProsperityTree.jsx';
import { useLang } from '../context/LanguageContext.jsx';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const metalStyle = {
  background: 'linear-gradient(180deg, #E6C76A 0%, #D4AF37 40%, #C9A227 70%, #E6C76A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// Floating celestial glyphs around the hero sphere
const FLOAT_SYMBOLS = [
  { symbol: '☽', top: '12%', left: '8%', size: '1.6rem', delay: 0 },
  { symbol: '✦', top: '20%', right: '6%', size: '1rem', delay: 1.2 },
  { symbol: '♃', top: '55%', left: '4%', size: '1.3rem', delay: 0.6 },
  { symbol: '♄', bottom: '18%', right: '8%', size: '1.2rem', delay: 1.8 },
  { symbol: '⊕', top: '70%', left: '12%', size: '0.9rem', delay: 2.4 },
  { symbol: '✧', top: '35%', right: '3%', size: '0.8rem', delay: 0.9 },
  { symbol: '☿', bottom: '30%', left: '6%', size: '1rem', delay: 1.5 },
];

const LIFE_AREA_KEYS = [
  { symbol: '♃', planet: 'Jupiter', labelKey: 'area.money',         descKey: 'area.money.desc' },
  { symbol: '♀', planet: 'Venus',   labelKey: 'area.relationships',  descKey: 'area.relationships.desc' },
  { symbol: '☿', planet: 'Mercury', labelKey: 'area.purpose',        descKey: 'area.purpose.desc' },
  { symbol: '☉', planet: 'Sun',     labelKey: 'area.selfworth',      descKey: 'area.selfworth.desc' },
  { symbol: '☽', planet: 'Moon',    labelKey: 'area.wellbeing',      descKey: 'area.wellbeing.desc' },
];

const PAIN_SYMBOLS = ['♃', '♀', '☿', '☉', '☽'];

function MysticDivider({ symbol = '✦' }) {
  return (
    <div className="flex items-center gap-4 my-2 opacity-30 max-w-xs mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
      <span className="text-[#D4AF37] text-sm">{symbol}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
    </div>
  );
}

function AnimSection({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { t } = useLang();
  return (
    <main className="relative min-h-screen bg-[#0B0B0B] pt-24 pb-20 overflow-x-hidden">
      <StarField count={60} />

      {/* ── 1. HERO ── */}
      <section className="relative min-h-[92vh] flex items-center">
        <Aurora />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-[#D4AF37]/60 font-sans text-xs tracking-[0.25em] uppercase mb-5"
              >
                {t('hero.tag')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
              >
                {t('hero.h1')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-white/55 text-lg leading-relaxed mb-4 font-sans"
              >
                {t('hero.p1')}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="font-serif text-xl md:text-2xl mb-8"
                style={metalStyle}
              >
                {t('hero.p2')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/checkout" className="btn-gold text-base px-10 py-4">
                  {t('hero.cta1')}
                </Link>
                <Link to="/como-funciona" className="btn-ghost text-base px-10 py-4">
                  {t('hero.cta2')}
                </Link>
              </motion.div>

              {/* Zodiac row */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="mt-8 text-[#D4AF37]/30 text-xl tracking-[0.3em] font-sans"
              >
                ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓
              </motion.p>
            </div>

            {/* Right — Crystal Sphere */}
            <div className="relative flex items-center justify-center">
              {/* Floating celestial symbols */}
              {FLOAT_SYMBOLS.map(({ symbol, size, delay, ...pos }) => (
                <motion.span
                  key={symbol}
                  className="absolute font-serif text-[#D4AF37]/40 pointer-events-none select-none"
                  style={{ fontSize: size, ...pos }}
                  animate={{ y: [0, -10, 0], opacity: [0.3, 0.65, 0.3] }}
                  transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
                >
                  {symbol}
                </motion.span>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <CrystalSphere size={340} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PAIN ── */}
      <section className="relative py-28 bg-[#070710]">
        {/* Subtle nebula tint */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(96,64,160,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <AnimSection className="text-center">
            <motion.p variants={fadeUp} className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans mb-3">
              {t('pain.tag')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-12">
              {t('pain.h2')}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4 text-left mb-10">
              {PAIN_SYMBOLS.map((symbol, i) => (
                <motion.div
                  key={symbol}
                  variants={fadeUp}
                  className="group relative rounded-2xl p-6 flex items-start gap-4 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(212,175,55,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                  whileHover={{ borderColor: 'rgba(212,175,55,0.35)', background: 'rgba(212,175,55,0.03)' }}
                >
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-serif"
                    style={{
                      background: 'rgba(212,175,55,0.08)',
                      border: '1px solid rgba(212,175,55,0.25)',
                      color: '#D4AF37',
                    }}
                  >
                    {symbol}
                  </span>
                  <p className="text-white/65 font-sans leading-relaxed pt-1">{t(`pain.${i + 1}`)}</p>
                </motion.div>
              ))}
            </div>
            <MysticDivider symbol="☽" />
            <motion.p variants={fadeUp} className="font-serif text-xl md:text-2xl mt-6" style={metalStyle}>
              {t('pain.conclusion')}
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 3. THE CAUSE ── */}
      <section className="relative py-28">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Tarot-card visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative flex items-center justify-center"
            >
              {/* Outer ornate frame */}
              <div
                className="relative rounded-3xl p-8 flex flex-col items-center"
                style={{
                  width: 280,
                  background: 'linear-gradient(160deg, rgba(30,10,60,0.9) 0%, rgba(10,5,20,0.95) 100%)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  boxShadow: '0 0 60px rgba(96,64,160,0.2), inset 0 0 40px rgba(212,175,55,0.04)',
                }}
              >
                {/* Corner ornaments */}
                {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos) => (
                  <span key={pos} className={`absolute ${pos} text-[#D4AF37]/40 text-xs`}>✦</span>
                ))}
                <p className="text-[#D4AF37]/40 text-xs tracking-widest uppercase font-sans mb-4">{t('cause.card.label')}</p>
                {/* Saturn-like glyph */}
                <svg width="100" height="100" viewBox="0 0 100 100" className="mb-4 opacity-70">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="0.5" strokeDasharray="4 6" />
                  <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="0.8" />
                  {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
                    const rad = (deg - 90) * Math.PI / 180;
                    return (
                      <line key={i}
                        x1={50 + 28 * Math.cos(rad)} y1={50 + 28 * Math.sin(rad)}
                        x2={50 + 40 * Math.cos(rad)} y2={50 + 40 * Math.sin(rad)}
                        stroke="rgba(212,175,55,0.3)" strokeWidth="0.6"
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="3" fill="#D4AF37" opacity="0.7" />
                  <line x1="50" y1="14" x2="50" y2="86" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                  <line x1="14" y1="50" x2="86" y2="50" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                </svg>
                <p className="font-serif text-[#D4AF37] text-base text-center opacity-80">
                  {t('cause.card.text')}
                </p>
                <p className="text-white/30 text-xs font-sans text-center mt-2 tracking-wide">
                  ♈ ♉ ♊ ♋ ♌ ♍
                </p>
              </div>

              {/* Glow behind card */}
              <div className="absolute rounded-3xl pointer-events-none"
                style={{
                  inset: '-20px',
                  background: 'radial-gradient(circle, rgba(96,64,160,0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }} />
            </motion.div>

            {/* Text */}
            <AnimSection>
              <motion.p variants={fadeUp} className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans mb-3">
                {t('cause.tag')}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-6">
                {t('cause.h2')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed mb-6 font-sans">
                {t('cause.p1')}
              </motion.p>
              <motion.p variants={fadeUp} className="font-serif text-xl md:text-2xl" style={metalStyle}>
                {t('cause.p2')}
              </motion.p>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── 4. THE SOLUTION ── */}
      <section className="relative py-28 bg-[#070710]">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <AnimSection className="text-center">
            <motion.p variants={fadeUp} className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans mb-3">
              {t('solution.tag')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-6">
              {t('solution.h2')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed mb-6 font-sans">
              {t('solution.p1')}
            </motion.p>
            <MysticDivider symbol="⊕" />
            <motion.p variants={fadeUp} className="font-serif text-xl mt-6" style={metalStyle}>
              {t('solution.tagline')}
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 5. THE VEHICLE ── */}
      <section className="relative py-28">
        <Aurora />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <AnimSection>
              <motion.p variants={fadeUp} className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans mb-3">
                {t('vehicle.tag')}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-6">
                {t('vehicle.h2')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed mb-4 font-sans">
                {t('vehicle.p1')}
              </motion.p>
              <motion.p variants={fadeUp} className="font-serif text-xl mb-4" style={metalStyle}>
                {t('vehicle.tagline')}
              </motion.p>
              <motion.p variants={fadeUp} className="text-white/35 font-sans text-base italic">
                {t('vehicle.p2')}
              </motion.p>
            </AnimSection>

            {/* Prosperity Tree */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="flex items-center justify-center"
            >
              <ProsperityTree size={360} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. WHAT YOU DISCOVER ── */}
      <section className="relative py-28 bg-[#070710]">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 30% 50%, rgba(96,64,160,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <AnimSection>
            <motion.p variants={fadeUp} className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans text-center mb-3">
              {t('diagnosis.tag')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center mb-12">
              {t('diagnosis.h2')}
            </motion.h2>
            <div className="grid md:grid-cols-5 gap-4 mb-10">
              {LIFE_AREA_KEYS.map(({ symbol, planet, labelKey, descKey }) => (
                <motion.div
                  key={labelKey}
                  variants={fadeUp}
                  className="group rounded-2xl p-6 text-center transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(212,175,55,0.12)',
                  }}
                  whileHover={{
                    background: 'rgba(212,175,55,0.04)',
                    borderColor: 'rgba(212,175,55,0.35)',
                    y: -4,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-serif"
                    style={{
                      background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      color: '#D4AF37',
                    }}
                  >
                    {symbol}
                  </div>
                  <p className="text-[#D4AF37]/40 text-[10px] tracking-widest uppercase font-sans mb-1">{planet}</p>
                  <p className="font-serif text-lg mb-1">{t(labelKey)}</p>
                  <p className="text-white/45 font-sans text-sm leading-snug">{t(descKey)}</p>
                </motion.div>
              ))}
            </div>
            <MysticDivider symbol="✦" />
            <motion.p variants={fadeUp} className="font-serif text-xl text-center mt-6" style={metalStyle}>
              {t('diagnosis.tagline')}
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 7. HOW IT WORKS ── */}
      <section className="relative py-28">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <AnimSection>
            <motion.p variants={fadeUp} className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans text-center mb-3">
              {t('process.tag')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center mb-14">
              {t('process.h2')}
            </motion.h2>
            <div className="grid md:grid-cols-5 gap-6 mb-8">
              {['①','②','③','④','⑤'].map((n, i) => (
                <motion.div key={n} variants={fadeUp} className="text-center relative">
                  {i < 4 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-px"
                      style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.25), rgba(212,175,55,0.05))' }} />
                  )}
                  <div
                    className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl"
                    style={{
                      background: 'rgba(212,175,55,0.07)',
                      border: '1px solid rgba(212,175,55,0.35)',
                      color: '#D4AF37',
                    }}
                  >
                    {n}
                  </div>
                  <p className="text-white/55 font-sans text-sm leading-relaxed">{t(`process.${i + 1}`)}</p>
                </motion.div>
              ))}
            </div>
            <motion.p variants={fadeUp} className="text-center text-white/30 font-sans italic mt-4">
              {t('process.footer')}
            </motion.p>
          </AnimSection>
        </div>
      </section>

      {/* ── 8. TWO OPTIONS ── */}
      <section className="relative py-28 bg-[#070710]">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(96,64,160,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <AnimSection>
            <motion.p variants={fadeUp} className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans text-center mb-3">
              {t('products.tag')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center mb-12">
              {t('products.h2')}
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">

              {/* Crystal Code */}
              <motion.div
                variants={fadeUp}
                className="relative rounded-2xl p-8 flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
                whileHover={{ borderColor: 'rgba(212,175,55,0.4)' }}
              >
                {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos) => (
                  <span key={pos} className={`absolute ${pos} text-[#D4AF37]/25 text-xs`}>✦</span>
                ))}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-2xl font-serif"
                  style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}>
                  🔮
                </div>
                <h3 className="font-serif text-2xl mb-4">Crystal Code</h3>
                <ul className="space-y-3 mb-6 flex-1">
                  {['cc.f1','cc.f2','cc.f3','cc.f4','cc.f5'].map(k => (
                    <li key={k} className="flex items-center gap-3 text-white/60 font-sans text-sm">
                      <span className="text-[#D4AF37]/60 text-xs">✦</span>{t(k)}
                    </li>
                  ))}
                </ul>
                <p className="font-serif text-4xl mb-6" style={metalStyle}>$177 USD</p>
                <Link to="/checkout?product=crystal-code" className="btn-gold w-full text-center">
                  {t('cc.cta')}
                </Link>
              </motion.div>

              {/* Crystal Code Premium */}
              <motion.div
                variants={fadeUp}
                className="relative rounded-2xl p-8 flex flex-col"
                style={{
                  background: 'linear-gradient(160deg, rgba(212,175,55,0.06) 0%, rgba(96,64,160,0.06) 100%)',
                  border: '1px solid rgba(212,175,55,0.35)',
                  boxShadow: '0 0 40px rgba(212,175,55,0.06)',
                }}
                whileHover={{ boxShadow: '0 0 60px rgba(212,175,55,0.12)', borderColor: 'rgba(212,175,55,0.55)' }}
              >
                {/* "Most popular" badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] tracking-widest uppercase font-sans px-4 py-1 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #C9A227, #E6C76A)', color: '#0B0B0B', fontWeight: 600 }}>
                    {t('premium.badge')}
                  </span>
                </div>
                {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos) => (
                  <span key={pos} className={`absolute ${pos} text-[#D4AF37]/40 text-xs`}>✦</span>
                ))}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-2xl font-serif mt-2"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)', color: '#D4AF37' }}>
                  ✨
                </div>
                <h3 className="font-serif text-2xl mb-4">Crystal Code Premium</h3>
                <ul className="space-y-3 mb-6 flex-1">
                  {['premium.f1','premium.f2','premium.f3','premium.f4'].map(k => (
                    <li key={k} className="flex items-center gap-3 text-white/60 font-sans text-sm">
                      <span className="text-[#D4AF37]/60 text-xs">✦</span>{t(k)}
                    </li>
                  ))}
                </ul>
                <p className="font-serif text-4xl mb-6" style={metalStyle}>$217 USD</p>
                <Link to="/checkout?product=crystal-code-premium" className="btn-gold w-full text-center">
                  {t('premium.cta')}
                </Link>
              </motion.div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── 9. GUARANTEE ── */}
      <section className="relative py-28">
        <div className="relative z-10 max-w-xl mx-auto px-6">
          <AnimSection className="text-center">
            <motion.div
              variants={fadeUp}
              className="relative rounded-2xl p-10"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos) => (
                <span key={pos} className={`absolute ${pos} text-[#D4AF37]/30 text-sm`}>✦</span>
              ))}
              <p className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans mb-4">
                {t('guarantee.tag')}
              </p>
              <motion.h2 variants={fadeUp} className="font-serif text-2xl md:text-3xl mb-4">
                {t('guarantee.h2')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/55 font-sans text-lg leading-relaxed">
                {t('guarantee.p')}
              </motion.p>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className="relative py-28 bg-[#070710]">
        <Aurora />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <AnimSection className="text-center">
            <motion.p variants={fadeUp} className="text-[#D4AF37]/50 text-xs tracking-[0.2em] uppercase font-sans mb-3">
              {t('final.tag')}
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl mb-6">
              {t('final.h2')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed mb-10 font-sans">
              {t('final.p')}
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#D4AF37]/30 text-2xl tracking-[0.4em] mb-8 font-sans">
              ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/checkout" className="btn-gold text-base px-14 py-5">
                {t('final.cta')}
              </Link>
            </motion.div>
          </AnimSection>
        </div>
      </section>
    </main>
  );
}
