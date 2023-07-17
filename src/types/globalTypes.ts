export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string[];
  publicationDate: string;
  userId: string;
  image: string,
  createdAt: string
}

export interface IReview {
  _id: string;
  bookId: string;
  userId: string;
  comment: string
}