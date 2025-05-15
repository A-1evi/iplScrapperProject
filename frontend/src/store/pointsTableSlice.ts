import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PointsTableEntry {
  position: number;
  team: string;
  teamLogo: string;
  played: number;
  wins: number;
  losses: number;
  points: number;
  nrr: string;
}

interface PointsTableState {
  data: PointsTableEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: PointsTableState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPointsTable = createAsyncThunk(
  "pointsTable/fetch",
  async () => {
    const response = await axios.get("http://localhost:3000/api/points-table");
    
    const validData = response.data.filter(
      (item: PointsTableEntry) =>
        item && item.team && item.position && item.position > 0
    );
    return validData;
  }
);

const pointsTableSlice = createSlice({
  name: "pointsTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPointsTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPointsTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPointsTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch points table";
      });
  },
});

export default pointsTableSlice.reducer;
