import { useNavigate } from "react-router-dom";
import { useDeletePandingRequstMutation } from "../../Redux/API/Panding";
import { useDispatch } from "react-redux";
import { pandingNotExits } from "../../Redux/slices/PandingSlices";

const PandingRequst = () => {
    const [DeletePandingRequest] = useDeletePandingRequstMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deletePandingRequestFunc = async () => {
        try {
            const response = await DeletePandingRequest(null);
            if (response && "data" in response && response.data.success) {
                dispatch(pandingNotExits());
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
            {/* GIF */}
            <img
                src="https://i.pinimg.com/originals/19/97/f3/1997f3da28e8d29289097871f45b04fd.gif"
                alt="Pending GIF.."
            />

            {/* Information Container */}
            <div className="absolute bottom-10 left-[25%] transform -translate-x-1/2 flex flex-col items-center space-y-2 w-full px-4">
                <div className="Information flex flex-wrap flex-col">
                    <p className="bg-amber-300 text-blue-900 rounded-br-2xl rounded-tr-2xl p-2 font-bold text-xl text-center">
                        Request Sent To Head Of Department...
                    </p>
                    <p className="bg-amber-300 text-blue-900 p-2 text-[10px] rounded-br-2xl text-start w-11/12 max-w-md">
                        If the HOD confirms this request, then this account will be created!
                    </p>
                </div>

                {/* Button */}
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-red-700 transition" onClick={deletePandingRequestFunc}>
                    Delete Request
                </button>
            </div>
        </div>
    );
};

export default PandingRequst;
