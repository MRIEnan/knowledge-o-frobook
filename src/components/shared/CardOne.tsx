import { IBook } from "@/types/Book/globalBookType";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { RectangleStackIcon, UserIcon } from "@heroicons/react/24/outline";
import { Badge } from "../ui/badge";

const CardOne = ({ id }: { id?: string }) => {
  const [cardInfo, setCardInfo] = useState<IBook | null>(null);

  useEffect(() => {
    fetch("./random_book_list.json")
      .then((res) => res.json())
      .then((data) => {
        const myData = data.find((item: IBook) => item._id === id);
        setCardInfo(myData);
      });
  }, []);
  if (!cardInfo) {
    return <div>Loading</div>;
  }
  return (
    <Link
      to={`/book/${cardInfo._id}`}
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
            className="h-36 w-full object-cover object-center"
            src={cardInfo.imageLink}
            alt=""
          />
        </div>

        <div>
          <div className="text-ellipsis w-full text-justify text-black-600 font-bold  flex h-auto align-middle mt-2 mb-1">
            <RectangleStackIcon className="inline mr-2 h-6" />
            {cardInfo.title.substring(0, 20)}
          </div>
          <div className=" h-20 w-full text-justify text-black-600">
            <p className="text-ellipsis overflow-hidden break-word">
              {cardInfo.description.substring(0, 100)}
            </p>
          </div>
          <div className="h-6 flex justify-left align-middle ">
            <UserIcon className="h-[20px] mt-[2.5px] mr-[3.5px]" />
            {" author: "}
            {cardInfo.author}
          </div>
        </div>
        <div>
          <Button variant={"enOutline"}>Read more</Button>
          {/* <Link to={`/book/${cardInfo._id}`}>
          </Link> */}
        </div>
      </div>
    </Link>
  );
};

export default CardOne;
