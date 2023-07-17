import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/globalTypes";
import { toast } from "react-toastify";

interface IWishList {
  books: IBook[];
}
const storedWishList = localStorage.getItem("wishList");
const initialState: IWishList = {
  books: storedWishList ? JSON.parse(storedWishList) : [],
};
const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<IBook>) => {
      const bookToAdd = { ...action.payload };
      const isBookAlreadyAdded = state.books.some((book) => book._id === bookToAdd._id);
      if (isBookAlreadyAdded) {
        toast.error('This book is already in your wishlist!');
      } else {
        state.books.push(bookToAdd);
        toast.success('Book added to wishlist!');
        localStorage.setItem("wishList", JSON.stringify(state.books));
      }
    },
    removeFromWishList: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
      toast.success('book removed from wishList!');
      localStorage.setItem("wishList", JSON.stringify(state.books));
    }
  }
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;