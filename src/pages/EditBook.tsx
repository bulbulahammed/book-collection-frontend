/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetSingleBooksQuery,
  useUpdateBookMutation,
} from "../redux/feature/books/bookApi";

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
  });

  const [
    editBook,
    { isSuccess: updateSuccess, isLoading: isUpdating, isError: updateError },
  ] = useUpdateBookMutation();

  const { data: singleBook, isLoading, isError } = useGetSingleBooksQuery(id);

  const editableBook = singleBook?.data;

  useEffect(() => {
    if (editableBook) {
      setFormData(editableBook);
    }
  }, [editableBook]);

  if (updateSuccess) {
    toast.success("Successfully Updated", { toastId: "successUpdateBook" });
  }
  if (updateError) {
    toast.error("Update Failed!", { toastId: "BookUpdateError" });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editBook({ id, ...formData });
    navigate("/");
  };

  return (
    <section>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-10 text-xl text-center">
              Update Book Information
            </h1>
            <form onSubmit={handleSubmit}>
              {/*----------- Label For Title ------------*/}
              <label className="label">
                <span className="label-text text-sm">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="title"
                placeholder={editableBook?.title}
                value={formData.title}
                onChange={handleChange}
              />
              {/*----------- Label For Author ------------*/}
              <label className="label">
                <span className="label-text text-sm">Author</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="author"
                placeholder={editableBook?.author}
                value={formData.author}
                onChange={handleChange}
              />
              {/*----------- Label For Genre ------------*/}
              <label className="label">
                <span className="label-text text-sm">Genre</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="genre"
                placeholder={editableBook?.genre}
                value={formData.genre}
                onChange={handleChange}
              />
              {/*----------- Label For Publication Year ------------*/}
              <label className="label">
                <span className="label-text text-sm">Publication Year</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="publicationYear"
                placeholder={editableBook?.publicationYear}
                value={formData.publicationYear}
                onChange={handleChange}
              />
              {isUpdating ? (
                <button className="w-full max-w-xs text-center py-3 rounded btn-accent text-white hover:bg-green-dark focus:outline-none my-1">
                  <span className="loading loading-spinner text-info"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full max-w-xs text-center py-3 rounded btn-accent text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Done
                </button>
              )}
            </form>

            {isUpdating && (
              <div className="text-center">
                <span className="loading loading-spinner text-info"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
