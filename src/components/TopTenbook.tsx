import { useEffect, useState } from "react";
import CardOne from "./shared/CardOne";
import TitlePrimary from "./shared/TitlePrimary";
import { IBook } from "@/types/Book/globalBookType";

const TopTenbook = () => {
  const [allBooks, setAllBooks] = useState<IBook[] | null>(null);

  useEffect(() => {
    fetch("./random_book_list.json")
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data.slice(0, 10));
      });
  }, []);
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
