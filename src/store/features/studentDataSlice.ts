import { Student } from "@/types/student";
import { createSlice } from "@reduxjs/toolkit";

const studentDataSlice = createSlice({
  name: "studentData",
  initialState: {
    studentData: [] as Student[],
  },
  reducers: {
    setStudentData: (state, action) => {
      state.studentData = action.payload;
    },
    addStudentData: (state, action) => {
      state.studentData = [action.payload, ...state.studentData];
    },
  },
});

export const { setStudentData, addStudentData } = studentDataSlice.actions;

export default studentDataSlice.reducer;
