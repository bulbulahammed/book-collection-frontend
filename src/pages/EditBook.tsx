/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useEffect, useState } from "react";
import FileBase from "react-file-base64";
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
    description: "",
    img: "",
  });

  const [
    editBook,
    { isSuccess: updateSuccess, isLoading: isUpdating, isError: updateError },
  ] = useUpdateBookMutation();

  const { data: singleBook, isLoading, isError } = useGetSingleBooksQuery(id);

  useEffect(() => {
    if (isError) {
      toast.error("Error on data loading", { toastId: "editLoadError" });
    }
  }, [isError]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editBook({ id, ...formData });
    navigate("/");
  };

  return (
    <section
      style={{
        background: "rgba(255, 194, 139, 0.30)",
        fontFamily: "'Kalam', cursive",
      }}
    >
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2  my-20">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h2 className="mb-10 text-4xl text-center">
              Update Book Information
            </h2>
            <form onSubmit={handleSubmit}>
              {/*----------- Label For Title ------------*/}
              <label className="label">
                <span className="label-text text-lg">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="title"
                placeholder={
                  isLoading ? "Loading........" : editableBook?.title || ""
                }
                value={formData.title}
                onChange={handleChange}
              />
              {/*----------- Label For Author ------------*/}
              <label className="label">
                <span className="label-text  text-lg">Author</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="author"
                placeholder={
                  isLoading ? "Loading........" : editableBook?.author || ""
                }
                value={formData.author}
                onChange={handleChange}
              />
              {/*----------- Label For Genre ------------*/}
              <label className="label">
                <span className="label-text text-lg">Genre</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="genre"
                placeholder={
                  isLoading ? "Loading........" : editableBook?.genre || ""
                }
                value={formData.genre}
                onChange={handleChange}
              />
              {/*----------- Label For Publication Year ------------*/}
              <label className="label">
                <span className="label-text text-lg">Publication Year</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="publicationYear"
                placeholder={
                  isLoading
                    ? "Loading........"
                    : editableBook?.publicationYear || ""
                }
                value={formData.publicationYear}
                onChange={handleChange}
              />

              {/*----------- Label For  Description ------------*/}
              <label className="label">
                <span className="label-text text-lg">Description</span>
              </label>
              <textarea
                className="input input-bordered w-full"
                name="description"
                placeholder={
                  isLoading
                    ? "Loading........"
                    : editableBook?.description || ""
                }
                value={formData.description}
                onChange={handleChange}
              />
              {/*----------- Label For  Image ------------*/}
              <label className="label">
                <span className="label-text text-lg">Image</span>
              </label>
              <div className="flex items-center space-x-4">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }: { base64: string }) => {
                    setFormData({
                      ...formData,
                      img: base64,
                    });
                  }}
                />
                {formData?.img ? (
                  <img src={formData?.img} alt="img" className="w-20 h-20" />
                ) : (
                  <p>Update Image</p>
                )}
              </div>

              {isUpdating ? (
                <button className="w-full text-center py-3 rounded btn-accent text-white hover:bg-green-dark focus:outline-none my-1">
                  <span className="loading loading-ring loading-lg"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded btn-accent text-white hover:bg-green-dark focus:outline-none my-8"
                >
                  Done
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
