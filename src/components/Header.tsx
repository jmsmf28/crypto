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
      <div className="flex-1 h-full border-b-2 p-7"></div>
      <div className={`inline-flex justify-center`}>
        <button
          className={`font-ubuntu font-bold text-[16px] tracking-normal text-center leading-[24px] p-4 ${selectedPage === 'converter' ? 'border-b-2 border-[#1E5891] text-[#1E5891]' : 'border-b-2 text-[#8A8A86]'}`}
          onClick={() => handlePageChange('converter')}
        >
          CRYPTO CALCULATOR
        </button>
      </div>
      <div className={`inline-flex justify-center`}>
        <button
          className={`font-ubuntu font-bold text-[16px] tracking-normal text-center leading-[24px] p-4 ${selectedPage === 'tickers' ? 'border-b-2 border-[#1E5891] text-[#1E5891]' : 'border-b-2 text-[#8A8A86]'}`}
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
