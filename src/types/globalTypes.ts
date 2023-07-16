export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string[];
  publicationDate: string;
  reviews: string[];
  userId: string;
  image: string,
  createdAt: string
}