import { Settings } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const LandingNav = ({ 
    path, 
    setting, 
    type, 
    home, 
    handleClickToDashBord 
}: { 
    path?: string, 
    setting?: string, 
    type?: string, 
    home?: string, 
    handleClickToDashBord?: () => void 
}) => {
    const navigate = useNavigate();

    const handleSetting = () => {
        if (setting) {
            navigate(setting, { state: { type } });
        }
    };

    const handleDashboardClick = () => {
        if (handleClickToDashBord) {
            handleClickToDashBord(); // Execute the provided function
        }
        if (path) {
            navigate(path , {state:{type}}); // Navigate to the dashboard
        }
    };

    return (
        <div className="landing_navbar sticky top-0 h-15 w-full z-20">
            <nav className="flex justify-between items-center p-2 w-full h-full bg-amber-400">
                <div className="image">
                    <Link to={home ? home : "/"} className="font-bold text-2xl text-blue-900">
                        QuickAttend
                    </Link>
                </div>
                {path ? (
                    <div className="options flex justify-around items-center gap-4">
                        {setting && (
                            <Tooltip title="Setting">
                                <span
                                    onClick={handleSetting}
                                    className="text-blue-900 rounded-md flex items-center justify-center w-10 h-10 cursor-pointer"
                                >
                                    <Settings className="setting-icon" />
                                </span>
                            </Tooltip>
                        )}
                        <span onClick={handleDashboardClick} className="text-blue-900 rounded-md p-1 btn cursor-pointer">
                            Dashboard
                        </span>
                    </div>
                ) : (
                    <div className="options flex justify-around gap-4">
                        <Link to={"/login"} className="text-blue-900 rounded-md p-1 btn">
                            Login
                        </Link>
                        <Link to={"/register"} className="text-blue-900 rounded-md p-1 btn">
                            SignUp
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default LandingNav;
