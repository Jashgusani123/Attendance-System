import { lazy, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useDeletePandingRequstMutation } from "./Redux/API/Panding";
import { useSignupMutation } from "./Redux/API/Teacher";
import { HodExits, HodNotExits } from "./Redux/slices/HodSlices";
import { pandingExits, pandingNotExits } from "./Redux/slices/PandingSlices";
import { studentExits, studentNotExits } from "./Redux/slices/StudentSlices";
import { teacherExits, teacherNotExits } from "./Redux/slices/TeacherSlice";
import { HodReducerInitialState } from "./Types/API/HodApiType";
import { PandingReducerInitialState } from "./Types/API/PandingApiType";
import { StudentReducerInitialState } from "./Types/API/StudentApiType";
import { TeacherReducerInitialState } from "./Types/API/TeacherApiType";
import { AdminExits } from "./Redux/slices/AdminSlices";
import { AdminReducerInitialState } from "./Types/API/AdminType";


const Landing = lazy(() => import("./Pages/Landing"));
const Setting = lazy(() => import("./Pages/Setting"));
const HodSetting = lazy(() => import("./Components/HOD/Setting"));
const StudentDashboard = lazy(() => import("./Pages/Student/StudentDashboard"));
const StudentLanding = lazy(() => import("./Pages/Student/StudentLanding"));
const TeacherDashboard = lazy(() => import("./Pages/Teacher/TeacherDashboard"));
const TeacherLanding = lazy(() => import("./Pages/Teacher/TeacherLanding"));
const AttendanceSheet = lazy(() => import("./Pages/Teacher/AttendanceSheet"));
const PandingRequst = lazy(() => import("./Pages/Teacher/PandingRequst"));
const HodDashboard = lazy(() => import("./Pages/HOD/HodDashboard"));
const ViewPage = lazy(() => import("./Pages/HOD/ViewPage"));
const Manage = lazy(() => import("./Pages/HOD/Manage"));
const Analysis = lazy(() => import("./Pages/HOD/Analysis"));
const AdminSetting = lazy(() => import("./Pages/Admin/AdminSetting"));
const AdminLogin = lazy(() => import("./Pages/Admin/Login"));
const AdminRegistration = lazy(() => import("./Pages/Admin/Registration"));
const AdminDashbord = lazy(() => import("./Components/Admin/AdminDashbord"));
const AdminClasses = lazy(() => import("./Pages/Admin/AdminClasses"));
const AdminColleges = lazy(() => import("./Pages/Admin/AdminColleges"));
const AdminDepartment = lazy(() => import("./Pages/Admin/AdminDepartments"));
const AdminHome = lazy(() => import("./Pages/Admin/AdminHome"));
const AdminNotifications = lazy(() => import("./Pages/Admin/AdminNotification"));
const AdminRequests = lazy(() => import("./Pages/Admin/AdminRequest"));
const AdminUsers = lazy(() => import("./Pages/Admin/AdminUsers"));
const AdminView = lazy(() => import("./Pages/Admin/AdminView"));
const ShowAllStudent = lazy(() => import("./Pages/HOD/ShowAllStudent"));

function App() {
  const { loading: studentLoading, student } = useSelector(
    (state: { student: StudentReducerInitialState }) => state.student
  );
  const { loading: teacherLoading, teacher } = useSelector(
    (state: { teacher: TeacherReducerInitialState }) => state.teacher
  );
  const { loading: hodLoading, hod } = useSelector(
    (state: { hod: HodReducerInitialState }) => state.hod
  );
  const { loading: pandingLoading, panding } = useSelector(
    (state: { panding: PandingReducerInitialState }) => state.panding
  );
  const { loading: adminLoading, admin } = useSelector(
    (state: { admin: AdminReducerInitialState }) => state.admin
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [TeacherSignup] = useSignupMutation()
  const [DeletePandingRequest] = useDeletePandingRequstMutation();
  const user = student ? "Student" : teacher ? "Teacher" : hod ? "hod" : panding ? "Panding" : admin ? "Admin" : ""
  const loading = studentLoading || teacherLoading || hodLoading || pandingLoading || adminLoading;
  const hasSignedUp = useRef(false);
  const hasGetuser = useRef(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (hasGetuser.current) return;
        hasGetuser.current = true;
        const res = await fetch(`${import.meta.env.VITE_SERVER}/getuser`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data.type === "Student") {
          dispatch(studentExits(data.user));
        } else if (data.type === "Teacher") {
          dispatch(teacherExits(data.user));
        } else if (data.type === "Hod") {
          dispatch(HodExits(data.user));
        } else if (data.type === "Panding") {
          if (!data.user.accepted && !data.user.rejected) {
            dispatch(pandingExits(data.user));
          } else if (data.user.accepted && !data.user.rejected) {
            if (hasSignedUp.current) return;
            hasSignedUp.current = true;

            const obj = {
              fullName: data.user.fullName,
              email: data.user.email,
              password: data.user.password,
              departmentName: data.user.departmentName,
              collegeName: data.user.collegeName,
              gender: data.user.gender,
            };

            const response2 = await DeletePandingRequest(null);
            if (response2?.data?.success) {
              dispatch(pandingNotExits());
              navigate("/", { replace: true });
            }

            const response = await TeacherSignup(obj);
            if (response?.data?.success) {
              dispatch(teacherExits(response.data.user));
            }

          } else {
            const response = await DeletePandingRequest(null);
            if (response?.data?.success) {
              dispatch(pandingNotExits());
              navigate("/", { replace: true });
            }
            dispatch(pandingNotExits());
          }
        } else if (data.type === "Admin") {
          dispatch(AdminExits(data.user));
        }
        else {
          dispatch(studentNotExits());
          dispatch(teacherNotExits());
          dispatch(HodNotExits());
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
    } else if (user === "hod" && window.location.pathname !== "/hod") {
      navigate("/hod", { replace: true });
    } else if (user === "Panding" && window.location.pathname !== "/requstsend") {
      navigate("/requstsend", { replace: true });
    } else if (user === "Admin" && window.location.pathname !== "/admin") {
      navigate("/admin", { replace: true });
    }
    else if (!user && !["/login", "/register", , "/admin/login", "/admin/registraction"].includes(window.location.pathname)) {
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
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/registraction" element={<AdminRegistration />} />
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

          {user === "Admin" && (  
            <>
              <Route path="/admin" element={<AdminDashbord Component={AdminHome} />} />
              <Route path="/admin/colleges" element={<AdminDashbord Component={AdminColleges} />} />
              <Route path="/admin/colleges/view" element={<AdminDashbord Component={AdminView} />} />
              <Route path="/admin/departments" element={<AdminDashbord Component={AdminDepartment} />} />
              <Route path="/admin/users" element={<AdminDashbord Component={AdminUsers} />} />
              <Route path="/admin/classes" element={<AdminDashbord Component={AdminClasses} />} />
              <Route path="/admin/requests" element={<AdminDashbord Component={AdminRequests} />} />
              <Route path="/admin/notifications" element={<AdminDashbord Component={AdminNotifications} />} />
              <Route path="/admin/setting" element={<AdminDashbord Component={AdminSetting} />} />
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
          {/* hod Route */}
          {user === "hod" && (
            <>
              <Route path="/hod" element={<HodDashboard />} />
              <Route path="/hod/manage" element={<Manage />} />
              <Route path="/hod/view" element={<ViewPage />} />
              <Route path="/hod/analysis" element={<Analysis />} />
              <Route path="/hod/setting" element={<HodSetting />} />
              <Route path="/hod/student_list" element={<ShowAllStudent />} />
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
