import Search from "@/components/Search";
import CardOne from "@/components/shared/CardOne";
import TitlePrimary from "@/components/shared/TitlePrimary";
import Paginate from "@/components/shared/paginate/Paginate";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import { IBook } from "@/types/Book/globalBookType";
import React, { useEffect, useRef, useState } from "react";

const addStrings = (refString: string = "", val: string = "") => {
  return refString + val + "&";
};
const generateQueryParams = (args: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  searchTerm?: string;
}) => {
  let myQ: string = "";
  if (args.limit) {
    myQ = addStrings(myQ, `limit=${args.limit}`);
  }
  if (args.page) {
    myQ = addStrings(myQ, `page=${args.page}`);
  }
  if (args.sortBy) {
    myQ = addStrings(myQ, `sortBy=${args.sortBy}`);
  }
  if (args.sortOrder) {
    myQ = addStrings(myQ, `sortOrder=${args.sortOrder}`);
  }
  if (args.searchTerm) {
    myQ = addStrings(myQ, `searchTerm=${args.searchTerm}`);
  }
  return myQ.substring(0, myQ.length - 1);
};

const AllBooks = () => {
  // const [allBooks, setAllBooks] = useState<IBook[] | null>(null);
  // const [pageLimit, setPageLimit] = useState<number>(12);
  const pageLimit = 12;
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const allBookRef = useRef<HTMLDivElement | null>(null);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const qParams = generateQueryParams({
    page: currentPageNo,
    limit: pageLimit,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data: allBooks } = useGetBooksQuery(`?${qParams}`, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (allBookRef && allBookRef.current && isScroll) {
      const data = allBooks;
      const totalPage =
        data.meta.total % data.meta.limit > 0
          ? Math.floor(data.meta.total / data.meta.limit) + 1
          : Math.floor(data.meta.total / data.meta.limit);
      setTotalPage(totalPage);
      const yOffset =
        allBookRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    } else {
      setIsScroll(true);
    }
  }, [allBooks]);

  const handleOnChange = () => {
    if (searchRef.current && searchRef.current.value) {
      setSearchValue(searchRef.current.value);
    } else {
      setSearchValue("");
    }
  };

  if (!allBooks?.data) {
    return;
  }

  return (
    <div ref={allBookRef}>
      <TitlePrimary text={String("All Books")} />
      <Search myRef={searchRef} handleOnChange={handleOnChange} />
      <div className="flex flex-wrap justify-center ">
        {allBooks?.data?.map((book: IBook) => {
          return (
            <CardOne searchTerm={searchValue} key={book._id} id={book._id} />
          );
        })}
      </div>
      {totalPage > 0 && (
        <div>
          {/* Pagination */}
          <div className="">
            <Paginate
              totalPage={totalPage}
              currentPage={currentPageNo}
              setCurrentPageNo={setCurrentPageNo}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
