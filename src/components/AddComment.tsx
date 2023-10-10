import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCookie } from "@/utils/getCookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "./ui/use-toast";
import { addRevId } from "@/redux/features/review/reviewSlice";

interface ISubmitComment {
  review: string;
  rating: number;
}

const AddComment = ({ bookId }: { bookId?: string }) => {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0); // Initialize with 0
  const { userName, _id: userId } = useAppSelector((state) => state.user);
  const { revId } = useAppSelector((state) => state.review);
  const [createReview, { isSuccess, isError }] = useCreateReviewMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userName && revId) {
      dispatch(addRevId(null));
    }
  }, [userName]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Review",
        description: "Review Added Successfully",
        duration: 3000,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Review",
        description:
          "Failed to add review. please wait and try again after a while.",
        duration: 3000,
      });
    }
  }, [isError]);

  const SubmitAddedComment = (comment: ISubmitComment) => {
    const authToken = getCookie("accessToken");
    if (!authToken) return;
    const options = {
      id: bookId,
      authorization: authToken,
      data: comment,
    };

    createReview(options);
  };

  const handleAddComment = () => {
    if (!userId) return; // prevent no user
    if (!bookId) return; // prevent no user
    if (newComment.trim() === "") return; // Prevent empty comments
    // const newCommentObj = {
    //   userId: userId, // Replace with the user's name or username
    //   bookId: bookId, //book id insertion
    //   comment: newComment,
    //   rating: newRating, // Include the rating in the comment object
    // };
    const newCommentObj = {
      review: newComment,
      rating: newRating, // Include the rating in the comment object
    };
    SubmitAddedComment(newCommentObj);
    setNewComment("");
    setNewRating(0); // Reset the rating input after adding a comment
  };

  const handleRequestToAddComment = (id: string) => {
    dispatch(addRevId(id));
    navigate("/login");
  };

  if (!userName) {
    return (
      <div className="mt-4 p-4 border rounded-lg shadow-md overflow-hidden ">
        <div className=" inline px-3 py-1 rounded-md text-orange-500 font-bold mr-3">
          Want to add comment?
        </div>
        <div
          onClick={() => {
            handleRequestToAddComment(bookId!);
          }}
          className="bg-orange-500 inline px-3 py-1 rounded-md text-background font-bold"
        >
          Sign In
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Comment Input */}
      <div className="mt-4 p-4 border rounded-lg shadow-md overflow-hidden">
        <textarea
          rows={4}
          cols={50}
          className="w-full p-2 border rounded-md"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
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
        <button
          //   className="mt-2 px-4 py-2 text-white rounded-md  bg-orange-500 hover:bg-transparent hover:border hover:border-orange-500 hover-border-2 font-bold"
          className="mt-2 px-4 py-2 shadow-insetEnOne rounded-md bg-orange-500 hover:bg-orange-100 text-white font-bold hover:border hover hover:text-orange-500 transition duration-300 focus:shadow-insertEnTwo"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
