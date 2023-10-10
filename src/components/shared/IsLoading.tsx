import Pulse from "../tailwindComponents/Pulse";

const IsLoading = ({ single = true }: { single?: boolean }) => {
  if (single) {
    return (
      <div className="flex flex-wrap justify-center ">
        <Pulse />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center ">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
        <Pulse />
      ))}
    </div>
  );
};

export default IsLoading;
