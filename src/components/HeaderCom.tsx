import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

export default function HeaderCom() {
  const { _id: uId } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate("/book/add-book");
  };
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-28 bg-grey-400 select-none">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 duration:300
            transition hover:scale-105 hover:bg-gray-200 hover:text-slate-600 duration-300"
            title="Join to add books, along with wishlist, reading list etc."
            onClick={() => {
              handleAddBook();
            }}
          >
            Want to add books?
            <span>
              {!uId && (
                <span className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {`. JOIN NOW`}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Books to Enrich Your Knowledge
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-500">
            Explore Worlds Through Words: Discover Your Next Great Read!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Link>
            <Link
              to="/books"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Books <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
