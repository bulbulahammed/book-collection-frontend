import { BsPen } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IBook } from "../../types/globaltypes";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Link to={`/bookDetails/${book.id}`}>
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-5 pt-5">
            <img
              style={{ height: "200px", width: "170px" }}
              src={book.img}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body text-left">
            <div className="flex text-sm">
              <span className="pr-2">
                <BsPen />
              </span>
              <p> {book.author}</p>
            </div>
            <div className="card-actions text-center"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}
