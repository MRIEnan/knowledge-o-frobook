import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IBook {
  _id?: string | null;
  accessIds?: string | null;
  imageLink?: string | null;
  title?: string | null;
  description?: string | null;
  author?: string[] | null;
  publicationDate?: string | null;
  genre?: string | null;
  createdAt?: string | null;
  modifiedAt?: string | null;
}
const initialState: IBook = {
  _id: null,
  accessIds: null,
  imageLink: null,
  title: null,
  description: null,
  author: null,
  publicationDate: null,
  genre: null,
  createdAt: null,
  modifiedAt: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookInfo: (state, action: PayloadAction<IBook>) => {
      state = action.payload;
      return { ...state };
    },
  },
});

export const { setBookInfo } = bookSlice.actions;

export default bookSlice.reducer;
