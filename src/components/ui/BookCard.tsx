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
      className="hover:shadow-2xl hover:scale-[120%] transition-all duration-300 rounded-lg shadow-2xl"
    >
      <Link to={`/bookDetails/${book.id}`}>
        <div className="card">
          <figure className="px-5 pt-5">
            <img src={book.img} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body text-left">
            <div className="flex text-sm">
              <p> {book.title}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
