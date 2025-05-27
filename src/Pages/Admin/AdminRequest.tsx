const expiredRequests = [
    {
      id: 1,
      title: "Request for Extra Class",
      college: "Greenfield Institute",
      department: "Computer Science",
      reason: "Syllabus not completed",
      requestedBy: "Prof. Alice Morgan",
      date: "May 15, 2025",
      status: "Expired",
    },
    {
      id: 2,
      title: "Classroom Equipment Repair",
      college: "National Tech College",
      department: "Electronics",
      reason: "Projector not working",
      requestedBy: "Mr. David Singh",
      date: "May 10, 2025",
      status: "Expired",
    },
  ];
  
  const RequestCard = ({ request, onEdit, onDelete }: { request: any; onEdit: () => void; onDelete: () => void }) => (
    <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-blue-900">{request.title}</h3>
        <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">{request.status}</span>
      </div>
      <p className="text-sm"><strong>College:</strong> {request.college}</p>
      <p className="text-sm"><strong>Department:</strong> {request.department}</p>
      <p className="text-sm"><strong>Reason:</strong> {request.reason}</p>
      <p className="text-sm"><strong>Requested By:</strong> {request.requestedBy}</p>
      <p className="text-sm"><strong>Date:</strong> {request.date}</p>
  
      {/* Action Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 font-semibold rounded hover:bg-blue-200"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 font-semibold rounded hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
  
  const AdminRequests = () => {
    const handleEdit = (id: number) => {
      alert(`Edit Request ID: ${id}`);
      // Navigate to edit form or open modal
    };
  
    const handleDelete = (id: number) => {
      const confirmed = confirm("Are you sure you want to delete this request?");
      if (confirmed) {
        alert(`Deleted Request ID: ${id}`);
        // API call to delete
      }
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-zinc-800 mb-4">📄 Expired Requests</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expiredRequests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              onEdit={() => handleEdit(req.id)}
              onDelete={() => handleDelete(req.id)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default AdminRequests;
  