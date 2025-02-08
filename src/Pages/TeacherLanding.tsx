import { Typewriter } from "react-simple-typewriter";
import LandingNav from "../Components/LandingNav";
import DashBordImage from "../assets/DashBordImage.jpg";

const TeacherLanding = () => {
  return (
    <>
      <div className="DashbordLanding_Container h-screen w-full relative overflow-hidden">
        {/* Navbar */}
        <LandingNav path={"/teacher/dashboard"} setting={"/teacher/setting"} type="Teacher" />

        {/* Main Section */}
        <section className="h-[33vh] flex justify-center items-center flex-wrap md:h-screen md:mt-2">

          {/* Left Side */}
          <div className="left w-full md:w-1/2 p-4 h-full flex items-center justify-center relative z-10">
            <p className="lg:text-[30px] font-bold text-gray-800 text-2xl">
              <span className="text-blue-600">
                <Typewriter
                  words={["Hello ,", "Jash Gusani !!"]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
              <br />
              &nbsp;&nbsp;&nbsp;"Enhance teaching efficiency! 🍎📚 Streamline lesson plans, track student progress, and stay organized with digital tools. 📊💻🚀"
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

export default TeacherLanding;
