import {
  useDeleteWishMutation,
  useUpdateWishMutation,
} from "@/redux/features/wishlist/wishlistApi";
import { IWishlist } from "@/types/Book/globalBookType";
import { getCookie } from "@/utils/getCookie";
import { handleToast } from "@/utils/handleToast";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WishCard = ({ wish }: { wish: IWishlist }) => {
  console.log(wish);
  const [myStaticStatus, setMyStaticStatus] = useState<string>("");
  const [myStatus, setMyStatus] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  const [updateWish] = useUpdateWishMutation();
  const [deleteWish] = useDeleteWishMutation();

  useEffect(() => {
    if (wish && wish.status !== undefined) {
      setMyStaticStatus(wish.status);
      setMyStatus(wish.status);
    }
  }, [wish]);

  //   todo: handle the editing opts change
  const handleIsEditing = (type: string = "update") => {
    if (type === "cancel") {
      setMyStatus(myStaticStatus);
      setIsEditing(false);
      return;
    }
    if (type === "delete") {
      if (confirm("Are you sure you want to delete?")) {
        setMyStatus(myStaticStatus);
        setIsEditing(false);
        handleDeleteWish();
        return;
      }
      return;
    }
    handleUpdateWish();
  };

  //   todo: delete wish handler
  const handleDeleteWish = () => {
    const myAuth = getCookie("accessToken");
    if (!myAuth || !wish._id) {
      return;
    }
    const options = {
      id: wish._id,
      authorization: myAuth,
    };
    deleteWish(options).then((data) => {
      const dataType = Object.keys(data)[0];
      if (dataType === "error") {
        const errorData = Object.entries(data)[0][1]["data"];
        const toastData = {
          title: "delete Wish",
          description: errorData.message,
          duration: 3000,
        };
        handleToast(toastData);
      } else {
        const mData = Object.entries(data)[0][1];
        const toastData = {
          title: "delete Wish",
          description: mData.message,
          duration: 3000,
        };
        handleToast(toastData);
        setIsEditing(false);
      }
    });
  };

  //   todo: wish card click handler
  const handleWishCardClick = (wish: IWishlist) => {
    if (isEditing) {
      return;
    }
    navigate(`book/${wish.bookId._id}`);
  };
  //   todo: update wish handler
  const handleUpdateWish = () => {
    const myAuth = getCookie("accessToken");
    if (!wish._id || !myStatus || !myAuth) {
      handleToast({
        title: "error",
        description: "something went wrong! Please try again",
        duration: 3000,
      });
      return;
    }
    if (myStaticStatus == myStatus) {
      handleToast({
        title: "Already there",
        description: "You have already set this as the status. Thanks.",
        duration: 3000,
      });
      setIsEditing(false);
      return;
    }
    setMyStaticStatus(myStatus);
    const data = {
      status: myStatus,
      _id: wish._id,
    };
    const updateOptions = {
      authorization: myAuth,
      data: data,
    };

    updateWish(updateOptions).then((data) => {
      const dataType = Object.keys(data)[0];
      if (dataType === "error") {
        const errorData = Object.entries(data)[0][1]["data"];
        const toastData = {
          title: "Update wishlist",
          description: errorData.message,
          duration: 3000,
        };
        handleToast(toastData);
      } else {
        const mData = Object.entries(data)[0][1];
        const toastData = {
          title: "Update wishlist",
          description: mData.message,
          duration: 3000,
        };
        handleToast(toastData);
        setIsEditing(false);
      }
    });
  };

  if (!wish) {
    return;
  }

  return (
    <li
      onClick={() => handleWishCardClick(wish)}
      key={wish._id}
      className="mb-4 py-1 my-2 border border-white hover:border-orange-500 rounded-lg bg-white shadow-insetEnOne hover:shadow-insetEnTwo w-[90%] m-auto p-2 grid grid-cols-[60px_1fr] gap-1 relative transition duration-400 bg-[#eeeeee]"
    >
      {!isEditing && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="absolute top-[-4px] left-[-4px] bg-white w-6 h-6 rounded-[50%] flex justify-center border-black border hover:border-orange-500 transition duration-400"
        >
          <PencilSquareIcon className="inline h-4 top-[4px] relative" />
        </div>
      )}
      {isEditing && (
        <div
          onClick={() => handleIsEditing("update")}
          className="absolute top-[1px] left-[-4px] bg-white w-6 h-6 rounded-md flex justify-center border-black border hover:border-orange-500 transition duration-400 hover:bg-green-500"
        >
          <CheckIcon className="inline h-full relative outline-green-400 stroke-[2px] stroke-green-500 hover:stroke-white transition duration-400 " />
        </div>
      )}
      {isEditing && (
        <div
          onClick={() => handleIsEditing("cancel")}
          className="absolute top-[25px] left-[-4px] bg-white w-6 h-6 rounded-md flex justify-center border-black border hover:border-orange-500 transition duration-400 hover:bg-red-500 overflow-hidden"
        >
          <XMarkIcon className="inline h-full relative stroke-[3px] stroke-orange-500 hover:stroke-white transition duration-400" />
        </div>
      )}

      {isEditing && (
        <div
          onClick={() => handleIsEditing("delete")}
          className="absolute top-[48px] left-[-4px] bg-white w-6 h-6 rounded-md flex justify-center border-black border hover:border-orange-500 transition duration-400 hover:bg-red-500"
        >
          <TrashIcon className="inline h-full relative outline-green-400 stroke-[2px] stroke-red-600 hover:stroke-white transition duration-400" />
        </div>
      )}
      <div className="h-100 w-100 ">
        <img
          className="object-cover object-center h-[100%] w-100"
          src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
        />
      </div>
      <div>
        <div>
          <strong>{wish?.bookId?.title}</strong>
        </div>
        <div>
          {isEditing && (
            <select
              value={myStatus}
              onChange={(e) => setMyStatus(e.target.value)}
              className="mt-2 px-2 py-1 border rounded "
            >
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
              <option value="GoingToRead">Going to Read</option>
            </select>
          )}
          {!isEditing && (
            <div className="mt-2 px-2 py-1 border rounded bg-white ">
              {myStatus}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default WishCard;
