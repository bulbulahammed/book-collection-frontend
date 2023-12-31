/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FormEvent, useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddReviewMutation } from "../../redux/feature/reviews/reviewApiSlice";
import { useAppSelector } from "../../redux/hook";

export default function InputReviews() {
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth.user.email);

  const [addReview, { isLoading, isSuccess, isError }] = useAddReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Comment Added", { toastId: "SuccessInputComment" });
    }
    if (isError) {
      toast.error("Failed to Add", { toastId: "ErrorOnCommentAdd" });
    }
  }, [addReview, isError, isSuccess]);

  const [reviewData, setReviewData] = useState({
    comment: "",
    reviewer: user || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
      reviewer: user || "",
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reviewData.comment.trim() === "" || reviewData.reviewer.trim() === "") {
      toast.error("Comment and reviewer fields cannot be empty", {
        toastId: "ErrorOnComment",
      });
      return;
    }
    addReview({ id, reviewData });
    setReviewData({
      comment: "",
      reviewer: user || "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center text-center">
          <input
            className="input input-bordered w-full max-w-lg outline-none hover:outline-none focus:outline-none"
            type="text"
            name="comment" // Make sure to specify the name for the input field
            placeholder="Write A Comment"
            value={reviewData.comment} // Bind the value of the input field to the state
            onChange={handleChange}
          />

          <button
            className="text-white-black h-[44px] px-4 py-4 rounded-r-md btn-accent focus:outline-none hover:text-white -ml-12 outline-none"
            type="submit"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <BsFillSendFill />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
