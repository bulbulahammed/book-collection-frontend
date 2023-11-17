/* eslint-disable @typescript-eslint/no-unused-vars */
import { BiBookAlt } from "react-icons/bi";
import { BsBook, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IBook } from "../../types/globaltypes";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const handleClick = () => {
    alert("Please Login To Add To List");
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
      }}
      className="hover:shadow-2xl hover:scale-[120%] transition-all duration-300 rounded-lg shadow-2xl"
    >
      <div className="card">
        <Link to={`/bookDetails/${book.id}`}>
          <figure className="px-5 pt-5">
            <img src={book.img} alt="Shoes" className="rounded-xl" />
          </figure>
        </Link>
        <div className="card-body">
          <div className="flex justify-evenly">
            <div>
              <button onClick={handleClick}>
                <BsHeart />
              </button>
            </div>
            <div>
              <button onClick={handleClick}>
                <BsBook />
              </button>
            </div>
            <div>
              <button onClick={handleClick}>
                <BiBookAlt />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
