import React, { useState } from 'react';
import CryptoConverterPage from './pages/CryptoConverterPage';
import TickerPage from './pages/TickerPage';
import Header from './components/Header';

const App = () => {
  const [currentPage, setCurrentPage] = useState('converter');

  return (
      <div className="min-h-screen">
        <Header setPage={setCurrentPage} />
        <main className="p-4">
          {currentPage === 'converter' && <CryptoConverterPage />}
          {currentPage === 'tickers' && <TickerPage />}
        </main>
      </div>
  );
};

export default App;
