/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteReviewMutation } from "../../redux/feature/reviews/reviewApiSlice";
import { useAppSelector } from "../../redux/hook";
import { IBookReview } from "../../types/globaltypes";
interface IProps {
  review: IBookReview;
}

export default function BookReview({ review }: IProps) {
  const user = useAppSelector((state) => state.auth.user.email);
  const { id } = useParams();

  const reviewId = review?._id;
  const bookId = id;

  // Delete Review Mutation
  const [deleteReview, { isLoading, isError, isSuccess }] =
    useDeleteReviewMutation();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Comment?"
    );
    if (confirmDelete && bookId && reviewId) {
      deleteReview({ bookId, reviewId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Comment Deleted", { toastId: "CommentDeleted" });
    }
    if (isError) {
      toast.error("Failed to delete", { toastId: "CommentDeleteError" });
    }
  }, [deleteReview, isError, isSuccess]);

  return (
    <div className="h-full w-full bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 p-6 mb-6 text-center max-w-5xl mx-auto hover:scale-[102%] transition-all duration-300">
      <div className="font-light text-sm mb-2">{review?.reviewer}</div>
      <div className="text-lg">{review?.comment}</div>
      <div
        className="flex justify-end
      "
      >
        {review?.reviewer === user && (
          <div
            className="ml-4"
            onClick={handleDelete}
            style={{ cursor: "pointer" }}
          >
            {isLoading ? (
              <span className="loading loading-spinner text-red-600"></span>
            ) : (
              <div className="hover:text-white text-red-600 flex items-center">
                <div className="hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/50 delay-75  p-2 rounded-md">
                  <RiDeleteBin5Line />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
