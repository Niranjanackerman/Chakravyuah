import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, ChevronRight, Activity, Brain, ArrowLeft, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const scenarios = [
  {
    id: 'product',
    name: 'Launching a New Product',
    description: 'A new tech product entering a highly competitive market.',
    baseConfidence: 60,
    strategies: [
      { id: 's1', name: 'Aggressive Global Launch', pSuccess: 0.3, reward: 1000000, loss: 500000 },
      { id: 's2', name: 'Targeted Niche Launch', pSuccess: 0.6, reward: 300000, loss: 100000 },
      { id: 's3', name: 'Soft Beta Launch', pSuccess: 0.8, reward: 100000, loss: 20000 }
    ]
  },
  {
    id: 'crisis',
    name: 'Managing a Business Crisis',
    description: 'A severe PR crisis has hit the company. Immediate action is required.',
    baseConfidence: 40,
    strategies: [
      { id: 's1', name: 'Total Denial & Deflection', pSuccess: 0.1, reward: 0, loss: 2000000 },
      { id: 's2', name: 'Partial Apology & Pivot', pSuccess: 0.5, reward: -100000, loss: 500000 },
      { id: 's3', name: 'Full Transparency & Recall', pSuccess: 0.9, reward: -500000, loss: 100000 }
    ]
  },
  {
    id: 'investment',
    name: 'Investment Dilemma',
    description: 'Capital allocation for the next quarter.',
    baseConfidence: 75,
    strategies: [
      { id: 's1', name: 'High-Risk Crypto Venture', pSuccess: 0.2, reward: 5000000, loss: 1000000 },
      { id: 's2', name: 'Balanced Tech Portfolio', pSuccess: 0.6, reward: 800000, loss: 200000 },
      { id: 's3', name: 'Safe Government Bonds', pSuccess: 0.99, reward: 50000, loss: 0 }
    ]
  },
  {
    id: 'battlefield',
    name: 'Battlefield Strategy',
    description: 'A historical fictional battle where the enemy formation is a Chakravyuha.',
    baseConfidence: 30,
    strategies: [
      { id: 's1', name: 'Frontal Assault', pSuccess: 0.15, reward: 1000, loss: 800 },
      { id: 's2', name: 'Flanking Maneuver', pSuccess: 0.45, reward: 600, loss: 300 },
      { id: 's3', name: 'Strategic Withdrawal', pSuccess: 0.85, reward: 0, loss: 50 }
    ]
  }
];

