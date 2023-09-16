/* eslint-disable @typescript-eslint/no-unused-vars */
import { BiCategory } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";
import { useGetSingleBooksQuery } from "../redux/feature/books/bookApi";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetSingleBooksQuery(id);
  const bookData = data?.data;

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={bookData?.img}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Book"
          />
          <div>
            <h4 className="text-3xl font-bold pb-10">{bookData?.title}</h4>
            {/* Book Information */}
            <div className="my-10">
              {/* Author */}
              <div className="flex items-center">
                <div className="px-2">
                  <BsPen />
                </div>
                <div>
                  <p className="py-2">{bookData?.author}</p>
                </div>
              </div>
              {/* Category */}
              <div className="flex items-center">
                <div className="px-2">
                  <BiCategory />
                </div>
                <div>
                  <p className="py-2">{bookData?.genre}</p>
                </div>
              </div>
              {/* Publication Year */}
              <div className="flex items-center">
                <div className="px-2">
                  <SlCalender />
                </div>
                <div>
                  <p className="py-2">{bookData?.publicationYear}</p>
                </div>
              </div>
              {/* Status */}
              <div className="flex items-center">
                <div className="px-2">
                  <GrStatusGood />
                </div>
                <div>
                  <p className="py-2">{bookData?.status}</p>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center text-xl font-bold">
              {/* Edit Link */}
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
              {/* Delete Button */}
              <div className="ml-4">
                <div className="text-red-600 flex items-center">
                  <div>
                    <RiDeleteBin5Line />
                  </div>
                  <div>Delete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
