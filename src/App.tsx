import "./App.css";
import { Box, Typography, Input, Select, Button, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
import { Campus, Grade, numberToGradeOrEmpty } from "./types_and_helpers";

interface IStudent {
  name: string;
  grade: Grade;
  campus: Campus;
  medicaidOnly: boolean;
}

const databaseStudents: IStudent[] = [
  {
    name: "Iron Maiden",
    grade: 4,
    campus: Campus["Familiar Campus"],
    medicaidOnly: false,
  },
  {
    name: "Grateful Dead",
    grade: 9,
    campus: Campus["Impressive Campus"],
    medicaidOnly: true,
  },
  {
    name: "Avenged Sevenfold",
    grade: 1,
    campus: Campus["Optimal Campus"],
    medicaidOnly: false,
  },
];

function App() {
  // state: filters
  const [grade, setGrade] = useState<Grade | "">("");
  const [campus, setCampus] = useState<Campus | null>(null);
  const [medicaidOnly, setMedicaidOnly] = useState<boolean>(false);

  // state: students
  const [students, setStudents] = useState<IStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);

  // API SIM
  useEffect(() => {
    setStudents(databaseStudents);
  }, []);

  // FILTER APPLIER (called on any filter change)
  useEffect(() => {
    // deep clone new instance of all students
    let studs = [...students] as IStudent[];

    // apply filters
    if (grade !== "") {
      studs = studs.filter((s: IStudent) => s.grade === grade);
    }
    if (campus !== null) {
      studs = studs.filter((s: IStudent) => s.campus === campus);
    }
    if (medicaidOnly) {
      studs = studs.filter((s: IStudent) => s.medicaidOnly);
    }

    setFilteredStudents(studs);
  }, [students, grade, campus, medicaidOnly]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Typography variant="body1">Grade</Typography>
        <Input value={grade} onChange={(e) => setGrade(numberToGradeOrEmpty(+e.target.value))} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox onClick={() => setMedicaidOnly(!medicaidOnly)} />
        <Typography variant="body2">Medicaid Only?</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Typography variant="body1">Campus</Typography>
        <Select>
          <Button onClick={() => setCampus(Campus["Optimal Campus"])}>Optimal Campus</Button>
          <Button onClick={() => setCampus(Campus["Familiar Campus"])}>Familiar Campus</Button>
          <Button onClick={() => setCampus(Campus["Impressive Campus"])}>Impressive Campus</Button>
        </Select>
        <Typography variant="body1">(Selection: {campus?.toString()})</Typography>
      </Box>
      <Typography variant="h1">My Caseload</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {filteredStudents.map((s: IStudent, i) => (
          <StudentCard key={i} student={s} />
        ))}
      </Box>
    </Box>
  );
}

function StudentCard(props: { student: IStudent }) {
  const { student } = props;
  return (
    <Box sx={{ border: "1px solid black" }}>
      <Typography>{student.name}</Typography>
      <Typography>{Campus[student.campus]}</Typography>
      <Typography>Grade: {student.grade}</Typography>
      <Typography>{student.medicaidOnly ? "Is medicaid only" : ""}</Typography>
    </Box>
  );
}

export default App;
