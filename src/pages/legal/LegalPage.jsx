import { motion } from 'framer-motion';

export default function LegalPage({ title, updated, children }) {
  return (
    <main className="min-h-screen bg-[#0B0B0B] pt-24">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-serif text-4xl mb-2">{title}</h1>
          {updated && <p className="text-white/30 text-sm mb-10">Last updated: {updated}</p>}
          <div className="prose-legal space-y-6 text-white/70 leading-relaxed">
            <style>{`
              .prose-legal h2 { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: rgba(255,255,255,0.9); margin-top: 2rem; margin-bottom: 0.5rem; }
              .prose-legal p { margin-bottom: 1rem; }
              .prose-legal ul { list-style: disc; padding-left: 1.5rem; space-y: 0.5rem; }
            `}</style>
            {children}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
