import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PortfolioPage from './pages/PortfolioPage';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PortfolioPage />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
