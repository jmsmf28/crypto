import React from "react";

interface SelectorProps {
  value: string;
  options: string[];
  upperCase?:boolean
  onChange: (value: string) => void;
}

const Selector: React.FC<SelectorProps> = ({ value, options, upperCase = true, onChange }) => {
  return (
    <select
      className="border rounded-md p-2 w-32 w-[192px] h-[64px] currency"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {upperCase ? option.toUpperCase() : option}
        </option>
      ))}
    </select>
  );
};

export default Selector;
