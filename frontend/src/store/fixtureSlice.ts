import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FixtureEntry {
  matchNo: string;
  date: string;
  time: string;
  venue: string;
  team1: string;
  team2: string;
  team1Logo: string;
  team2Logo: string;
}

interface FixtureState {
  data: FixtureEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: FixtureState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchFixtures = createAsyncThunk("fixtures/fetch", async () => {
  const response = await axios.get("http://localhost:3000/api/fixtures");
  return response.data;
});

const fixtureSlice = createSlice({
  name: "fixtures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFixtures.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFixtures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fixtures";
      });
  },
});

export default fixtureSlice.reducer;
