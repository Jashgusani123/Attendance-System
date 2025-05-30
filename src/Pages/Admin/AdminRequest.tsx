import { useDeleteRequestMutation, useGetRequestsQuery } from "../../Redux/API/Admin";
import { Capitalize } from "../../Utils/toCapitalize";



const RequestCard = ({ request, onDelete }: { request: any; onDelete: () => void }) => (
  <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-blue-900">{request.title}</h3>
      <span className={`text-xs font-semibold ${request.status === "Working" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded`}>{request.status}</span>
    </div>
    <p className="text-sm"><strong>College:</strong> {Capitalize(request.college)}</p>
    <p className="text-sm"><strong>Department:</strong> {Capitalize(request.department)}</p>
    <p className="text-sm"><strong>Reason:</strong> {Capitalize(request.reason)}</p>
    <p className="text-sm"><strong>Requested By:</strong> {Capitalize(request.requestedTo)}</p>
    <p className="text-sm"><strong>Date:</strong> {request.date}</p>

    {/* Action Buttons */}
    <div className="flex gap-2 mt-3">

      <button
        onClick={onDelete}
        className="px-3 py-1 text-sm bg-red-100 cursor-pointer text-red-700 font-semibold rounded hover:bg-red-200"
      >
        Delete
      </button>
    </div>
  </div>
);

const AdminRequests = () => {
  const { data: Requests } = useGetRequestsQuery();
  const [DeleteRequest] = useDeleteRequestMutation();
  const handleDelete = async (id: String) => {
    const confirmed = confirm("Are you sure you want to delete this request?");
    if (confirmed) {
      alert(`Deleted Request ID: ${id}`);
      try {
        const response = await DeleteRequest(id)
        if (response.data?.success) {
          alert("Success!!");
        }
      } catch {
        alert("Error!!")
      }
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-zinc-800 mb-4">📄 Expired Requests</h1>

      {(Requests?.data && Requests?.data.length > 0) ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Requests?.data.map((req) => (
          <RequestCard
            key={Number(req.id)}
            request={req}
            onDelete={() => handleDelete(req.id)}
          />
        ))}
      </div> : <p className="text-zinc-500 h-full flex justify-center items-center w-full">Nothing Available...</p>}
    </div>
  );
};

export default AdminRequests;
