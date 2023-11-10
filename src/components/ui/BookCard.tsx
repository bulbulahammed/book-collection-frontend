/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { BiBookAlt, BiSolidBookAlt } from "react-icons/bi";
import { BsBook, BsBookFill, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToWishListMutation } from "../../redux/feature/user/userApiSlice";
import { useAppSelector } from "../../redux/hook";
import { IBook } from "../../types/globaltypes";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const userId = useAppSelector((state) => state.auth.user.id);
  const bookInCard = book.id;

  // Add To Wish List
  const [
    addToWishList,
    { isLoading, isError: wishListError, isSuccess: AddedToWishList },
  ] = useAddToWishListMutation();

  useEffect(() => {
    if (AddedToWishList) {
      toast.success("Added To Wish List", { toastId: "successWishList" });
    }
    if (wishListError) {
      toast.error("Failed to Add WishList", { toastId: "errorWishList" });
    }
  }, [addToWishList, AddedToWishList, wishListError]);

  const handleWishList = () => {
    if (bookInCard && userId) {
      addToWishList({ userId, bookInCard });
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
                <BsFillHeartFill />
                <BsHeart />
              </button>
            </div>
            <div>
              <BsBook />
              <BsBookFill />
            </div>
            <div>
              <BiBookAlt />
              <BiSolidBookAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
