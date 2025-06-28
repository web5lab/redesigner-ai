import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";



//  student api section
export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (studentData, { rejectWithValue }) => {
    console.log("student add call");
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        phone,
        role,
        dateOfBirth,
        parentName,
        address,
      } = studentData;

      const response = await axiosInstance.post(
        "/addstudent",
        {
          email,
          password,
          firstName,
          lastName,
          phone,
          role,
          dateOfBirth,
          parentName,
          address,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      console.log("err =>", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add student";
      return rejectWithValue(errorMessage);
    }
  }
);



