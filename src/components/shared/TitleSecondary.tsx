import { FunctionComponent } from "react";

interface ITitleSecondaryProps {
  text?: string;
  classes?: object;
}

const TitleSecondary: FunctionComponent<ITitleSecondaryProps> = ({
  text = "Secondary",
  classes,
}) => {
  return (
    <div
      className={`inline text-[.9rem] bg-gradient-to-l from-red-500 to-orange-500 m-2 font-extrabold text-center m-0 px-2 py-1  ${classes} rounded-lg`}
    >
      <span className="bg-clip-text text-background bg-transparent">
        {text}
      </span>
    </div>
  );
};

export default TitleSecondary;
