type IReadingList = {
  bookIds: string[];
};
type IWishList = {
  bookIds: string[];
};
type IBooksList = {
  bookIds: string[];
};

export type IUser = {
  name?: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  booksList?: IBooksList;
  readingList?: IReadingList;
  wishList?: IWishList;
};

export type IBookStatus = "N/A" | "Reading" | "Finished";

export type IBookReviews = {
  review: string[];
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  img: string;
  addedBy?: string;
  status: IBookStatus;
  reviews?: IBookReviews;
  id?: string;
  description: string;
};
