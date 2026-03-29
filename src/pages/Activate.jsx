import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CrystalSphere from '../components/bits/CrystalSphere.jsx';
import StarField from '../components/bits/StarField.jsx';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function Activate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: code entry, 2: birth data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    activationCode: '',
    name: '',
    email: '',
    password: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleActivate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/activation/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('ac_token', data.token);
      localStorage.setItem('ac_user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Activation failed. Please check your code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B] flex items-center justify-center pt-24">
      <StarField count={60} />
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="text-center mb-10"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <CrystalSphere size={140} />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-serif text-4xl mb-3">
            Activate Your Sphere
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/50">
            Enter the code included with your sphere to create your personal energy profile.
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleActivate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-glass rounded-2xl p-8 space-y-5"
        >
          {/* Activation Code */}
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Activation Code</label>
            <input
              type="text"
              placeholder="AC-XXXX-XXXX"
              value={form.activationCode}
              onChange={(e) => update('activationCode', e.target.value.toUpperCase())}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 font-mono text-center text-lg tracking-widest"
              required
            />
          </div>

          <hr className="border-white/5" />

          {/* Account */}
          <p className="text-white/40 text-xs uppercase tracking-widest">Create your account</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/50 text-xs mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-2">Email *</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-white/50 text-xs mb-2">Password *</label>
            <input
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50"
              required
            />
          </div>

          <hr className="border-white/5" />

          {/* Birth data */}
          <p className="text-white/40 text-xs uppercase tracking-widest">Your birth data</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/50 text-xs mb-2">Birth Date *</label>
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => update('birthDate', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50"
                required
              />
            </div>
            <div>
              <label className="block text-white/50 text-xs mb-2">Birth Time</label>
              <input
                type="time"
                value={form.birthTime}
                onChange={(e) => update('birthTime', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-white/50 text-xs mb-2">Birth Place</label>
            <input
              type="text"
              placeholder="City, Country"
              value={form.birthPlace}
              onChange={(e) => update('birthPlace', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Activating...' : 'Activate My Sphere'}
          </button>
        </motion.form>
      </div>
    </main>
  );
}
