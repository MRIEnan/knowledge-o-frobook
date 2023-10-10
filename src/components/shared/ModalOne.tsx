import { FunctionComponent, useEffect, useState } from "react";

interface IModalOne {
  text?: string;
}

const ModalOne: FunctionComponent<IModalOne> = ({
  text = "Please wait while processing",
}) => {
  const [dots, setDots] = useState<string>(".");

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (dots.length >= 3) {
        setDots(".");
      } else {
        setDots(dots + ".");
      }
    }, 2000);
    return () => clearInterval(myInterval);
  }, [dots]);
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute top-0">
      <div className="w-[100%] h-[100%] bg-slate-300 opacity-60 inline-block absolute z-1"></div>
      <div className="w-80% h-80% relative z-1 flex flex-wrap justify-center items-center">
        <div className="text-black inline h-5% w-100% text-center font-bold relative z-2">
          {text}
          {dots}
        </div>
      </div>
    </div>
  );
};

export default ModalOne;
