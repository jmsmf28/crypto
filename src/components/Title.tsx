import React from "react";

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = (props) => {
  return (
    <h2 className="font-ubuntu font-bold text-center text-[40px] text-[#21639C] tracking-[0.8px] leading-[56px]">
      {props.title}
    </h2>
  );
};

export default Title;
