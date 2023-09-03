import { BsPen } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";
import { useGetSingleBooksQuery } from "../redux/feature/books/bookApi";

import { BiCategory } from "react-icons/bi";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetSingleBooksQuery(id);

  console.log(data, isLoading, isError, isSuccess);
  const bookData = data?.data;
  console.log(bookData);
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
            {/* Button/link */}
            <div className="flex items-center">
              <div>
                <Link to={"/"}>Edit</Link>
              </div>
              <div>
                <button className="btn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
