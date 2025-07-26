import { Typewriter } from "react-simple-typewriter";
import DashBordImage from "../assets/DashBordImage.jpg";
import loginImage from '../assets/Login.png';
import SignupImage from '../assets/signup.png';
import LandingNav from "../Components/LandingNav";
import LoginForm from "../Components/Login";
import SignUpForm from "../Components/SignUp";

const Landing = ({ login, register }: { login: boolean, register: boolean }) => {

  return (
    <>
      {login && <div className="DashbordLanding_Container h-screen w-full relative z-10">
        {/* Navbar */}
        <LandingNav home="/"/>

        <section className="h-fit flex justify-between relative overflow-hidden pt-6 rounded-3xl bg-[#f8eee3] items-center  flex-wrap">
          <div className="balls"></div>
          <LoginForm />
          <div className="right">
            <img src={loginImage} alt="" className="loginFormsImage" />
          </div>
          <div className="downBalls"></div>
        </section>

      </div>}

      {register && (
        <div className="DashbordLanding_Container h-screen w-full relative z-10">
          {/* Navbar */}
          <LandingNav home="/"/>

          <section className="min-h-screen flex justify-around flex-wrap relative overflow-hidden rounded-3xl pt-6 bg-[#f8eee3] items-center">
            <div className="balls"></div>
            <SignUpForm />
            {/* Right Side (Image) */}
            <div className="right w-1/2">
              <img src={SignupImage} alt="" className="signupFormsImage h-auto" />
            </div>

            <div className="downBalls"></div>
          </section>
        </div>
      )}

      {!register && !login && <div className="DashbordLanding_Container overflow-hidden h-screen w-full relative">
        {/* Navbar */}
        <LandingNav />

        {/* Main Section */}
        <section className="h-[33vh] flex justify-center items-center flex-wrap md:h-screen md:mt-2">

          {/* Left Side */}
          <div className="left w-full md:w-1/2 h-full flex items-center justify-center relative z-10">
            <p className="lg:text-[30px] font-bold text-gray-800 text-2xl">
              <span className="text-blue-600">
                <Typewriter
                  words={["Welcome ,", "Teacher And", "Students.."]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
              <br />
              &nbsp;&nbsp;&nbsp;This is <span className="text-amber-400">QuickAttend</span> Website, <br /> <span className="text-amber-400">Smart Attendance System</span>.
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

      </div>}

    </>
  );
};

export default Landing;
