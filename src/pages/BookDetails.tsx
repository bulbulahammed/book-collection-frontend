/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteBookMutation,
  useGetSingleBooksQuery,
} from "../redux/feature/books/bookApi";
import { useAppSelector } from "../redux/hook";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useGetSingleBooksQuery(id);
  const bookData = data?.data;

  const { email } = useAppSelector((state) => state.auth.user);

  const [
    deleteBook,
    { isLoading: Deleting, isError: DeleteError, isSuccess: Deleted },
  ] = useDeleteBookMutation();

  useEffect(() => {
    if (Deleted) {
      toast.success("Successfully Deleted", { toastId: "successDelete" });
      navigate("/");
    }
    if (DeleteError) {
      toast.error("Failed to delete", { toastId: "deleteError" });
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
      className="text-center hero min-h-screen bg-base-200"
      style={{
        background: "rgba(255, 194, 139, 0.30)",
        fontFamily: "'Kalam', cursive",
      }}
    >
      {isLoading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        isSuccess && (
          <div>
            <div className="hero py-20">
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
                    {/* Status */}
                    {bookData?.status && (
                      <div className="flex items-center  text-lg">
                        <div className="px-2">
                          <GrStatusGood />
                        </div>
                        <div>
                          <p className="py-2">{bookData?.status}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Actions */}
                  <div className="flex items-center text-xl font-bold">
                    {/* Edit Link */}
                    {bookData?.addedBy === email && (
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
                    {bookData?.addedBy === email && !Deleting && (
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
            <div className="text-justify max-w-3xl mb-20">
              <div className="text-center text-2xl mb-5">
                <h2>{`More About ${bookData?.title}`}</h2>
              </div>
              <div>
                <p>{bookData?.description}</p>
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
    </section>
  );
}
