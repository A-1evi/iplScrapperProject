import { configureStore } from "@reduxjs/toolkit";
import pointsTableReducer from "./pointsTableSlice";
import fixtureReducer from "./fixtureSlice";

export const store = configureStore({
  reducer: {
    pointsTable: pointsTableReducer,
    fixtures: fixtureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
