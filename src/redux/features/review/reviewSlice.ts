import { PayloadAction } from "@reduxjs/toolkit";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "@/types/Book/globalBookType";
import { createSlice } from "@reduxjs/toolkit";
// import { createSlice } from "@reduxjs/toolkit";

interface IReview {
  revId?: string | null;
}

const initialState: IReview = {
  revId: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addRevId: (state, action: PayloadAction<string | null>) => {
      state.revId = action.payload;
    },
  },
});
// const initialState: IReview = {
//   _id: null,
//   bookId: null,
//   userId: null,
//   review: null,
//   rating: null,
//   createdAt: null,
// };

// const reviewSlice = createSlice({
//     name:'review',
//     initialState,
//     reducers: {
//     }
// })

export const { addRevId } = reviewSlice.actions;

export default reviewSlice.reducer;
