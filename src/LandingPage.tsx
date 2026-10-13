import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const LandingPage = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-obsidian">
      {/* Background Mandala Effect */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <motion.div 
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border border-gold rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full border border-gold/50 rounded-full scale-75 border-dashed" />
          <div className="w-full h-full border border-gold/30 rounded-full scale-50" />
        </motion.div>
      </div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <motion.h1 
          className="text-5xl md:text-7xl font-cinematic text-gold mb-6 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Chakravyuha
        </motion.h1>
        <motion.div 
          className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.p 
          className="text-xl md:text-2xl text-ivory/80 font-cinematic mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Ancient strategic inspiration. Modern decision intelligence.
        </motion.p>
        <motion.p 
          className="text-3xl md:text-4xl text-white font-bold my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Every Decision Is a Battle Against Uncertainty.
        </motion.p>
        <motion.p 
          className="text-lg md:text-xl text-ivory/60 mb-12 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Explore possible outcomes, evaluate risk and discover which strategy makes the most sense when information is incomplete.
        </motion.p>

        <motion.button
          onClick={onEnter}
          className="group relative px-8 py-4 bg-transparent border border-gold text-gold font-cinematic text-lg tracking-wider overflow-hidden hover:text-obsidian transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10 flex items-center gap-2">
            Enter the Chakravyuha <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>

        <motion.div 
          className="mt-24 text-sm text-ivory/40 max-w-xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          Inspired by the Mahabharata. The Chakravyuha represents a multi-tiered defensive formation. 
          Here, it serves as a metaphor for navigating complex, layered challenges with incomplete information.
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
