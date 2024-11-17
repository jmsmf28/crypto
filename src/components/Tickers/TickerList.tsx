import React, { useEffect, useState } from "react";
import { fetchCoinTickers, fetchMarkets } from "../../services/tickerService";
import { fetchSupportedCurrencies } from "../../services/converterService";

const list = [
  { id: "bitcoin", symbol: "btc" },
  { id: "ethereum", symbol: "eth" },
  { id: "litecoin", symbol: "ltc" },
];

const TickerList = () => {
  const [market, setMarket] = useState<string>("binance");
  const [markets, setMarkets] = useState<{ id: string; name: string }[]>([]);
  const [tickers, setTickers] = useState<any[]>([]);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [currency, setCurrency] = useState<string>("btc");

  const handleFetchTickers = async () => {
    try {
      const selectedCurrency = list.find((item) => item.symbol === currency);
      const currencyId = selectedCurrency ? selectedCurrency.id : currency;

      const data = await fetchCoinTickers(currencyId, market);
      console.log("Tickers", tickers);
      setTickers(data);
    } catch (error) {
      console.error("Error fetching tickers:", error);
    }
  };

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const supportedCurrencies = await fetchSupportedCurrencies();
        setCurrencies(supportedCurrencies);
      } catch (error) {
        console.error("Error fetching supported currencies:", error);
      }
    };
    loadCurrencies();

    const loadMarkets = async () => {
      try {
        const fetchedMarkets = await fetchMarkets();
        const simplifiedMarkets = fetchedMarkets.map((m: any) => ({
          id: m.id,
          name: m.name,
        }));
        setMarkets(simplifiedMarkets);
        setMarket(simplifiedMarkets[0]?.id || "");
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    };
    loadMarkets();
  }, []);

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-xl font-ubuntu font-bold text-center text-[40px] text-[#21639C] tracking-[0.81px] leading-[56px]">
        Crypto Tickers
      </h2>
      <div className="flex items-center justify-center">
        <div className="grid grid-rows-2 grid-cols-3 p-4 m-6">
          {/* First Row */}
          <div className="flex items-end font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-2 ml-4">
            Coin:
          </div>
          <div className="flex items-end font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-2 ml-4">
            Market:
          </div>
          <div className="mb-4"></div>
          {/* Second Row */}
          <select
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] ml-4 currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency} className="currency">
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] ml-4 currency"
          >
            {markets.map((market) => (
              <option key={market.id} value={market.id}>
                {market.name}
              </option>
            ))}
          </select>

          <button
            className="bg-[#10345C] text-white rounded-md px-4 py-2 hover:bg-blue-600 w-[192px] h-[64px] ml-4 button"
            onClick={handleFetchTickers}
          >
            Search
          </button>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {tickers.map((ticker, index) => (
          <li key={index} className="border p-2 flex justify-between">
            {/* Left-aligned content */}
            <div className="flex flex-col">
              <div>
                {ticker.base}/{ticker.target}
              </div>
              <div>Last value: {ticker.last}</div>
              <div>Last trade: {ticker.last_traded_at}</div>
            </div>

            {/* Right-aligned content */}
            <div className="flex flex-col text-right">
              <div>Market Volume: {ticker.volume}</div>
              <div>
                Market: {ticker.market.name} (
                <a
                  href={ticker.trade_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View
                </a>
                )
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TickerList;
