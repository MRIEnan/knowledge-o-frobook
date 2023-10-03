import { FunctionComponent } from "react";

interface ITitlePrimaryProps {
  text?: string;
  classes?: object;
}

const TitlePrimary: FunctionComponent<ITitlePrimaryProps> = ({
  text = "hello",
  classes,
}) => {
  return (
    <div className={`text-5xl font-extrabold text-center m-0 p-4  ${classes}`}>
      <span className="bg-clip-text text-transparent bg-gradient-to-l from-red-500 to-orange-500">
        {text}
      </span>
    </div>
  );
};

export default TitlePrimary;
