import { BsBook, BsPen } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IBook } from "../../types/globaltypes";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <div>
      <Link to={`/bookDetails/${book.id}`}>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              style={{ height: "250px", width: "150px" }}
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
            <div className="card-actions text-center"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}
