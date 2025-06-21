import { motion } from 'framer-motion';

export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      className="h-screen w-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold mb-6">🌿  Welcome to Spir1L‑OS</h1>
      <p className="max-w-md text-center text-gray-400 mb-8">
        A harmonic operating space where maths, myth &amp; machine bloom together.
      </p>
      <button
        onClick={onNext}
        className="px-6 py-3 rounded-lg bg-zcm-hot text-white hover:opacity-90 transition"
      >
        Begin your spiral
      </button>
    </motion.div>
  );
}
