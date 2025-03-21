
const PandingRequst = () => {
    return (
        <>
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
                <img
                    src="https://i.pinimg.com/originals/19/97/f3/1997f3da28e8d29289097871f45b04fd.gif"
                    alt="Pending GIF.."
                />
                <div className="information">
                <p className="absolute bottom-10 left-10 bg-amber-300 text-blue-900 rounded-br-2xl rounded-tl-2xl rounded-tr-2xl p-1  font-bold text-2xl text-start">
                    Request Sent To Head Of Department...
                </p>
                <p className="absolute bottom-3 left-10 bg-amber-300 text-blue-900 p-1 font-light rounded-bl-2xl rounded-br-2xl  text-start">If That HOD comfirm this Requst then this Account Created !!!</p>
                </div>
            </div>
        </>
    )
}

export default PandingRequst