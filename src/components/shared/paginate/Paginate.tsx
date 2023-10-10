/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./Paginate.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type TPreviousPageButton = "◀";
type TNextPageButton = "▶";

const Paginate: React.FC<{
  totalPage: number;
  currentPage: number;
  setCurrentPageNo: (pageNo: number) => void;
}> = ({ totalPage, currentPage, setCurrentPageNo }) => {
  const [paginateInitPageNo, setPaginateInitPageNo] = useState(1);
  const [paginateEndPageNo, setPaginateEndPageNo] = useState(
    paginateInitPageNo + 3
  );

  useEffect(() => {
    if (currentPage === 1) {
      setPaginateInitPageNo(0);
      setPaginateEndPageNo(3);
      return;
    } else if (currentPage === totalPage) {
      setPaginateInitPageNo(totalPage - 3);
      setPaginateEndPageNo(totalPage);
    } else {
      setPaginateInitPageNo(currentPage - 2);
      setPaginateEndPageNo(currentPage + 1);
    }
  }, [currentPage, totalPage]);

  const newTotalArray: number[] = Array.from(
    { length: totalPage },
    (v: number = 1, k: number = 0) => k + v
  );

  const totalArray: (number | TPreviousPageButton | TNextPageButton)[] =
    newTotalArray.slice(paginateInitPageNo, paginateEndPageNo);

  if (currentPage > 1) {
    totalArray.unshift("◀");
  }

  if (currentPage < totalPage) {
    totalArray.push("▶");
  }

  const handlePageNo = (pageNo: number | "◀" | "▶") => {
    if (pageNo === currentPage) {
      return;
    }
    if (pageNo === "◀") {
      setCurrentPageNo(currentPage - 1);
    } else if (pageNo === "▶") {
      setCurrentPageNo(currentPage + 1);
    } else {
      setCurrentPageNo(pageNo);
    }
  };

  return (
    <div>
      <div className="paginate-main-container">
        {totalArray.map((tot: any) => {
          if (!["▶", "◀"].includes(tot)) {
            return (
              <div
                key={tot}
                onClick={() => handlePageNo(tot)}
                className={
                  tot === currentPage
                    ? `paginate-single-current-page-container`
                    : `paginate-single-page-container`
                }
              >
                <p>{tot}</p>
              </div>
            );
          } else if (["◀"].includes(tot)) {
            return (
              <div
                key={tot}
                onClick={() => handlePageNo(tot)}
                className={
                  tot === currentPage
                    ? `paginate-single-current-page-container`
                    : `paginate-single-page-container`
                }
              >
                <ArrowLeftIcon width={15} />
              </div>
            );
          } else if (["▶"].includes(tot)) {
            return (
              <div
                key={tot}
                onClick={() => handlePageNo(tot)}
                className={
                  tot === currentPage
                    ? `paginate-single-current-page-container`
                    : `paginate-single-page-container`
                }
              >
                <ArrowRightIcon width={15} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Paginate;
