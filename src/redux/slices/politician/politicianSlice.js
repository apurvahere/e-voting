import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  politicianData: {},
  isPoliticianAuthenticated: false,
  allPoliticianData: [],
  currentPoliticianData: {},
};

const politicianSlice = createSlice({
  name: "politician",
  initialState,
  reducers: {
    setPoliticianData: (state, action) => {
      state.politicianData = action.payload;
      state.allPoliticianData.push(action.payload);
    },
    setCurrentPoliticianData: (state, action) => {
      state.currentPoliticianData = action.payload;
    },
    setPoliticianAuthenticated: (state, action) => {
      state.isPoliticianAuthenticated = action.payload;
    },
  },
});

export const {
  setPoliticianData,
  setPoliticianAuthenticated,
  setCurrentPoliticianData,
} = politicianSlice.actions;

export default politicianSlice.reducer;
