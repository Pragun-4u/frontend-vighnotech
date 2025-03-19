import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setStudentData } from "@/store/features/studentDataSlice";
import { RootState } from "@/store/store";
import { Student } from "@/types/student";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ListTable() {
  const { permission } = useSelector((store: RootState) => store.loginSlice);
  const [students, setStudents] = useState<Student[]>([]);
  const { studentData } = useSelector(
    (store: RootState) => store.studentDataSlice
  );
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const getData = async () => {
    const data = await fetch(`db/students_data.json`);
    const res = await data?.json();

    setStudents(res?.students);
    dispatch(setStudentData(res?.students));
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Pagination Handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(students.length / studentsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleDelete = (id: number) => {
    const completedUpdatedStudents = studentData.filter(
      (student) => student?.id !== id
    );
    const paginatedStudents = students.filter((student) => student.id !== id);
    setStudents(paginatedStudents);
    dispatch(setStudentData(completedUpdatedStudents));
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of student.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>MARKS</TableHead>
            {permission.length > 0 && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell className="text-center">
                {student.roll_number}
              </TableCell>
              <TableCell className="text-center">{student.class}</TableCell>
              <TableCell className="text-center">{student.section}</TableCell>
              <TableCell className="text-center">
                {student.attendance}
              </TableCell>
              <TableCell>
                <div className="flex gap-2 text-center flex-col">
                  {Object.entries(student.marks as Record<string, number>).map(
                    ([subject, marks]) => (
                      <div key={subject}>
                        {subject}: {marks}
                      </div>
                    )
                  )}
                </div>
              </TableCell>
              <TableCell>
                {permission.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-500  px-2 py-1 rounded-md"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <span className="font-semibold text-lg">Page {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(students.length / studentsPerPage)}
          className={`px-4 py-2 rounded-md ${
            currentPage >= Math.ceil(students.length / studentsPerPage)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}
