/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FilterBook from "../components/pageComponents/FilterBook";
import BookCard from "../components/ui/BookCard";
import { useGetBooksQuery } from "../redux/feature/books/bookApi";
import { IBook } from "../types/globaltypes";

export default function AllBooks() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // filter state and effect for update
  const [filter, setFilter] = useState({
    publicationYear: "",
    genre: "",
    searchTerm: "",
  });

  useEffect(() => {
    const tempSearchParams = {
      publicationYear: searchParams.get("publicationYear") ?? "",
      genre: searchParams.get("genre") ?? "",
      searchTerm: searchParams.get("searchTerm") ?? "",
    };

    setFilter(tempSearchParams);
  }, [location, searchParams]);

  // Remove searchParams Dependency if face any problem

  // Get Filtered books query
  const { data, isError, isSuccess, isLoading } = useGetBooksQuery({
    publicationYear: filter.publicationYear,
    genre: filter.genre,
    searchTerm: filter.searchTerm,
  });

  const AllBook = data?.data;

  let uniqueGenres: string[] = [];
  let uniquePublicationYears: string[] = [];

  // Check if AllBook is defined
  if (AllBook) {
    // Use a Set to store unique genres and publication years
    const uniqueGenresSet = new Set();
    const uniquePublicationYearsSet = new Set();

    // Iterate through the books and add genres and publication years to their respective Sets
    AllBook.forEach((book: { genre: string; publicationYear: string }) => {
      uniqueGenresSet.add(book.genre);
      uniquePublicationYearsSet.add(book.publicationYear);
    });

    // Convert the Sets back to arrays if needed and cast them to string[]
    uniqueGenres = Array.from(uniqueGenresSet) as string[];
    uniquePublicationYears = Array.from(uniquePublicationYearsSet) as string[];
  }
  return (
    <div>
      {/* //Book Filter4ing Options */}
      <div className="text-canter my-10">
        <FilterBook filter={filter} setFilter={setFilter} />
      </div>
      {/* Book Card */}
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
              AllBook?.map((book: IBook) => (
                <BookCard key={book.id} book={book} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
