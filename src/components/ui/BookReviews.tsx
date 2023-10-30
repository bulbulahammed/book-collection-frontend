/* eslint-disable @typescript-eslint/no-unused-vars */
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAppSelector } from "../../redux/hook";
import { IBookReview } from "../../types/globaltypes";
interface IProps {
  review: IBookReview;
}

export default function BookReview({ review }: IProps) {
  const user = useAppSelector((state) => state.auth.user.email);
  return (
    <div className="bg-accent text-white rounded-md p-6 mb-6 text-center max-w-5xl mx-auto hover:scale-[102%] transition-all duration-300">
      <div className="font-light text-sm mb-2">{review.reviewer}</div>
      <div className="text-lg">{review.comment}</div>
      <div
        className="flex justify-end
      "
      >
        {review?.reviewer === user && (
          <div
            className="ml-4"
            // onClick={handleDelete}
            style={{ cursor: "pointer" }}
          >
            <div className="hover:text-white text-red-600 flex items-center">
              <div className="hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/50 delay-75  p-2 rounded-md">
                <RiDeleteBin5Line />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
