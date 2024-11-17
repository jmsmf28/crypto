import React, { useState } from 'react';

interface HeaderProps {
  setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const [selectedPage, setSelectedPage] = useState<string>('converter');

  const handlePageChange = (page: string) => {
    setPage(page);
    setSelectedPage(page);
  };

  return (
    <div className="flex justify-between items-center text-white p-4 leading-[64px]">
      {/* First div - Empty or containing logo or other content */}
      <div className="flex-1 h-full border-b-2 p-7"></div>

      {/* Second div - Contains the first button, with width based on the button */}
      <div className={`inline-flex justify-center`}>
        <button
          className={`font-ubuntu font-bold text-[16px] text-[#1E5891] tracking-normal text-center leading-[24px] p-4 ${selectedPage === 'converter' ? 'border-b-2 border-[#1E5891]' : 'border-b-2'}`}
          onClick={() => handlePageChange('converter')}
        >
          CRYPTO CALCULATOR
        </button>
      </div>

      {/* Third div - Contains the second button, with width based on the button */}
      <div className={`inline-flex justify-center`}>
        <button
          className={`font-ubuntu font-bold text-[16px] text-[#1E5891] tracking-normal text-center leading-[24px] p-4 ${selectedPage === 'tickers' ? 'border-b-2 border-[#1E5891]' : 'border-b-2'}`}
          onClick={() => handlePageChange('tickers')}
        >
          TICKERS
        </button>
      </div>

      {/* Fourth div - Empty or containing other content */}
      <div className="flex-1 h-full border-b-2 p-7 "></div>
    </div>
  );
};

export default Header;
