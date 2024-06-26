import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  postItem: localStorage.getItem("postItems")
    ? JSON.parse(localStorage.getItem("postItems"))
    : [],
};

export const PostSlice = createSlice({
  initialState,
  name: "postSlice",
  reducers: {
    setPostItem: (state, action) => {
      // action.payload'dan gelen item'ı değişkene atar.
      const item = action.payload;

      // state.postItem içindeki item'lar arasında, action.payload'dan gelen item'ın var olup olmadığını kontrol eder.
      const isPostExist = state.postItem.find((i) => i.post === item.post);

      // Eğer item zaten varsa, mevcut item'ı günceller. Yoksa hiçbir işlem yapmaz.
      if (isPostExist) {
        // state.postItem içindeki her bir item'ı kontrol eder. Eğer mevcut item ile aynı post'a sahipse, yeni item ile değiştirir.
        state.postItem = state.postItem.map((i) =>
          i.post === isPostExist.post ? item : i
        );
      } else {
        state.postItem = [...state.postItem, item];
      }
      localStorage.setItem("postItems", JSON.stringify(state.postItem));
    },
    removePost: (state, action) => {
      (state.postItem = state.postItem.filter(
        (i) => i.post !== action.payload
      )),
        localStorage.setItem("postItems", JSON.stringify(state.postItem));
    },
  },
});

export default PostSlice.reducer;
export const { removePost, setPostItem } = PostSlice.actions;
