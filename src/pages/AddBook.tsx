/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAddBookMutation } from "../redux/feature/books/bookApi";

export default function AddBook() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [addBook, { data, isLoading, isSuccess, isError }] =
    useAddBookMutation();

  const successToast = data?.message;

  if (isSuccess) {
    toast.success(successToast, { toastId: "AddBookSuccess" });
    navigate("/");
  }

  if (isError) {
    toast.error("Failed to add Book!", { toastId: "AddBookError" });
  }

  const [formData, setFormData] = useState({
    book: {
      title: "",
      author: "",
      genre: "",
      publicationYear: "",
      addedBy: email || "",
      description: "",
      img: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      book: {
        ...prevData.book,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBook(formData);
  };

  return (
    <section>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-10 text-xl text-center">Add New Book</h1>
            <form onSubmit={handleSubmit}>
              {/*----------- Label For Title ------------*/}
              <label className="label">
                <span className="label-text text-sm">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="title"
                placeholder="Title"
                value={formData.book.title}
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
                placeholder="Author"
                value={formData.book.author}
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
                placeholder="Genre"
                value={formData.book.genre}
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
                placeholder="Publication Year"
                value={formData.book.publicationYear}
                onChange={handleChange}
              />
              {/*----------- Label For  Description ------------*/}
              <label className="label">
                <span className="label-text text-sm">Description</span>
              </label>
              <textarea
                className="input input-bordered w-full max-w-xs"
                name="description"
                placeholder="Description"
                value={formData.book.description}
                onChange={handleChange}
              />
              {/*----------- Label For  Image ------------*/}
              <label className="label">
                <span className="label-text text-sm">Image</span>
              </label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }: { base64: string }) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    book: {
                      ...prevData.book,
                      img: base64,
                    },
                  }));
                }}
              />

              {isLoading ? (
                <button className="w-full max-w-xs text-center py-3 rounded btn-accent text-white hover:bg-green-dark focus:outline-none my-1">
                  <span className="loading loading-spinner text-info"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full max-w-xs text-center py-3 rounded btn-accent text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Add Book
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