const GateVisual = ({ currentGate }: { currentGate: number }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {[1, 2, 3].map((gate) => (
        <div key={gate} className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-cinematic text-xl transition-all duration-500
            ${currentGate >= gate ? 'border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'border-gray-700 text-gray-700'}`}>
            {gate === 1 ? 'I' : gate === 2 ? 'II' : 'III'}
          </div>
          {gate < 3 && (
            <div className={`w-16 h-px transition-all duration-500 ${currentGate > gate ? 'bg-gold' : 'bg-gray-800'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export const Simulator = ({ onExit }: { onExit: () => void }) => {
  const [gate, setGate] = useState(1);
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const scenario = scenarios.find(s => s.id === scenarioId) || scenarios[0];
  const [customStrats, setCustomStrats] = useState([...scenario.strategies]);
  
  // Update customStrats when scenario changes
  React.useEffect(() => {
    setCustomStrats([...scenario.strategies]);
  }, [scenarioId, scenario]);

  const updateStrategy = (index: number, field: string, value: number) => {
    const newStrats = [...customStrats];
    newStrats[index] = { ...newStrats[index], [field]: value };
    setCustomStrats(newStrats);
  };

  const results = useMemo(() => {
    return customStrats.map(s => {
      const eu = (s.pSuccess * s.reward) - ((1 - s.pSuccess) * s.loss);
      return { ...s, eu };
    });
  }, [customStrats]);

  const bestStrategy = [...results].sort((a, b) => b.eu - a.eu)[0];

  const handleNext = () => {
    if (gate < 3) setGate(gate + 1);
  };

  const handlePrev = () => {
    if (gate > 1) setGate(gate - 1);
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory p-6 flex flex-col relative overflow-hidden">
      {/* Background visual */}
      <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] border border-gold/5 rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] border border-gold/10 rounded-full pointer-events-none" />
      
      <header className="flex justify-between items-center z-10 mb-8 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          <h2 className="text-2xl font-cinematic text-gold tracking-widest uppercase">Chakravyuha</h2>
        </div>
        <div className="text-sm font-cinematic text-gray-400 flex items-center gap-2">
          <Activity className="w-4 h-4" /> Decision Intelligence Matrix
        </div>
      </header>

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col z-10">
        <GateVisual currentGate={gate} />

        <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl p-8 backdrop-blur-sm relative shadow-2xl">
          
          <AnimatePresence mode="wait">
            {gate === 1 && (
              <motion.div 
                key="gate1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-cinematic text-gold mb-4">Gate I: Intelligence</h3>
                  <p className="text-gray-400">Understand the situation, available information and unknowns.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-gold mb-2 font-cinematic">Select Scenario</label>
                    <div className="space-y-3">
                      {scenarios.map(s => (
                        <button
                          key={s.id}
                          onClick={() => setScenarioId(s.id)}
                          className={`w-full text-left p-4 rounded border transition-all duration-300 ${scenarioId === s.id ? 'border-gold bg-gold/10 text-white' : 'border-gray-700 hover:border-gray-500 text-gray-400'}`}
                        >
                          <div className="font-semibold">{s.name}</div>
                          <div className="text-sm mt-1 opacity-80">{s.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-black/40 border border-gray-800 p-6 rounded flex flex-col justify-center items-center text-center">
                    <Shield className="w-16 h-16 text-gold mb-4 opacity-50" />
                    <h4 className="text-xl text-gold mb-2 font-cinematic">Intelligence Report</h4>
                    <p className="text-gray-400 mb-4">Current intelligence suggests a complex environment with multiple variables.</p>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-4">
                      <div className="bg-gold h-full" style={{ width: `${scenario.baseConfidence}%` }} />
                    </div>
                    <div className="text-xs text-gray-500 mt-2 flex justify-between w-full">
                      <span>Unknowns High</span>
                      <span>Confidence: {scenario.baseConfidence}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {gate === 2 && (
              <motion.div 
                key="gate2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-cinematic text-gold mb-4">Gate II: Strategy</h3>
                  <p className="text-gray-400">Evaluate courses of action and customize assumptions.</p>
                </div>

                <div className="space-y-6">
                  {customStrats.map((strat, idx) => (
                    <div key={strat.id} className="bg-black/30 border border-gray-800 p-6 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                      <div className="md:col-span-1">
                        <div className="text-gold font-cinematic mb-1 text-sm">Strategy {idx + 1}</div>
                        <div className="font-semibold">{strat.name}</div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-gray-400 mb-1 flex justify-between">
                          <span>P(Success)</span> <span>{(strat.pSuccess * 100).toFixed(0)}%</span>
                        </label>
                        <input 
                          type="range" min="0" max="1" step="0.01" 
                          value={strat.pSuccess} 
                          onChange={(e) => updateStrategy(idx, 'pSuccess', parseFloat(e.target.value))}
                          className="w-full accent-gold"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-gray-400 mb-1 flex justify-between">
                          <span>Reward</span> <span>{strat.reward.toLocaleString()}</span>
                        </label>
                        <input 
                          type="range" min="-100000" max="10000000" step="50000" 
                          value={strat.reward} 
                          onChange={(e) => updateStrategy(idx, 'reward', parseFloat(e.target.value))}
                          className="w-full accent-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-gray-400 mb-1 flex justify-between">
                          <span>Potential Loss</span> <span>{strat.loss.toLocaleString()}</span>
                        </label>
                        <input 
                          type="range" min="0" max="5000000" step="50000" 
                          value={strat.loss} 
                          onChange={(e) => updateStrategy(idx, 'loss', parseFloat(e.target.value))}
                          className="w-full accent-crimson-bright"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {gate === 3 && (
              <motion.div 
                key="gate3"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8 h-full flex flex-col"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-cinematic text-gold mb-4">Gate III: Consequence</h3>
                  <p className="text-gray-400">Reveal expected outcomes and risk analysis.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 flex-1">
                  
                  <div className="md:col-span-2 bg-black/40 border border-gray-800 p-6 rounded-lg flex flex-col">
                    <h4 className="text-lg font-cinematic text-white mb-6">Expected Utility Comparison</h4>
                    <div className="flex-1 min-h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <XAxis dataKey="name" stroke="#666" tick={{fill: '#999', fontSize: 12}} />
                          <YAxis stroke="#666" tick={{fill: '#999'}} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', color: '#fff' }}
                            formatter={(value) => Number(value ?? 0).toLocaleString()}
                          />
                          <Bar dataKey="eu" name="Expected Utility">
                            {results.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.id === bestStrategy.id ? '#d4af37' : '#4b5563'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-xs text-gray-500 mt-4 text-center">
                      Expected Utility = (P(success) × Reward) − (P(failure) × Potential Loss)
                    </div>
                  </div>

                  {/* AI Strategist Panel */}
                  <div className="bg-gray-900 border border-gold/30 p-6 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full pointer-events-none" />
                    <div className="flex items-center gap-3 mb-6">
                      <Brain className="w-6 h-6 text-gold" />
                      <h4 className="text-xl font-cinematic text-gold">AI Strategist</h4>
                    </div>
                    
                    <div className="space-y-4 text-sm text-gray-300">
                      <p>
                        <strong className="text-white">Recommendation:</strong> The mathematical model favors 
                        <span className="text-gold font-bold ml-1">{bestStrategy.name}</span> with an expected utility of {bestStrategy.eu.toLocaleString()}.
                      </p>
                      
                      <div className="bg-black/50 p-3 rounded border border-gray-800 mt-4">
                        <div className="flex items-center gap-2 text-crimson-bright mb-2">
                          <AlertTriangle className="w-4 h-4" /> <span>Risk Warning</span>
                        </div>
                        <p className="text-xs">
                          While {bestStrategy.name} has the highest expected utility, it carries a potential loss of {bestStrategy.loss.toLocaleString()} with a {( (1 - bestStrategy.pSuccess) * 100).toFixed(0)}% chance of failure. Ensure this loss is acceptable within your constraints.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-800">
                        <p className="text-xs text-gray-500">
                          <strong>Strategic Insight:</strong> The Chakravyuha reminds us that entering a complex situation without a plan for the worst-case scenario (the exit) is fatal. The highest expected value does not mitigate tail risk.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        <div className="flex justify-between mt-8 z-10">
          <button 
            onClick={handlePrev}
            disabled={gate === 1}
            className={`px-6 py-2 rounded font-cinematic flex items-center gap-2 transition-all ${gate === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500'}`}
          >
            <ChevronRight className="w-4 h-4 rotate-180" /> Previous
          </button>

          {gate < 3 ? (
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-gold text-obsidian font-bold font-cinematic rounded shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:bg-gold-light transition-all flex items-center gap-2"
            >
              Enter Gate {gate + 1} <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={() => {
                setCustomStrats([...scenario.strategies]);
                setGate(2);
              }}
              className="px-6 py-2 rounded text-gold border border-gold/50 hover:bg-gold/10 font-cinematic flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Recalculate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
