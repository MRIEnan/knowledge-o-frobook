import { useEffect, useState } from "react";
import CardOne from "./shared/CardOne";
import TitlePrimary from "./shared/TitlePrimary";
import { IBook } from "@/types/Book/globalBookType";
import Pulse from "./tailwindComponents/Pulse";

const TopTenbook = () => {
  const [allBooks, setAllBooks] = useState<IBook[] | null>(null);

  useEffect(() => {
    fetch("./random_book_list.json")
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data.slice(0, 10));
      });
  }, []);

  if (!allBooks) {
    // return <div>Loading...</div>;
    return (
      <div className="flex flex-wrap justify-center ">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
          <Pulse />
        ))}
      </div>
    );
  }

  return (
    <div>
      <TitlePrimary text={String("Top Ten Books")} />
      <div className="flex flex-wrap justify-center ">
        {allBooks?.map((book, index) => {
          return <CardOne key={index} id={book._id} />;
        })}
      </div>
    </div>
  );
};

export default TopTenbook;
