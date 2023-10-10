import { IReview } from "@/types/Book/globalBookType";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import IsLoading from "./shared/IsLoading";
import Paginate from "./shared/paginate/Paginate";
import {
  useDeleteReviewMutation,
  useGetReviewQuery,
  useUpdateReviewMutation,
} from "@/redux/features/review/reviewApi";
import { useAppSelector } from "@/redux/hooks";
import { getCookie } from "@/utils/getCookie";
import { toast } from "./ui/use-toast";

interface IReviewsProps {
  id: string;
}

const Reviews: FunctionComponent<IReviewsProps> = ({ id }) => {
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  // const [reviews, setReviews] = useState<IReview[]>();
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const { _id: uId } = useAppSelector((state) => state.user);

  const [updateId, setUpdateId] = useState<string | undefined>("");
  const [newRating, setNewRating] = useState(0);
  const [updatedComment, setUpdatedComment] = useState<string>("");

  const reviewRef = useRef<HTMLDivElement | null>(null);

  const { data: reviews, isFetching } = useGetReviewQuery(
    { id, pageNumber: currentPageNo },
    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview] = useUpdateReviewMutation();

  const handlePagePosition = () => {
    if (reviewRef.current && isScroll) {
      const yOffset =
        reviewRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isScroll) {
      handlePagePosition();
    } else {
      setIsScroll(true);
    }
  }, [currentPageNo]);

  useEffect(() => {
    const data = reviews;
    if (!reviews) {
      // setReviews([])
    } else {
      const totalPage =
        data.meta.total % data.meta.limit > 0
          ? Math.floor(data.meta.total / data.meta.limit) + 1
          : Math.floor(data.meta.total / data.meta.limit);

      setTotalPage(totalPage);
    }
  }, [reviews, isFetching, currentPageNo]);

  // todo: enable editing feature
  const handleEditReview = (review: IReview) => {
    const revId = review._id;
    setUpdateId(revId);
    setUpdatedComment(review.review);
    setNewRating(review.rating);
  };

  // todo: disable editing feature
  const handleCancelEditReview = () => {
    setUpdateId("");
    setUpdatedComment("");
    setNewRating(0);
  };

  // todo: show notification
  const handleToast = ({
    title = "title",
    description = "description",
    duration = 3000,
  }: {
    title?: string;
    description?: string;
    duration?: number;
  }) => {
    toast({
      duration: duration,
      description: description,
      title: title,
    });
  };

  //  todo: update review
  const handleUpdateReview = () => {
    const myAuth = getCookie("accessToken");

    const options = {
      id: updateId,
      authorization: myAuth,
      data: {
        review: updatedComment,
        rating: newRating,
      },
    };
    updateReview(options)
      .then((data) => {
        const dataType = Object.keys(data)[0];
        if (dataType === "error") {
          const errorData = Object.entries(data)[0][1]["data"];
          const toastData = {
            title: "update Review",
            description: errorData.message,
            duration: 3000,
          };
          handleToast(toastData);
        } else {
          const mData = Object.entries(data)[0][1];
          const toastData = {
            title: "update Review",
            description: mData.message,
            duration: 3000,
          };
          handleToast(toastData);
        }
      })
      .then(() => {
        handleCancelEditReview();
      });
  };

  // todo: delete review
  const handleDeleteReview = (review: IReview) => {
    if (!confirm("Are you sure you want to delete")) {
      return;
    } else {
      const myAuth = getCookie("accessToken");
      const options = {
        id: review._id,
        authorization: myAuth,
      };
      deleteReview(options).then((data) => {
        const dataType = Object.keys(data)[0];
        if (dataType === "error") {
          const errorData = Object.entries(data)[0][1]["data"];
          const toastData = {
            title: "delete Review",
            description: errorData.message,
            duration: 3000,
          };
          handleToast(toastData);
        } else {
          const mData = Object.entries(data)[0][1];
          const toastData = {
            title: "delete Review",
            description: mData.message,
            duration: 3000,
          };
          handleToast(toastData);
        }
      });
    }
  };

  if (!reviews) {
    return <IsLoading />;
  }

  return (
    <div ref={reviewRef}>
      <div>
        {(reviews.data as IReview[]).map((review) => (
          <div
            key={review._id}
            className="mt-4 p-4 border rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-400 capitalize text-white flex items-center justify-center rounded-full">
                  {review?.userId?.userName?.charAt(0)}
                </div>
                <div className="ml-2 text-gray-800 font-semibold">
                  {review?.userId?.userName}
                </div>
              </div>
              {uId == review?.userId._id && updateId == "" && (
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEditReview(review)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteReview(review)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="text-gray-600 ">
              {updateId != review._id && (
                <div className="text-gray-600">Rating: {review.rating}</div>
              )}
              {updateId == review._id && (
                <div className="mt-2">
                  <label className="mr-2">Rating:</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(parseInt(e.target.value))}
                  >
                    <option value={0}>No Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              )}
            </div>
            <textarea
              disabled={updateId != review._id}
              className={`w-full text-gray-700 mt-2  ${
                updateId == review._id
                  ? "p-2 border rounded-md"
                  : "border-white"
              }`}
              onChange={(e) => setUpdatedComment(e.target.value)}
              value={updateId == review._id ? updatedComment : review.review}
            />
            <div className="text-gray-400 mt-2">
              {updateId != review._id &&
                new Date(review.createdAt).toLocaleDateString()}
              {updateId == review._id && (
                <div>
                  <button
                    //   className="mt-2 px-4 py-2 text-white rounded-md  bg-orange-500 hover:bg-transparent hover:border hover:border-orange-500 hover-border-2 font-bold"
                    className="mt-2 px-4 py-2 shadow-insetEnOne rounded-md bg-orange-500 hover:bg-orange-100 text-white font-bold hover:border hover hover:text-orange-500 transition duration-300 focus:shadow-insertEnTwo mr-3"
                    onClick={() => handleUpdateReview()}
                  >
                    Add Comment
                  </button>
                  <button
                    //   className="mt-2 px-4 py-2 text-white rounded-md  bg-orange-500 hover:bg-transparent hover:border hover:border-orange-500 hover-border-2 font-bold"
                    className="mt-2 px-4 py-2 shadow-insetEnOne rounded-md bg-red-500 hover:bg-red-100 text-white font-bold hover:border hover hover:text-red-500 transition duration-300 focus:shadow-insertEnTwo"
                    onClick={() => setUpdateId("")}
                  >
                    cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
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

export default Reviews;
