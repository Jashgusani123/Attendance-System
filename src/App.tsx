import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { studentExits, studentNotExits } from "./Redux/slices/StudentSlices";
import { teacherExits, teacherNotExits } from "./Redux/slices/TeacherSlice";
import { StudentReducerInitialState } from "./Types/API/StudentApiType";
import { TeacherReducerInitialState } from "./Types/API/TeacherApiType";

const AttendanceSheet = lazy(() => import("./Pages/AttendanceSheet"));
const Landing = lazy(() => import("./Pages/Landing"));
const Setting = lazy(() => import("./Pages/Setting"));
const StudentDashboard = lazy(() => import("./Pages/StudentDashboard"));
const StudentLanding = lazy(() => import("./Pages/StudentLanding"));
const TeacherDashboard = lazy(() => import("./Pages/TeacherDashboard"));
const TeacherLanding = lazy(() => import("./Pages/TeacherLanding"));
const Notificaiton = lazy(()=>import("./Pages/Notification"))

function App() {
  const { loading: studentLoading, student } = useSelector(
    (state: { student: StudentReducerInitialState }) => state.student
  );
  const { loading: teacherLoading, teacher } = useSelector(
    (state: { teacher: TeacherReducerInitialState }) => state.teacher
  );
  // console.log(student);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = studentLoading || teacherLoading ;
  const user = student ? "Student" : teacher ? "Teacher" : "";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER}/getuser`, {
          method: "GET",
          credentials: "include",
        });
  
        const data = await res.json();
        // console.log("Fetched User Data:", data); // ✅ Log API response
  
        if (data.type === "Student") {
          dispatch(studentExits(data.user)); // ✅ Ensure this runs
          // console.log("Dispatched student:", data.user);
        } else if (data.type === "Teacher") {
          dispatch(teacherExits(data.user)); // ✅ Ensure this runs
          // console.log("Dispatched teacher:", data.user);
        }else {
          dispatch(studentNotExits());
          dispatch(teacherNotExits());
        }
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    };
  
    fetchUser();
  }, []);

  useEffect(() => {
  
      if (user === "Student" && window.location.pathname !== "/student") {
        navigate("/student", { replace: true });
      } else if (user === "Teacher" && window.location.pathname !== "/teacher") {
        navigate("/teacher", { replace: true });
      } else if (!user && !["/login", "/register"].includes(window.location.pathname)) {
        navigate("/", { replace: true });
      }
  
  }, [user]);  // ✅ Run whenever `user` updates
  

  return (
    <>
      {loading ? (
        <div>Loading...</div> // Show loading state
      ) : (
        <Routes>
          {/* Public Routes */}
          {!user && (
            <>
              <Route path="/" element={<Landing login={false} register={false} />} />
              <Route path="/login" element={<Landing login={true} register={false} />} />
              <Route path="/register" element={<Landing register={true} login={false} />} />
            </>
          )}

          {/* Student Routes */}
          {user === "Student" && (
            <>
              <Route path="/student" element={<StudentLanding />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/setting" element={<Setting />} />
              <Route path="/student/notification" element={<Notificaiton />} />
            </>
          )}

          {/* Teacher Routes */}
          {user === "Teacher" && (
            <>
              <Route path="/teacher" element={<TeacherLanding />} />
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/setting" element={<Setting />} />
              <Route path="/attendance" element={<AttendanceSheet />} />
              <Route path="/teacher/notification" element={<Notificaiton />} />
            </>
          )}

          {/* 404 Page */}
          <Route path="*" element={<>Sorry, page not found</>} />
        </Routes>
      )}
    </>
  );
}

export default App;
