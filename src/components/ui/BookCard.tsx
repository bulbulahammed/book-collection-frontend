import { BsBook, BsPen } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IBook } from "../../types/globaltypes";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            style={{ width: "150px" }}
            src={book.img}
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div
          className="card-body text-left"
          style={{
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <h2 className="card-title">
            <BsBook /> {book.title}
          </h2>
          <div className="flex">
            <span className="pr-2">
              <BsPen />
            </span>
            <p> {book.author}</p>
          </div>
          <div className="card-actions text-center">
            <Link to={`/bookDetails/${book.id}`} className="font-bold">
              More...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
