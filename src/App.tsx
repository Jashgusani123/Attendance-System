import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './Pages/Landing'
import StudentDashboard from './Pages/StudentDashboard'
import StudentLanding from './Pages/StudentLanding'
import TeacherDashboard from './Pages/TeacherDashboard'
import Setting from './Pages/Setting'
import TeacherLanding from './Pages/TeacherLanding'
import AttendanceSheet from './Pages/AttendanceSheet'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing login={false} register={false}/>} />
        <Route path='/login' element={<Landing login={true} register={false}/>}/>
        <Route path='/register' element={<Landing register={true} login={false}/>}/>
        <Route path='/student' element={<StudentLanding />}/>
        <Route path='/teacher' element={<TeacherLanding />}/>
        <Route path='/student/dashboard' element={<StudentDashboard />}/>
        <Route path='/teacher/dashboard' element={<TeacherDashboard />}/>
        <Route path='/student/setting' element={<Setting />}/>
        <Route path='/teacher/setting' element={<Setting />}/>
        <Route path='/attendance' element={<AttendanceSheet />}/>
      </Routes>
    </>
  )
}

export default App
