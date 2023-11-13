/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { BiBookAlt, BiSolidBookAlt } from "react-icons/bi";
import { BsBook, BsBookFill, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddToReadListMutation,
  useAddToReadingListMutation,
  useAddToWishListMutation,
  useGetSingleUserQuery,
} from "../../redux/feature/user/userApiSlice";
import { useAppSelector } from "../../redux/hook";
import { IBook } from "../../types/globaltypes";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const userId = useAppSelector((state) => state.auth.user.id);
  const bookId = book.id;

  const { data: userData } = useGetSingleUserQuery(userId);
  const wishList = userData?.data?.wishList.bookId;
  const readingList = userData?.data?.readingList.bookId;
  const readList = userData?.data?.readList.bookId;

  const bookIsInWishList = wishList?.includes(bookId);
  const bookIsInReadingList = readingList?.includes(bookId);
  const bookIsInReadList = readList?.includes(bookId);

  // Add To Wish List
  const [
    addToWishList,
    { isError: wishListError, isSuccess: AddedToWishList },
  ] = useAddToWishListMutation();

  // Add To Reading List
  const [
    addToReadingList,
    { isError: readingListError, isSuccess: readingListSuccess },
  ] = useAddToReadingListMutation();

  // Add To Reading List
  const [
    addToReadList,
    { isError: readListError, isSuccess: readListSuccess },
  ] = useAddToReadListMutation();

  useEffect(() => {
    if (AddedToWishList) {
      toast.success("Added To Wish List", { toastId: "successWishList" });
    }
    if (wishListError) {
      toast.error("Failed to Add WishList", { toastId: "errorWishList" });
    }

    if (readingListSuccess) {
      toast.success("Added To Reading List", { toastId: "successReadingList" });
    }
    if (readingListError) {
      toast.error("Failed to Add Reading List", {
        toastId: "errorReadingList",
      });
    }

    if (readListSuccess) {
      toast.success("Added To Read List", { toastId: "successReadList" });
    }
    if (readListError) {
      toast.error("Failed to Add Read List", { toastId: "errorReadList" });
    }
  }, [
    addToWishList,
    AddedToWishList,
    wishListError,
    readingListSuccess,
    readingListError,
    readListSuccess,
    readListError,
  ]);

  // Wish List Handler
  const handleWishList = () => {
    if (bookId && userId) {
      addToWishList({ userId, bookId });
    }
  };

  // Reading List Handler
  const handleReadingList = () => {
    if (bookId && userId) {
      addToReadingList({ userId, bookId });
    }
  };

  // Read List Handler
  const handleReadList = () => {
    if (bookId && userId) {
      addToReadList({ userId, bookId });
    }
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
              <button onClick={handleWishList}>
                {bookIsInWishList ? <BsFillHeartFill /> : <BsHeart />}
              </button>
            </div>
            <div>
              <button onClick={handleReadingList}>
                {bookIsInReadingList ? <BsBookFill /> : <BsBook />}
              </button>
            </div>
            <div>
              <button onClick={handleReadList}>
                {bookIsInReadList ? <BiSolidBookAlt /> : <BiBookAlt />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
