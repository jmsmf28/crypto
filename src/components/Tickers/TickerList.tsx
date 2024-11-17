import React, { useEffect, useState } from "react";
import { fetchCoinTickers, fetchMarkets } from "../../services/tickerService";
import { fetchSupportedCurrencies } from "../../services/converterService";
import Selector from "../Selector";
import Title from "../Title";

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
  const [tickersVisible, setTickersVisible] = useState<boolean>(false);

  const handleFetchTickers = async () => {
    try {
      const selectedCurrency = list.find((item) => item.symbol === currency);
      const currencyId = selectedCurrency ? selectedCurrency.id : currency;

      const data = await fetchCoinTickers(currencyId, market);
      setTickers(data);
      setTickersVisible(true);
    } catch (error) {
      console.error("Error fetching tickers:", error);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return new Intl.DateTimeFormat("es-ES", options).format(date);
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
    <div className="p-4 flex flex-col justify-center">
      <Title title={"TICKERS"} />
      <div className="flex items-center justify-center">
        <div className="grid grid-rows-2 grid-cols-3 p-4 m-6">
          {/* First Row */}
          <div className="flex items-end font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.8px] leading-[16px] mb-2 ml-4">
            Coin:
          </div>
          <div className="flex items-end font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.8px] leading-[16px] mb-2 ml-4">
            Market:
          </div>
          <div className="mb-4"></div>
          {/* Second Row */}
          <div className="ml-4">
            <Selector
              value={currency}
              options={currencies}
              onChange={setCurrency}
            />
          </div>
          <div className="ml-4">
            <Selector
              upperCase={false}
              value={market}
              options={markets.map((market) => market.name)}
              onChange={(value) => {
                const selectedMarket = markets.find((m) => m.name === value);
                setMarket(selectedMarket ? selectedMarket.name : "");
              }}
            />
          </div>

          <button
            className="bg-[#10345C] text-white rounded-md px-4 py-2 hover:bg-blue-600 w-[192px] h-[64px] ml-4 button"
            onClick={handleFetchTickers}
          >
            Search
          </button>
        </div>
      </div>
      {tickersVisible && (
        <div className="flex justify-center items-center w-full">
          <ul className="border rounded mt-4 space-y-2 w-[870px] h-[136px] bg-[#FFFFFF]">
            {tickers.map((ticker, index) => (
              <li
                key={index}
                className="flex bg-[#FFFFFF] justify-between mb-[14px] "
              >
                <div className="flex flex-col justify-start">
                  <div className="font-ubuntu font-bold text-[32px] text-[#454B51] leading-[32px] pt-[24px] pb-[16px] pl-[32px]">
                    {ticker.base}/{ticker.target}
                  </div>
                  <div className="flex font-ubuntu font-bold text-[13px] text-[ #4E555B] leading-[16px] pl-[32px] pb-[8px]">
                    Last value:
                    <div className="font-ubuntu font-light text-[13px] text-[#636B71] leading-[16px] ml-1 mr-1">
                      {ticker.last}
                    </div>
                    <div className="text-[#585F66] font-medium">
                      {ticker.target}
                    </div>
                  </div>
                  <div className="flex font-ubuntu font-bold text-[13px] text-[ #4E555B] leading-[16px] pl-[32px] pb-[24px]">
                    Last trade:{" "}
                    <div className="font-ubuntu font-light text-[13px] text-[#636B71] leading-[16px] ml-1">
                      {formatDate(ticker.last_traded_at)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end pr-[32px]">
                  <a
                    href={ticker.trade_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1C4E86] underline text-[13px] leading-[16px] tracking-[0px] mt-[24px] pb-[32px]"
                  >
                    View More
                  </a>
                  <div className="flex font-ubuntu font-bold text-[13px] text-[#4E555B] leading-[16px] pb-[8px]">
                    Market:{" "}
                    <div className="font-ubuntu font-light text-[13px] text-[#636B71] leading-[16px] ml-1">
                      {ticker.market.name}
                    </div>
                  </div>
                  <div className="flex font-ubuntu font-bold text-[13px] text-[#4E555B] leading-[16px] pb-[24px]">
                    Market Volume:{" "}
                    <div className="font-ubuntu font-light text-[13px] text-[#636B71] leading-[16px] ml-1">
                      {ticker.volume}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TickerList;
