import { Settings } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const LandingNav = ({ path, setting , type }: { path?: string, setting?: string  , type?:string}) => {
    const navigate = useNavigate();
    const handleSetting = () => {
        if (setting) {
            navigate(setting , {state:{type}});
        }
    }
    return (
        <div className="landing_navbar sticky top-0 h-15 w-full z-20">
            <nav className="flex justify-between items-center p-2 w-full h-full bg-amber-400">
                <div className="image">
                    <Link to={"/"} className="font-bold text-2xl text-blue-900">QuickAttend</Link>
                </div>
                {path ?
                    <div className="options flex justify-around items-center gap-4">
                        {setting && <Tooltip title="Setting">
                            <span onClick={handleSetting} className="text-blue-900 rounded-md transition-transform duration-300 hover:rotate-180  hover:bg-[#08088932] hover:rounded-[30px]  flex items-center justify-center w-10 h-10">
                                <Settings />
                            </span>
                        </Tooltip>}
                        <Link to={path!} className="text-blue-900 rounded-md p-1 btn">Dashboard</Link>
                    </div>


                    : <div className="options flex justify-around gap-4">
                        <Link to={"/login"} className="text-blue-900 rounded-md p-1 btn">Login</Link>
                        <Link to={"/register"} className="text-blue-900 rounded-md p-1 btn ">SignUp</Link>
                    </div>}
            </nav>
        </div>
    )
}

export default LandingNav