import React, { useState, useEffect } from "react";
import {
  fetchConversionRate,
  fetchSupportedCurrencies,
} from "../../services/converterService";
import "./styles.css";
import Selector from "../Selector";
import Title from "../Title";

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

      setConversionHistory((prevHistory) => {
        const newHistory = [historyText, ...prevHistory]; 
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
      <Title title={" CRYPTO CALCULATOR"} />
      <div className="flex items-center justify-center">
        <div className="grid grid-rows-2 grid-cols-5" style={{ gridTemplateColumns: "208px 208px 69px 208px 208px" }}>
          {/* First Row */}
          <div className="flex items-end font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-2 mr-4">
            From:
          </div>
          <div className="mb-2"></div>
          <div className="mb-2"></div>
          <div className="flex items-end font-ubuntu font-bold text-[16px] text-[#256EA6] tracking-[0.81px] leading-[16px] mb-2 mr-4">
            To:
          </div>
          <div className="mb-2"></div>
          {/* Second Row */}
          <input
            type="number"
            placeholder="Amount"
            className="border rounded-md p-2 w-32 w-[192px] h-[64px] amount mr-4"
            value={inputAmount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setInputAmount(Number(value)); 
              }
            }}
          />

          <Selector
            value={inputCurrency}
            options={currencies.filter((cur) => cur !== targetCurrency)}
            onChange={setInputCurrency}
          />

          <img
            src="assets/arrow-to.png"
            alt="Arrow"
            className="w-[49px] h-[49px] justify-self-center self-center"
          />

          <Selector
            value={targetCurrency}
            options={currencies.filter((cur) => cur !== inputCurrency)}
            onChange={setTargetCurrency}
          />

          <button
            className="bg-[#10345C] text-white rounded-md px-4 py-2 hover:bg-blue-600 w-[192px] h-[64px] button"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      </div>

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
