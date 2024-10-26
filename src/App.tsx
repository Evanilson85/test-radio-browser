import { StationsProvider } from '@/context/index';
import { Home } from './pages/Home';

function App() {
  return (
    <StationsProvider>
      <div className="bg-main min-h-dvh">
        <Home />
      </div>
    </StationsProvider>
  );
}

export default App;
