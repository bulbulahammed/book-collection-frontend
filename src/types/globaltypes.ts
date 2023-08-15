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
