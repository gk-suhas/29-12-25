import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer
} from "react";
import axios from "axios";
import {
  semesterReducer,
  initialSemesterState
} from "./SemesterReducer";

function Teacheredit() {
  // ---------- useRef ----------
  const usnRef = useRef(null);

  useEffect(() => {
    usnRef.current.focus();
  }, []);

  // ---------- Register student ----------
  const [register, setRegister] = useState({
    id: "",
    name: "",
    email: "",
    password: ""
  });

  // ---------- useReducer ----------
  const [semester, dispatch] = useReducer(
    semesterReducer,
    initialSemesterState
  );

  // ---------- USN ----------
  const [usn, setUsn] = useState("");

  // ---------- All students ----------
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/student")
      .then(res => setStudents(res.data))
      .catch(err => alert(err));
  }, []);

  // ---------- Register ----------
  function submit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:2000/student", register)
      .then(() => alert("Registered successfully"))
      .catch(err => alert(err));
  }

  // ---------- Search student ----------
  const serchStudent = useCallback(() => {
    const student = students.find(s => s.id === usn);

    if (!student) {
      alert("No student found");
      return;
    }

    if (student.semester) {
      dispatch({
        type: "SET_ALL_SEMESTER",
        payload: student.semester
      });
    } else {
      alert("No semester data found");
    }
  }, [students, usn]);

  // ---------- Update semester ----------
  const updateSemester = useCallback(() => {
    axios
      .patch(`http://localhost:2000/student/${usn}`, {
        semester: semester
      })
      .then(() => alert("Semester updated successfully"))
      .catch(err => alert(err));
  }, [usn, semester]);

  // ---------- Helper ----------
  const handleSemChange = (semIndex, semName, field, value) => {
    dispatch({
      type: "SET_MARK",
      payload: { semIndex, semName, field, value }
    });
  };

  return (
    <>
      {/* ================= REGISTER ================= */}
      <h1>REGISTER STUDENT</h1>

      <form onSubmit={submit}>
        <label>USN:</label>
        <input
          ref={usnRef}
          type="text"
          value={register.id}
          onChange={e =>
            setRegister({ ...register, id: e.target.value })
          }
          required
        />
        <br />

        <label>Name:</label>
        <input
          type="text"
          value={register.name}
          onChange={e =>
            setRegister({ ...register, name: e.target.value })
          }
        />
        <br />

        <label>Email:</label>
        <input
          type="text"
          value={register.email}
          onChange={e =>
            setRegister({ ...register, email: e.target.value })
          }
        />
        <br />

        <label>Password:</label>
        <input
          type="text"
          value={register.password}
          onChange={e =>
            setRegister({ ...register, password: e.target.value })
          }
        />
        <br />

        <button type="submit">REGISTER</button>
      </form>

      <hr />

      {/* ================= UPDATE ================= */}
      <h1>UPDATE STUDENT MARKS</h1>

      <label>Enter USN:</label>
      <input type="text" onChange={e => setUsn(e.target.value)} />
      <button onClick={serchStudent}>Search</button>

      {/* ---------- SEM 1 ---------- */}
      <h2>Semester 1</h2>
      {["sub1", "sub2", "sub3", "sgpa"].map(field => (
        <div key={field}>
          <label>{field.toUpperCase()}:</label>
          <input
            type="text"
            value={semester[0].sem1[field]}
            onChange={e =>
              handleSemChange(0, "sem1", field, e.target.value)
            }
          />
        </div>
      ))}

      {/* ---------- SEM 2 ---------- */}
      <h2>Semester 2</h2>
      {["sub1", "sub2", "sub3", "sgpa"].map(field => (
        <div key={field}>
          <label>{field.toUpperCase()}:</label>
          <input
            type="text"
            value={semester[1].sem2[field]}
            onChange={e =>
              handleSemChange(1, "sem2", field, e.target.value)
            }
          />
        </div>
      ))}

      {/* ---------- CGPA ---------- */}
      <h2>CGPA</h2>
      <input
        type="text"
        value={semester[2].cgpa}
        onChange={e =>
          dispatch({
            type: "SET_CGPA",
            payload: e.target.value
          })
        }
      />

      <br /><br />
      <button onClick={updateSemester}>Update</button>
    </>
  );
}

export default Teacheredit;
