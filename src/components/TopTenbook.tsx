import { useEffect, useState } from "react";
import CardOne from "./shared/CardOne";
import TitlePrimary from "./shared/TitlePrimary";
import { IBook } from "@/types/Book/globalBookType";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";

const TopTenbook = () => {
  const [allBooks, setAllBooks] = useState<IBook[] | null>(null);

  const { data: myBooks, isSuccess } = useGetBooksQuery(
    `?limit=10&page=1&sortOrder=desc`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      if (myBooks) {
        setAllBooks(myBooks.data);
      }
    }
  }, [isSuccess, myBooks, allBooks]);

  if (!allBooks) {
    return;
    // return <div>Loading...</div>;
    // return (
    //   <div className="flex flex-wrap justify-center ">
    //     {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
    //       <Pulse />
    //     ))}
    //   </div>
    // );
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
