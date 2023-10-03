import { Search } from "@/components/Search";
import CardOne from "@/components/shared/CardOne";
import TitlePrimary from "@/components/shared/TitlePrimary";
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
