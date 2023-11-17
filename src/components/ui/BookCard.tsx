import { useAppSelector } from "../../redux/hook";
import { IBook } from "../../types/globaltypes";
import BookCardNoUser from "./BookCardNoUser";
import BookCardWithUser from "./BookCardWithUser";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const userId = useAppSelector((state) => state.auth.user.id);

  return (
    <div>
      {userId ? (
        <BookCardWithUser book={book} />
      ) : (
        <BookCardNoUser book={book} />
      )}
    </div>
  );
}
