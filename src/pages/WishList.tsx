import WishCard from "@/components/WishCard";
import Paginate from "@/components/shared/paginate/Paginate";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { IWishlist } from "@/types/Book/globalBookType";
import { getCookie } from "@/utils/getCookie";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

interface IWishListProps {
  isWishListOpen?: boolean;
  setIsWishListOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const addStrings = (refString: string = "", val: string = "") => {
  return refString + val + "&";
};
const generateQueryParams = (args: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
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
  return myQ.substring(0, myQ.length - 1);
};

const Wishlist: React.FC<IWishListProps> = ({
  isWishListOpen,
  setIsWishListOpen,
}) => {
  const [wishes, setWishes] = useState<IWishlist[]>([]);

  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const myLimit = 5;

  const myAuth = getCookie("accessToken");
  const qParamOptions = {
    limit: myLimit,
    page: currentPageNo,
    sortOrder: "desc",
  };

  const queryParams = generateQueryParams(qParamOptions);
  const getWishlistObj = {
    authorization: myAuth,
    queryParams: `${queryParams}`,
  };

  const { data: getWishlist, isSuccess } = useGetWishlistQuery(getWishlistObj, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (getWishlist) {
      setWishes(getWishlist.data);
      const { total, limit } = getWishlist.meta;
      const countDiv = Math.floor(total / limit);
      const countMod = total % limit >= 1 ? 1 : 0;
      const fTotal = countDiv + countMod;
      setTotalPage(fTotal);
    }
  }, [getWishlist, isSuccess]);

  const toggleDrawer = () => {
    if (setIsWishListOpen) {
      setIsWishListOpen(!isWishListOpen);
    }
  };

  return (
    <div className="relative">
      {/* <button
        onClick={toggleDrawer}
        className="bg-blue-500 text-white py-2 px-4 rounded-full fixed right-4 top-4 z-10"
      >
        Open Wishlist
      </button> */}
      {isWishListOpen && (
        <div>
          <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-2 z-10 transition transform duration-200 cursor-pointer">
            <div className="fixed shadow-insetEnTwo w-[88%] border-orange-300 border rounded-lg">
              <div className="text-lg font-semibold mb-4 inline">
                <span onClick={toggleDrawer}>
                  <XMarkIcon className="inline rounded-[50%] text-red-500 mr-2 h-6 top-[-2px] relative" />
                </span>
                Book Wishlist
              </div>
            </div>
            <ul className="fixed relative top-[40px] h-wishList overflow-y-scroll py-[20px]">
              {wishes.map((wish) => (
                <WishCard key={wish._id} wish={wish} />
              ))}
            </ul>
            {totalPage > 0 && (
              <div className="fixed bottom-1 w-full">
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
        </div>
      )}
    </div>
  );
};

export default Wishlist;
