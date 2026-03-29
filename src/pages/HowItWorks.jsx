import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StarField from '../components/bits/StarField.jsx';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const steps = [
  { n: '01', title: 'Receive Your Sphere', desc: 'Your Abundance Code kit arrives. Inside: a K9 crystal sphere with a unique QR code, and your activation instructions.' },
  { n: '02', title: 'Scan the Code', desc: 'Point your smartphone camera at the QR code on your sphere. No app needed — it opens directly in your browser.' },
  { n: '03', title: 'Create Your Energy Profile', desc: 'Enter your name, date of birth, time and place. This is your key. The system uses this data to generate your personal code.' },
  { n: '04', title: 'Access Your Portal', desc: 'Your portal unlocks immediately. Your first activation is ready.' },
  { n: '05', title: 'Receive Daily Activations', desc: 'Every day you receive a personalized signal based on your natal chart and the current planetary cycles. Clarity. Decisions. Expansion.' },
];

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-24">
      <StarField count={50} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-gold text-xs uppercase tracking-[0.3em] mb-4">The Process</motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl mb-4">How It Works</motion.h1>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-xl mx-auto">
            Five steps. From the moment you receive your sphere to the moment you access your personal code.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent hidden md:block" />
          <div className="space-y-10">
            {steps.map(({ n, title, desc }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 md:pl-0"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gold/40 bg-gold/5 flex items-center justify-center text-gold font-serif text-lg">
                  {n}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-serif text-xl mb-2">{title}</h3>
                  <p className="text-white/60 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/abundance-code-sphere" className="btn-gold text-base">
            Get Your Sphere — $125 USD
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
