import { useState } from 'react';
import LandingPage from './LandingPage';
import { Simulator } from './Simulator';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="w-full min-h-screen bg-obsidian">
      {!started ? (
        <LandingPage onEnter={() => setStarted(true)} />
      ) : (
        <Simulator onExit={() => setStarted(false)} />
      )}
    </div>
  );
}

export default App;
