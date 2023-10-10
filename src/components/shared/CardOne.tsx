import { IBook } from "@/types/Book/globalBookType";
import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { PlusCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { Badge } from "../ui/badge";
import { useGetSingleBookQuery } from "@/redux/features/book/bookApi";
import Pulse from "../tailwindComponents/Pulse";
import { useCreateWishMutation } from "@/redux/features/wishlist/wishlistApi";
import { getCookie } from "@/utils/getCookie";
import { handleToast } from "@/utils/handleToast";
// import Pulse from "../tailwindComponents/Pulse";

const CardOne = ({
  id,
  searchTerm = "",
}: {
  id?: string;
  searchTerm?: string;
}) => {
  const [cardInfo, setCardInfo] = useState<IBook | null>(null);
  const { data: cardInfoData, isSuccess } = useGetSingleBookQuery(`${id}`);
  const [createWish] = useCreateWishMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setCardInfo(cardInfoData.data);
    }
  }, [isSuccess, cardInfoData, searchTerm]);

  if (
    !cardInfo ||
    (cardInfo &&
      (!cardInfo.genre ||
        !cardInfo.title ||
        !cardInfo.description ||
        !cardInfo.author ||
        !cardInfo.genre))
  ) {
    return <Pulse />;
  }

  const handleOnAddWishlist = (
    e: MouseEvent<SVGSVGElement | MouseEvent | HTMLAnchorElement>,
    book: IBook
  ) => {
    e.stopPropagation();
    const myAuth = getCookie("accessToken");
    if (!book._id || !myAuth) {
      return;
    }
    const options = {
      authorization: myAuth,
      data: { bookId: book._id },
    };

    createWish(options).then((data) => {
      const dataType = Object.keys(data)[0];
      if (dataType === "error") {
        const errorData = Object.entries(data)[0][1]["data"];
        const toastData = {
          title: "add Wishlist",
          description: errorData.message,
          duration: 3000,
        };
        handleToast(toastData);
      } else {
        const mData = Object.entries(data)[0][1];
        const toastData = {
          title: "add Wishlist",
          description: mData.message,
          duration: 3000,
        };
        handleToast(toastData);
      }
    });
  };

  const handleOnCardHolderClick = (cardId: string) => {
    navigate(`/book/${cardId}`);
  };

  return (
    <div
      onClick={() => {
        handleOnCardHolderClick(cardInfo._id);
      }}
      className="border-[3px] p-[10px] m-[5px] rounded-lg border-slate-100 xl:w-80   lg:w-80  md:w-80  sm:w-full mx-[10px] my-[10px] relative shadow-1xl hover:shadow-2xl  md:hover:scale-105 hover:border-orange-400 duration:200 duration:300
    transition shadow-inner cursor-pointer inline-block z-0"
    >
      <div className="inline-block w-full h-full absolute bg-grey-100 top-0 left-0 z-10 opacity-20  blur-sm "></div>
      <div className="z-20 relative">
        <div className="h-10 w-full flex flex-row flex-wrap justify-between">
          {/* <div className="text-1xl text-slate-800">
            {cardInfo.genre.substring(0, 15)}
          </div> */}
          <Badge variant="enVar">{cardInfo.genre.substring(0, 20)}</Badge>
          <div className="h-full text-slate-800 flex justify-between align-baseline relative">
            <div className="text-[10px] h-[15px] font-semibold">
              Published :{" "}
            </div>
            <div className=" h-[20px] font-bold">
              {cardInfo.publicationDate}
            </div>
          </div>
        </div>
        <div>
          <img
            className="h-36 w-full object-cover object-center rounded-md"
            src={cardInfo.imageLink}
            alt=""
          />
        </div>

        <div>
          <div className="text-ellipsis w-full text-justify text-black-600 font-bold  flex h-auto align-middle mt-2 mb-1 relative">
            <span className="absolute text-[6px] top-[-8px] left-[6px] text-orange-500">
              Add To Wishlist
            </span>
            <PlusCircleIcon
              onClick={(e) => {
                handleOnAddWishlist(e, cardInfo);
              }}
              className="inline bg-orange-500 rounded-[50%] text-white mr-2 h-6 animate-spin hover:animate-pulse"
            />
            {cardInfo.title.substring(0, 20)}
          </div>
          <div className=" h-20 w-full text-justify text-black-600">
            <p className="text-ellipsis overflow-hidden break-word">
              {cardInfo.description.substring(0, 100)}
            </p>
          </div>
          <div className="h-6 flex justify-left align-middle ">
            <UserIcon
              title={`${cardInfo.author.join(", ")}`}
              className="h-[20px] mt-[2.5px] mr-[3.5px]"
            />
            {" author: "}
            {cardInfo.author[0]}
            {cardInfo.author.length > 1 ? "..." : ""}
          </div>
        </div>
        <div>
          <Button variant={"enOutline"}>Read more</Button>
          {/* <Link to={`/book/${cardInfo._id}`}>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default CardOne;
