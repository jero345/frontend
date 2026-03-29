import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Star, Zap, Clock, Crown } from 'lucide-react';
import StarField from '../components/bits/StarField.jsx';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activation, setActivation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ac_token');
    const stored = localStorage.getItem('ac_user');
    if (!token) { navigate('/activate'); return; }
    if (stored) setUser(JSON.parse(stored));

    fetch('/api/activation/daily', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { setActivation(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('ac_token');
    localStorage.removeItem('ac_user');
    navigate('/');
  };

  const trialDaysLeft = user?.trialEndDate
    ? Math.max(0, Math.ceil((new Date(user.trialEndDate) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-20">
      <StarField count={40} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex items-center justify-between mb-10"
        >
          <motion.div variants={fadeUp}>
            <p className="text-gold text-xs uppercase tracking-widest mb-1">Welcome back</p>
            <h1 className="font-serif text-3xl">{user?.name || user?.email || 'Your Portal'}</h1>
          </motion.div>
          <motion.button variants={fadeUp} onClick={logout} className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
            <LogOut size={16} /> Sign Out
          </motion.button>
        </motion.div>

        {/* Trial banner */}
        {user?.subscriptionStatus === 'trial' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-gold rounded-2xl p-5 mb-8 flex items-center justify-between"
          >
            <div>
              <p className="text-gold font-medium">Discovery Period Active</p>
              <p className="text-white/50 text-sm mt-0.5">{trialDaysLeft} days remaining of your free access</p>
            </div>
            <button className="btn-gold text-sm py-2.5 px-5">
              <Crown size={14} className="inline mr-1" /> Subscribe
            </button>
          </motion.div>
        )}

        {/* Today's activation */}
        {loading ? (
          <div className="text-center py-20 text-white/30">Loading your activation...</div>
        ) : activation ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p variants={fadeUp} className="text-white/40 text-xs uppercase tracking-widest mb-4">
              Today's Activation · {new Date().toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })}
            </motion.p>

            {/* Frequency */}
            <motion.div variants={fadeUp} className="text-center card-glass rounded-3xl p-10 mb-6">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Daily Frequency</p>
              <p className="font-serif text-8xl text-gold mb-2">{activation.frequency}</p>
              <p className="text-white/50">{activation.planetaryInfluence}</p>
              <p className="text-white/70 mt-2">{activation.energyType}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Daily message */}
              <motion.div variants={fadeUp} className="card-glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-gold" />
                  <p className="text-white/40 text-xs uppercase tracking-widest">Message</p>
                </div>
                <p className="text-white/80 leading-relaxed">{activation.dailyMessage}</p>
              </motion.div>

              {/* Ritual */}
              <motion.div variants={fadeUp} className="card-glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={16} className="text-gold" />
                  <p className="text-white/40 text-xs uppercase tracking-widest">Daily Ritual</p>
                </div>
                <p className="text-white/80 leading-relaxed">{activation.ritual}</p>
              </motion.div>
            </div>

            {/* Opportunity windows */}
            {activation.opportunityWindows?.length > 0 && (
              <motion.div variants={fadeUp} className="card-glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-gold" />
                  <p className="text-white/40 text-xs uppercase tracking-widest">Opportunity Windows</p>
                </div>
                <div className="space-y-3">
                  {activation.opportunityWindows.map((w, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-gold font-mono text-sm flex-shrink-0">{w.time}</span>
                      <span className="text-white/70 text-sm">{w.description}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-white/30">No activation available</div>
        )}
      </div>
    </main>
  );
}
