import {
  
  getCurrentStudent,
} from "./globalAction";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userprofile: [],
  studentData: null,
  currentstudent: [],
  delstudent: [],
  teacherData: null,

  allTeacher: [],
  allStudent: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Synchronous actions
    clearError: (state) => {
      state.error = null;
    },
    clearStudents: (state) => {
      state.students = [];
    },
    setCurrentUser: (state, action) => {
      state.teacherData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginStudent.fulfilled, (state, action) => {
      state.studentData = action.payload.data.student;
    });
  
  },
});

export const { clearError, clearStudents, setCurrentUser } =
  globalSlice.actions;

export default globalSlice.reducer;
