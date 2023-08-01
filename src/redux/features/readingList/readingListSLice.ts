import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/globalTypes";
import { toast } from "react-toastify";
import swal from "sweetalert";

interface IReadingList {
  books: IBook[];
}
const storedReadingList = localStorage.getItem("readingList");
const initialState: IReadingList = {
  books: storedReadingList ? JSON.parse(storedReadingList) : [],
};
const readingListSlice = createSlice({
  name: 'readingList',
  initialState,
  reducers: {
    addToReadingList: (state, action: PayloadAction<IBook>) => {
      const bookToAdd = { ...action.payload };
      const isBookAlreadyAdded = state.books.some((book) => book._id === bookToAdd._id);
      if (isBookAlreadyAdded) {
        toast.error('This book is already in your reading list!');
      } else {
        state.books.push(bookToAdd);
        toast.success('Book added to reading list!');
        localStorage.setItem("readingList", JSON.stringify(state.books));
      }
    },
    removeFromReadingList: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
      if (state.books.length > 0) {
        toast.success('book removed from reading list!');
      } else {
        swal('success', 'all book removed!', 'success')
      }
      localStorage.setItem("readingList", JSON.stringify(state.books));
    }
  }
});

export const { addToReadingList, removeFromReadingList } = readingListSlice.actions;
export default readingListSlice.reducer;