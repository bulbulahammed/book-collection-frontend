/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InputReviews from "../components/pageComponents/InputReview";
import BookReview from "../components/ui/BookReviews";
import {
  useDeleteBookMutation,
  useGetSingleBooksQuery,
} from "../redux/feature/books/bookApi";
import { useAppSelector } from "../redux/hook";
import { IBookReview } from "../types/globaltypes";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  //Get Single Book
  const { data, isLoading, isError, isSuccess } = useGetSingleBooksQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1000,
  });

  const bookData = data?.data;
  const reviews = data?.data?.reviews;
  const user = useAppSelector((state) => state.auth.user.email);

  const [
    deleteBook,
    { isLoading: Deleting, isError: DeleteError, isSuccess: Deleted },
  ] = useDeleteBookMutation();

  useEffect(() => {
    if (Deleted) {
      toast.success("Book Deleted", { toastId: "successDeleteBook" });
      navigate("/");
    }
    if (DeleteError) {
      toast.error("Failed to delete", { toastId: "errorOnDeleteBook" });
    }
  }, [Deleted, DeleteError, navigate]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteBook(id);
    }
  };

  return (
    <section
      className="text-center min-h-screen"
      style={{
        background: "rgba(255, 194, 139, 0.30)",
        fontFamily: "'Kalam', cursive",
      }}
    >
      {bookData ? (
        <div className="container mx-auto text-center">
          {isLoading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : (
            isSuccess && (
              <div>
                <div className="py-20">
                  <div className="flex-col lg:flex-row hero-content">
                    <img
                      src={bookData?.img}
                      className="max-w-sm rounded-lg shadow-2xl"
                      alt="Book"
                    />
                    <div>
                      <h4 className="text-3xl font-bold pb-10">
                        {bookData?.title}
                      </h4>
                      {/* Book Information */}
                      <div className="my-10">
                        {/* Author */}
                        <div className="flex items-center  text-lg">
                          <div className="px-2">
                            <BsPen />
                          </div>
                          <div>
                            <p className="py-2">{bookData?.author}</p>
                          </div>
                        </div>
                        {/* Category */}
                        <div className="flex items-center text-lg">
                          <div className="px-2">
                            <BiCategory />
                          </div>
                          <div>
                            <p className="py-2">{bookData?.genre}</p>
                          </div>
                        </div>
                        {/* Publication Year */}
                        <div className="flex items-center  text-lg">
                          <div className="px-2">
                            <SlCalender />
                          </div>
                          <div>
                            <p className="py-2">{bookData?.publicationYear}</p>
                          </div>
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="flex items-center text-xl font-bold">
                        {/* Edit Link */}
                        {bookData?.addedBy === user && (
                          <div className="mr-4">
                            <Link
                              to={`/edit/${bookData?.id}`}
                              className="flex items-center text-green-500"
                            >
                              <div className="px-2">
                                <LuEdit />
                              </div>
                              <div>Edit</div>
                            </Link>
                          </div>
                        )}
                        {/* Delete Button */}
                        {bookData?.addedBy === user && !Deleting && (
                          <div
                            className="ml-4"
                            onClick={handleDelete}
                            style={{ cursor: "pointer" }}
                          >
                            <div className="text-red-600 flex items-center">
                              <div>
                                <RiDeleteBin5Line />
                              </div>
                              <div>Delete</div>
                            </div>
                          </div>
                        )}
                        {Deleting && (
                          <span className="loading loading-ring loading-lg text-red-500"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Book Description */}
                <div className="text-center mb-20 mx-auto max-w-5xl">
                  <div className="text-center text-2xl mb-5">
                    <h2>{`More About ${bookData?.title}`}</h2>
                  </div>
                  <div className="text-justify">
                    <p>{bookData?.description}</p>
                  </div>
                </div>
                {/* Books Review By Readers */}
                <div className="flex flex-col justify-center items-center">
                  {/* Logged in user Can Comment */}
                  {user && (
                    <div className="bg-white rounded-md p-4 shadow-md w-full max-w-lg text-center">
                      <InputReviews />
                    </div>
                  )}
                  <div className="w-full">
                    {reviews?.map((review: IBookReview, index: number) => (
                      <div key={index} className="rounded-m p-4">
                        <BookReview review={review} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
          {isError && (
            <div className="text-center text-red-600 ">
              <p
                className="text-2xl"
                style={{
                  fontFamily: "'Allerta', sans-serif",
                }}
              >
                Loading Error !
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="pt-20">
          <p>Book Not Found</p>
        </div>
      )}
    </section>
  );
}
