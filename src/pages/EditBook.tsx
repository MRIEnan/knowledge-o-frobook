import ModalOne from "@/components/shared/ModalOne";
import { toast } from "@/components/ui/use-toast";
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/hooks";
import { IBook } from "@/types/Book/globalBookType";
import { getCookie } from "@/utils/getCookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialBookState: Partial<IBook> = {
  accessIds: "",
  imageLink: "",
  title: "",
  description: "",
  author: [],
  genre: "",
};

const EditBook: React.FC = () => {
  const [newBook, setNewBook] = useState<Partial<IBook>>(initialBookState);

  const { id } = useParams();
  const [authors, setAuthors] = useState<string>("");
  const { _id: uId } = useAppSelector((state) => state.user);
  const [bookUserId, setBookUserId] = useState<string>("");

  const { data: bookInfoData, isSuccess: bookInfoSuccess } =
    useGetSingleBookQuery(`${id}`);
  const [editBook, { isLoading, isError, isSuccess }] = useEditBookMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookInfoData) {
      setBookUserId(String(bookInfoData.data.accessIds._id));
      if (!uId || (bookInfoData && uId != bookInfoData.data.accessIds._id)) {
        navigate("/");
        return;
      }
    }
  }, [uId, bookInfoData, bookUserId]);

  useEffect(() => {
    if (isError) {
      toast({
        duration: 3000,
        description: "Book update Failed, please wait while and try again",
        title: "Book Update Failed",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (bookInfoSuccess) {
      if (bookInfoData) {
        const myBookAuthor = bookInfoData.data.author.join(",");
        setAuthors(myBookAuthor);
        setNewBook({ ...bookInfoData.data, author: myBookAuthor });
      }
    }
  }, [bookInfoSuccess, bookInfoData]);

  const handleNavigate = () => {
    navigate(`/book/${id}`);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        duration: 3000,
        description: "Book updated successfully",
        title: "Book Added",
      });
      handleNavigate();
    }
  }, [isSuccess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.keys(newBook).length) {
      return;
    }
    const allBookInfo = { ...newBook };
    if (!uId) {
      return;
    }
    if (!authors) {
      return;
    } else {
      allBookInfo.author = [...authors.split(",")];
    }
    allBookInfo["accessIds"] = uId;
    // allBookInfo["publicationDate"] = createPublicationDate(new Date());
    // allBookInfo["publicationDate"] = createPublicationDate(new Date());

    const myAuth = getCookie("accessToken");
    const options = {
      id: id,
      data: allBookInfo,
      authorization: myAuth,
    };
    editBook(options);
  };
  return (
    <>
      {isLoading && <ModalOne text={"Please wait. Adding the book"} />}
      <form
        onSubmit={(e) => handleUpdateBook(e)}
        className="bg-blue-100 my-2 mx-auto sm:w-full md:w-enW80 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-2">Add Book</h2>
        <div className="md:flex justify-between">
          <div className="mb-2 sm:w-full md:w-enW80">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBook.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 shadow-insetEnOne"
              required
            />
          </div>
          <div className="mb-2 sm:w-full md:w-enW80">
            <label
              title="to insert multiple author"
              htmlFor="author"
              className="block text-gray-700 font-semibold"
            >
              Author {` : `}
              <span className="text-[10px]">{`(use '`}</span>
              <span className="font-bold text-[20px]">{`,`}</span>
              <span className="text-[10px]">{`')`}</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 shadow-insetEnOne"
              required
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={newBook.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 shadow-insetEnOne"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="genre" className="block text-gray-700 font-semibold">
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={newBook.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 shadow-insetEnOne"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="imageLink"
            className="block text-gray-700 font-semibold"
          >
            Image Link (optional):
          </label>
          <input
            type="text"
            id="imageLink"
            name="imageLink"
            value={newBook.imageLink}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 shadow-insetEnOne"
            required={false}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-100 text-slate-600 font-bold rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300 shadow-insetEnTwo text-center hover:scale-105 transition duration-300 hover:text-white"
        >
          update Book
        </button>
        <button
          type="submit"
          className="w-full mt-2 py-2 bg-red-100 text-slate-600 font-bold rounded-md hover:bg-red-400 focus:outline-none focus:bg-blue-300 shadow-insetEnOne text-center hover:scale-105 transition duration-300 hover:text-white"
          onClick={() => {
            handleNavigate();
          }}
        >
          Return
        </button>
      </form>
    </>
  );
};
export default EditBook;
