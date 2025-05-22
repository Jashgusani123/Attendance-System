import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ShowAllStudent from "./Pages/Admin/ShowAllStudent";
import { adminExits, adminNotExits } from "./Redux/slices/AdminSlices";
import { pandingExits, pandingNotExits } from "./Redux/slices/PandingSlices";
import { studentExits, studentNotExits } from "./Redux/slices/StudentSlices";
import { teacherExits, teacherNotExits } from "./Redux/slices/TeacherSlice";
import { AdminReducerInitialState } from "./Types/API/AdminApiType";
import { PandingReducerInitialState } from "./Types/API/PandingApiType";
import { StudentReducerInitialState } from "./Types/API/StudentApiType";
import { TeacherReducerInitialState } from "./Types/API/TeacherApiType";
import { useSignupMutation } from "./Redux/API/Teacher";
import { useDeletePandingRequstMutation } from "./Redux/API/Panding";


const Landing = lazy(() => import("./Pages/Landing"));
const Setting = lazy(() => import("./Pages/Setting"));
const AdminSetting = lazy(() => import("./Components/Admin/Setting"));
const StudentDashboard = lazy(() => import("./Pages/Student/StudentDashboard"));
const StudentLanding = lazy(() => import("./Pages/Student/StudentLanding"));
const TeacherDashboard = lazy(() => import("./Pages/Teacher/TeacherDashboard"));
const TeacherLanding = lazy(() => import("./Pages/Teacher/TeacherLanding"));
const AttendanceSheet = lazy(() => import("./Pages/Teacher/AttendanceSheet"));
const PandingRequst = lazy(() => import("./Pages/Teacher/PandingRequst"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const ViewPage = lazy(() => import("./Pages/Admin/ViewPage"));
const Manage = lazy(() => import("./Pages/Admin/Manage"));
const Analysis = lazy(() => import("./Pages/Admin/Analysis"));

function App() {
  const { loading: studentLoading, student } = useSelector(
    (state: { student: StudentReducerInitialState }) => state.student
  );
  const { loading: teacherLoading, teacher } = useSelector(
    (state: { teacher: TeacherReducerInitialState }) => state.teacher
  );
  const { loading: adminLoading, admin } = useSelector(
    (state: { admin: AdminReducerInitialState }) => state.admin
  );
  const { loading: pandingLoading, panding } = useSelector(
    (state: { panding: PandingReducerInitialState }) => state.panding
  );


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [TeacherSignup] = useSignupMutation()
  const [DeletePandingRequest] = useDeletePandingRequstMutation();
  const user = student ? "Student" : teacher ? "Teacher" : admin ? "Admin" : panding ? "Panding" : ""
  const loading = studentLoading || teacherLoading || adminLoading || pandingLoading;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER}/getuser`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.type === "Student") {
          dispatch(studentExits(data.user)); 
        } else if (data.type === "Teacher") {
          dispatch(teacherExits(data.user)); 
        } else if (data.type === "Admin") {
          dispatch(adminExits(data.user));
        } else if (data.type === "Panding") {
          if (!data.user.accepted && !data.user.rejected) {
            dispatch(pandingExits(data.user));
          } else if(data.user.accepted && !data.user.rejected){
            const obj = {
              fullName: data.user.fullName,
              email: data.user.email,
              password: data.user.password,
              departmentName: data.user.departmentName,
              collegeName: data.user.collegeName,
              gender: data.user.gender
            }
            const response = await TeacherSignup(obj);
            if(response && "data" in response && response.data?.success){
              dispatch(teacherExits(response.data.user))
            }
            dispatch(pandingNotExits());
          }else{
            const response = await DeletePandingRequest(null);
            if(response && "data" in response && response.data?.success){
              dispatch(pandingNotExits());
                navigate("/", { replace: true });
            }
            dispatch(pandingNotExits());
          }
        }
        else {
          dispatch(studentNotExits())
          dispatch(teacherNotExits())
          dispatch(adminNotExits())
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
    } else if (user === "Admin" && window.location.pathname !== "/admin") {
      navigate("/admin", { replace: true });
    } else if (user === "Panding" && window.location.pathname !== "/requstsend") {
      navigate("/requstsend", { replace: true });
    }
    else if (!user && !["/login", "/register"].includes(window.location.pathname)) {
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
            </>
          )}

          {/* Teacher Routes */}
          {user === "Teacher" && (
            <>
              <Route path="/teacher" element={<TeacherLanding />} />
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/setting" element={<Setting />} />
              <Route path="/attendance" element={<AttendanceSheet />} />
            </>
          )}
          {/* Panding Routes */}
          {user === "Panding" && (
            <>
              <Route path="/requstsend" element={<PandingRequst />} />
            </>
          )}
          {/* Admin Route */}
          {user === "Admin" && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/manage" element={<Manage />} />
              <Route path="/admin/view" element={<ViewPage />} />
              <Route path="/admin/analysis" element={<Analysis />} />
              <Route path="/admin/setting" element={<AdminSetting />} />
              <Route path="/admin/student_list" element={<ShowAllStudent />} />
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
