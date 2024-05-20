import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  voterData: {},
  isVoterAuthenticated: false,
  allVotersData: [],
  currentVoterData: {},
};

const voterSlice = createSlice({
  name: "voter",
  initialState,
  reducers: {
    setVoterData: (state, action) => {
      state.voterData = action.payload;
      state.allVotersData.push(action.payload);
    },
    setCurrentVoterData: (state, action) => {
      state.currentVoterData = action.payload;
    },
    setAllVotersData: (state, action) => {
      state.allVotersData = action.payload;
    },
    setVoterAuthenticated: (state, action) => {
      state.isVoterAuthenticated = action.payload;
    },
  },
});

export const {
  setVoterData,
  setAllVotersData,
  setVoterAuthenticated,
  setCurrentVoterData,
} = voterSlice.actions;

export default voterSlice.reducer;
