import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
// import { BsSearch } from "react-icons/bs";

const BookSearchBar = ({
  current_value,
  handleFilterValue,
}: {
  current_value: string;
  handleFilterValue: (value: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(current_value);
  }, [current_value]);

  return (
    <div className="relative flex items-center ">
      <input
        className="input input-bordered w-full max-w-xs outline-none hover:outline-none focus:outline-none"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        required={true}
      />
      <button
        className="text-white-black h-[44px] px-4 py-4  rounded-r-md btn-accent focus:outline-none  hover:text-white -ml-12 outline-none"
        onClick={() => handleFilterValue(searchTerm)}
      >
        <BsSearch />
      </button>
    </div>
  );
};

export default BookSearchBar;
