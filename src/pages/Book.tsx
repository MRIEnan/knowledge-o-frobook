import AddComment from "@/components/AddComment";
import Reviews from "@/components/Reviews";
import IsLoading from "@/components/shared/IsLoading";
import TitlePrimary from "@/components/shared/TitlePrimary";
import TitleSecondary from "@/components/shared/TitleSecondary";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/hooks";
import { IBook } from "@/types/Book/globalBookType";
import { getCookie } from "@/utils/getCookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Book = () => {
  const [book, setBook] = useState<IBook>({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { _id: userId } = useAppSelector((state) => state.user);
  const [accessId, setAccessId] = useState<string>("");

  const [deleteBook] = useDeleteBookMutation();

  const { data: bookInfoData, isSuccess } = useGetSingleBookQuery(`${id}`, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      if (bookInfoData) {
        setBook(bookInfoData.data);
        const myData: IBook = bookInfoData.data;
        if (myData) {
          if (typeof myData.accessIds._id !== "undefined") {
            setAccessId(myData.accessIds._id);
          }
        }
      } else {
        setBook({});
        setAccessId("");
      }
    }
  }, [isSuccess, bookInfoData]);

  // todo: navigate to edit the book
  const handleEditBook = () => {
    navigate(`/book/edit-book/${id}`);
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

  // todo: delete book
  const handleDeleteBook = (bookData: IBook) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const myAuth = getCookie("accessToken");
      const bookId = bookData._id;

      const options = {
        id: bookId,
        authorization: myAuth,
      };
      deleteBook(options).then((data) => {
        const dataType = Object.keys(data)[0];
        if (dataType === "error") {
          const errorData = Object.entries(data)[0][1]["data"];
          const toastData = {
            title: "delete Book",
            description: errorData.message,
            duration: 3000,
          };
          handleToast(toastData);
        } else {
          const mData = Object.entries(data)[0][1];
          const toastData = {
            title: "delete Book",
            description: mData.message,
            duration: 3000,
          };
          handleToast(toastData);
          navigate("/books");
        }
      });
    }
  };

  if (id == undefined) {
    return <IsLoading />;
  }

  if (!book || (book && !book._id)) {
    return <IsLoading />;
  }
  return (
    <div className="p-4">
      <div className="md:grid pb-2 md:grid-cols-[300px,1fr]">
        <div className="w-[100%]">
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-full object-contain"
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          {/* <div className="text-xl font-bold">{book.title}</div> */}
          <TitlePrimary text={book.title} />
          <div className="flex justify-center align-middle">
            <div
              className={`inline text-[.9rem] bg-white m-2 font-extrabold text-center m-0 px-2 py-1 rounded-lg`}
            >
              <h3 className="bg-clip-text text-transparent bg-gradient-to-l from-red-500 to-orange-500">
                Author{`${book.author!.length > 1 ? " 's :" : " : "}`}
              </h3>
            </div>
            {book.author!.map((aut, index) => (
              // <div key={`aut${index}`}>{aut}</div>
              <TitleSecondary key={`aut${index}`} text={aut} />
            ))}
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="flex justify-between items-center mt-2">
          <div className="text-gray-600 font-bold">
            <span className="text-orange-600 font-bold">Published : </span>
            {book.publicationDate!.replace("/", ".")}
          </div>
          {accessId && String(userId) === String(accessId) && (
            <div>
              <button
                onClick={() => {
                  handleEditBook();
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-3 rounded-lg mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDeleteBook(bookInfoData.data);
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <article className="mt-2 text-gray-800">{book.description}</article>
      </div>
      <AddComment bookId={id} />
      <Reviews id={id} />
    </div>
  );
};
