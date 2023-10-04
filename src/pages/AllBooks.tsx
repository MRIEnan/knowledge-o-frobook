import { Search } from "@/components/Search";
import CardOne from "@/components/shared/CardOne";
import TitlePrimary from "@/components/shared/TitlePrimary";
import Pulse from "@/components/tailwindComponents/Pulse";
import { IBook } from "@/types/Book/globalBookType";
import React, { useEffect, useState } from "react";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState<IBook[] | null>(null);

  useEffect(() => {
    fetch("./random_book_list.json")
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
      });
  }, []);
  if (!allBooks) {
    return (
      <div className="flex flex-wrap justify-center ">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Pulse />
        ))}
      </div>
    );
  }

  return (
    <div>
      <TitlePrimary text={String("All Books")} />
      <Search />
      <div className="flex flex-wrap justify-center ">
        {allBooks?.map((book, index) => {
          return <CardOne key={index} id={book._id} />;
        })}
      </div>
    </div>
  );
};

export default AllBooks;
