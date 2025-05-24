import { useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import LandingNav from "../../Components/LandingNav";
import socket from "../../Components/Socket";
import { StudentReducerInitialState } from "../../Types/API/StudentApiType";
import DashBordImage from "../../assets/DashBordImage.jpg";
import { Capitalize, WordsCapitalize } from "../../Utils/toCapitalize";

const StudentLanding = () => {
  const { loading: studentLoading, student } = useSelector(
    (state: { student: StudentReducerInitialState }) => state.student
  );

  const handleClickToDashBord = ()=>{
    socket.connect();
    socket.emit("register-student" , student?.enrollmentNumber)
  }
  return studentLoading ? <>Loading .....</> : (
    <>
      <div className="DashbordLanding_Container h-screen w-full relative overflow-hidden">

        {/* Navbar */}
        <LandingNav path={"/student/dashboard"} setting={"/student/setting"} type="Student" home="/student" handleClickToDashBord={handleClickToDashBord}/>

        {/* Main Section */}
        <section className="h-[33vh] flex justify-center  items-center flex-wrap md:h-screen md:mt-2">

          {/* Left Side */}
          <div className="left w-full md:w-1/2 h-full flex items-center p-4 justify-center relative z-10">
            <p className="lg:text-[30px] font-bold text-gray-800 text-2xl">
              <span className="text-blue-600">
                <Typewriter
                  words={["Hello ,", `${WordsCapitalize(student!, "fullName")} !!`]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
              <br />
              &nbsp;&nbsp;&nbsp;Simplify attendance tracking! 📚✅ Log students instantly, manage records digitally.⏰📈🚀
            </p>
          </div>

          {/* Right Side with Image */}
          <div className="right w-full md:w-1/2 h-full relative overflow-hidden">
            {/* Main Image */}
            <img
              src={DashBordImage}
              alt="Dashboard"
              className="w-full h-full object-contain right_img"
            />
          </div>

        </section>
      </div>
    </>
  );
};

export default StudentLanding;
