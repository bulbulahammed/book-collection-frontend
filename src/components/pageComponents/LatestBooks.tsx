import { toast } from "react-toastify";
import { useGetLatestBooksQuery } from "../../redux/feature/books/bookApi";
import { IBook } from "../../types/globaltypes";
import BookCard from "../ui/BookCard";

export default function LatestBooks() {
  const { data, isError, isSuccess, isLoading } =
    useGetLatestBooksQuery(undefined);

  const booksData = data?.data;

  if (isError) {
    toast("Books Can't Load 😟", { toastId: "latestBooksLoadingError" });
  }
  return (
    <div className="px-10 my-10">
      {/* Header Section */}
      <div className="text-center py-10">
        <h3 className="text-4xl">Latest Books</h3>
        <h5 className="text-2xl">Added By Users</h5>
      </div>
      {/* Books Card */}
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center text-red-600">
            <p
              style={{
                fontFamily: "'Allerta', sans-serif",
              }}
            >
              An error occurred while fetching data
            </p>
          </div>
        ) : (
          <div className="col-span-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 pb-20">
            {isSuccess &&
              booksData?.map((book: IBook) => (
                <BookCard key={book.id} book={book} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
