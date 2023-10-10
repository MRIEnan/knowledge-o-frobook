// import { createPublicationDate } from "@/lib/createPublicationDate";
import ModalOne from "@/components/shared/ModalOne";
import { toast } from "@/components/ui/use-toast";
import { useAddBookMutation } from "@/redux/features/book/bookApi";
import { useAppSelector } from "@/redux/hooks";
import { IBook } from "@/types/Book/globalBookType";
import { getCookie } from "@/utils/getCookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialBookState: Partial<IBook> = {
  accessIds: "",
  imageLink: "",
  title: "",
  description: "",
  author: [],
  genre: "",
};

const AddBook: React.FC = () => {
  const [newBook, setNewBook] = useState<Partial<IBook>>(initialBookState);

  const [authors, setAuthors] = useState<string>("");
  const { _id: uId } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const [addBook, { isLoading, isError, isSuccess }] = useAddBookMutation();

  useEffect(() => {
    if (isError) {
      toast({
        duration: 3000,
        description: "Book Add Failed, please wait ahile and try again",
        title: "Book Add Failed",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        duration: 3000,
        description: "Book Added successfully",
        title: "Book Added",
      });
    }
  }, [isSuccess]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      data: allBookInfo,
      authorization: myAuth,
    };
    addBook(options).then((data) => {
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
        navigate(`/book/${mData.data._id}`);
      }
    });
  };
  return (
    <>
      {isLoading && <ModalOne text={"Please wait. Adding the book"} />}
      <form
        onSubmit={handleSubmit}
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
          Add Book
        </button>
      </form>
    </>
  );
};
export default AddBook;
