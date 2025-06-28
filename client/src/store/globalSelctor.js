import { createSelector } from "@reduxjs/toolkit";

// Input selector
const globlState = (state) => state.global;

// Memoized selector
export const studentDataSelector = createSelector(
  [globlState],
  (state) => state.studentData
);




