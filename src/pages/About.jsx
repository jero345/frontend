import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StarField from '../components/bits/StarField.jsx';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const metalStyle = {
  background: 'linear-gradient(180deg, #E6C76A 0%, #D4AF37 40%, #C9A227 70%, #E6C76A 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

function Block({ title, body, bold, extra }) {
  return (
    <motion.div variants={fadeUp} className="mb-16">
      <h2 className="font-serif text-2xl md:text-3xl mb-4">{title}</h2>
      {Array.isArray(body) ? (
        body.map((p, i) => (
          <p key={i} className="text-white/60 font-sans text-lg leading-relaxed mb-3">{p}</p>
        ))
      ) : (
        <p className="text-white/60 font-sans text-lg leading-relaxed mb-4">{body}</p>
      )}
      {bold && (
        <p className="font-serif text-xl" style={metalStyle}>{bold}</p>
      )}
      {extra && (
        <p className="text-white/60 font-sans text-lg leading-relaxed mt-3">{extra}</p>
      )}
    </motion.div>
  );
}

export default function About() {
  return (
    <main className="relative min-h-screen bg-[#0B0B0B] pt-24 pb-20">
      <StarField count={40} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
        >
          <motion.p variants={fadeUp} className="text-gold text-xs uppercase tracking-[0.3em] mb-4 font-sans">About</motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-6xl mb-16 leading-tight">
            Abundance Code
          </motion.h1>

          <Block
            title="We saw a problem no one was solving"
            body="Millions of women doing everything right — working, growing, trying — and still feeling stuck. Without understanding why."
            bold="That unanswered question was the origin of Abundance Code."
          />

          <Block
            title="The problem wasn't lack of effort"
            body="It was that no tool reached the real root. Therapy helps. Courses teach. Routines improve. But the underlying pattern — the one encoded since birth — remained untouched."
            bold="No one was looking there."
          />

          <Block
            title="We combined two worlds that had never been united like this"
            body={[
              "Astrological interpretation has existed for centuries. Artificial intelligence has existed for decades. But no one had combined them to create something truly useful and accessible for real life.",
              "That's exactly what we did.",
            ]}
            bold="A personal, clear diagnosis based on your birth chart — delivered in a unique object you've never seen before."
          />

          <Block
            title="Our mission is simple"
            body="We believe every person was born with a unique pattern. And that understanding it is the first real step toward change. Not motivation. Not effort. Understanding."
            bold="Abundance Code exists to make that possible."
          />

          <Block
            title="We could have created just an app"
            body={[
              "But we know that real change needs physical anchors. An object in your space. That reminds you. That connects what you understood with what you live every day.",
              "That's why the analysis doesn't arrive in an email. It arrives engraved in crystal.",
            ]}
            bold="Because what changes your life deserves a place in it."
          />

          {/* Commitments */}
          <motion.div variants={fadeUp} className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl mb-6">What we commit to giving you</h2>
            <ul className="space-y-3 mb-6">
              {[
                'An honest, personalized analysis, not generic content.',
                'A premium quality object built to last.',
                'A portal available for life.',
                'Real support when you need it.',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-white/60 font-sans leading-relaxed">
                  <span className="text-gold mt-1 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-serif text-xl" style={metalStyle}>
              Your trust is the most important thing we can receive.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="text-center card-gold rounded-2xl p-10">
            <p className="font-serif text-2xl mb-2">If you made it here, something resonated</p>
            <p className="text-white/50 font-sans mb-8">That's not random.</p>
            <Link to="/checkout" className="btn-gold text-base px-10 py-4">
              Discover My Crystal Code
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
