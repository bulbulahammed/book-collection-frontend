/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetBooksQuery } from "../../redux/feature/books/bookApi";
import { useAppSelector } from "../../redux/hook";
import BookSearchBar from "../ui/BookSearchBar";
import FilterDropDown from "../ui/FilterDropDown";

type IFilterBook = {
  filter: { genre: string; publicationYear: string; searchTerm: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      publicationYear: string;
      genre: string;
      searchTerm: string;
    }>
  >;
};

export default function FilterBook({ filter }: IFilterBook) {
  const { email } = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isError, isSuccess, isLoading } = useGetBooksQuery({
    publicationYear: filter.publicationYear,
    genre: filter.genre,
    searchTerm: filter.searchTerm,
  });

  const AllBook = data?.data;
  let uniqueGenres: string[] = []; // Initialize as an empty array
  let uniquePublicationYears: string[] = []; // Initialize as an empty array for publication years

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

  //handleFilter
  type IHandleFilter = {
    key: string;
    value: string;
  };
  const handleFilter = ({ key, value }: IHandleFilter) => {
    searchParams.set(`${key}`, value);
    navigate(`/allBooks?${searchParams.toString()}`);
  };

  return (
    <div className=" flex items-center justify-center flex-wrap gap-[10px]">
      {/* All Button */}
      <div>
        <button
          className="btn btn-accent"
          onClick={() => {
            setSearchParams({});
            navigate(`/allBooks`);
          }}
        >
          All
        </button>
      </div>
      {/* Year Dropdown */}
      <div>
        <FilterDropDown
          optionLabel={filter.publicationYear ? filter.publicationYear : "Year"}
          items={uniquePublicationYears}
          handleFilterValue={(value) => {
            handleFilter({
              key: "publicationYear",
              value,
            });
          }}
        />
      </div>
      {/* Genre Dropdown */}
      <div>
        <FilterDropDown
          optionLabel={filter.genre ? filter.genre : "Genre"}
          items={uniqueGenres}
          handleFilterValue={(value) => {
            handleFilter({
              key: "genre",
              value,
            });
          }}
        />
      </div>
      {/* Input Search Keyword*/}
      <div>
        <BookSearchBar
          current_value={filter.searchTerm ? filter.searchTerm : ""}
          handleFilterValue={(value) => {
            handleFilter({
              key: "searchTerm",
              value,
            });
          }}
        />
      </div>
    </div>
  );
}
