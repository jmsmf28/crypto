import React, { useState, useEffect } from "react";
import {
  fetchConversionRate,
  fetchSupportedCurrencies,
} from "../../services/converterService";
import "./styles.css";

const list = [
  { id: "bitcoin", symbol: "btc" },
  { id: "ethereum", symbol: "eth" },
  { id: "litecoin", symbol: "ltc" },
];

const Converter = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [inputCurrency, setInputCurrency] = useState<string>("btc");
  const [targetCurrency, setTargetCurrency] = useState<string>("eth");
  const [result, setResult] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [conversionHistory, setConversionHistory] = useState<string[]>([]);

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
  }, []);

  const handleConvert = async () => {
    if (inputAmount <= 0 || !inputCurrency || !targetCurrency) return;

    const inputCurrencyId = list.find(
      (coin) => coin.symbol.toLowerCase() === inputCurrency.toLowerCase()
    )?.id;

    if (!inputCurrencyId) {
      console.error("One or both currencies are not supported.");
      setDescription("Error: One or both currencies are not supported.");
      return;
    }

    try {
      const rate = await fetchConversionRate(inputCurrencyId, targetCurrency);
      const convertedAmount = inputAmount * rate;
      setResult(convertedAmount);

      const conversionText = `${convertedAmount.toFixed(
        2
      )} ${targetCurrency.toUpperCase()}`;
      const historyText = `${inputAmount} ${inputCurrency.toUpperCase()} is worth ${convertedAmount.toFixed(
        2
      )} ${targetCurrency.toUpperCase()}`;
      setDescription(conversionText);

      // Update conversion history with the new result
      setConversionHistory((prevHistory) => {
        const newHistory = [historyText, ...prevHistory]; // Add the new conversion at the top
        return newHistory.slice(0, 10); // Limit history to the last 10 results
      });
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  const filteredCurrencies = currencies.filter(
    (currency) => currency !== inputCurrency
  );

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      <h2 className="text-xl font-ubuntu font-bold text-center text-[40px] text-[#21639C] tracking-[0.81px] leading-[56px]">
        Crypto Calculator
      </h2>
      <div className="flex items-center justify-center">
        <div className="grid grid-rows-2 grid-cols-5 p-4 m-6 container">
          {/* First Row */}
          <div className="flex items-end font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-2 ml-4">
            From:
          </div>
          <div className="mb-2"></div>
          <div className="mb-2"></div>
          <div className="flex items-end font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-2 ml-4">
            To:
          </div>
          <div className="mb-2"></div>
          {/* Second Row */}
          <input
            type="number"
            placeholder="Amount"
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] amount ml-4"
            value={inputAmount}
            onChange={(e) => setInputAmount(Number(e.target.value))}
          />
          <select
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] currency ml-4"
            value={inputCurrency}
            onChange={(e) => setInputCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency} className="currency">
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
          <img
            src="assets/arrow-to.png"
            alt="Arrow"
            className="w-[49px] h-[49px] justify-self-center self-center"
          />
          <select
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] currency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {filteredCurrencies.map((currency) => (
              <option key={currency} value={currency} className="currency">
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            className="bg-[#10345C] text-white rounded-md px-4 py-2 hover:bg-blue-600 w-[192px] h-[64px] button"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      </div>

      {/* 

      <div className="flex items-center space-x-4">
 
        <div className="flex flex-col">
          <label className="font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-1">
            From:
          </label>
          <input
            type="number"
            placeholder="Amount"
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] amount"
            value={inputAmount}
            onChange={(e) => setInputAmount(Number(e.target.value))}
          />
        </div>


        <div className="flex flex-col items-center">
          <label className="font-ubuntu font-bold text-[13px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-1 text-gray-100">
            To:
          </label>
          <select
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] currency"
            value={inputCurrency}
            onChange={(e) => setInputCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency} className="currency">
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

  
        <div className="flex flex-col items-center">
          <label className="font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-1 text-gray-100">
            To:
          </label>
          <img
            src="assets/arrow-to.png"
            alt="Arrow"
            className="w-[49px] h-[49px]"
          />
        </div>

    
        <div className="flex flex-col">
          <label className="font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-1">
            To:
          </label>
          <select
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] currency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {filteredCurrencies.map((currency) => (
              <option key={currency} value={currency} className="currency">
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

 
        <div className="flex flex-col">
          <label className="font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-1 text-gray-100">
            To:
          </label>
          <button
            className="bg-[#10345C] text-white rounded-md px-4 py-2 hover:bg-blue-600 w-[192px] h-[64px] button"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      </div> */}

      {/* Result */}
      {result !== null && (
        <div className="text-center">
          <h2 className="font-ubuntu font-bold text-[16px] leading-[24px] text-[#21639C]">
            RESULT
          </h2>
          <div className="mt-6">
            <span className="description">
              {inputAmount} {inputCurrency.toUpperCase()}
            </span>
            <span className="font-ubuntu text-[32px] text-[#454B51] leading-[32px]">
              {" "}
              is worth{" "}
            </span>
            <span className="description">{description}</span>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <ul className="space-y-2 text-center">
          {conversionHistory.map((entry, index) => {
            const [amount, currencyFrom, is, Worth, amount2, currencyTo] =
              entry.split(" ");

            return (
              <div key={index} className="flex justify-center items-center">
                <li>
                  <span className="history">
                    {amount} {currencyFrom}{" "}
                  </span>
                  <span className="font-ubuntu text-[17px] text-[#5F5F5B] leading-[17px]">
                    {is} {Worth}{" "}
                  </span>{" "}
                  <span className="history">
                    {amount2} {currencyTo}
                  </span>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Converter;
