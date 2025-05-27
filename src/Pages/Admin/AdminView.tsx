import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const colleges = [
    {
        id: 1,
        name: "ABC Engineering College",
        logo: "https://png.pngtree.com/png-vector/20230303/ourmid/pngtree-education-and-college-logo-design-template-vector-png-image_6627789.png",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSgg2_55kmn9bL9aE4dyljGN7nfyX1ehuvig&s",
        place: "Chennai, Tamil Nadu",
        category: "Engineering",
        departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL"],
        hods: 4,
        teachers: 15,
        students: 412
    },
];

const hodData = [
    { name: "Dr. A Kumar", email: "akumar@college.edu", department: "CSE" },
    { name: "Dr. B Sharma", email: "bsharma@college.edu", department: "ECE" },
    { name: "Dr. C Iyer", email: "ciyer@college.edu", department: "EEE" },
];

const teacherData = [
    { name: "Prof. R Singh", email: "rsingh@college.edu", department: "CSE" },
    { name: "Prof. M Roy", email: "mroy@college.edu", department: "ECE" },
    { name: "Prof. P Nair", email: "pnair@college.edu", department: "MECH" },
];

const studentData = [
    { name: "Anjali", email: "anjali@student.edu", department: "CSE" },
    { name: "Ravi", email: "ravi@student.edu", department: "ECE" },
    { name: "Kiran", email: "kiran@student.edu", department: "EEE" },
];

const AdminView = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state?.id;
    const college = colleges.find((c) => c.id === id);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex cursor-pointer items-center text-blue-700 hover:text-blue-900 transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            {college ? (
                <div>
                    <div className="flex mb-2 items-center gap-4">
                        <img
                            src={college.logo}
                            alt={`${college.name} logo`}
                            className="w-12 h-12 rounded-full border"
                        />
                        <h1 className="text-2xl font-bold text-zinc-800">{college.name}</h1>
                    </div>

                    <hr className="my-4" />

                    <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8">
                        <img
                            src={college.image}
                            alt={`${college.name} banner`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <h2 className="text-2xl font-bold">{college.name}</h2>
                            <p className="text-sm">{college.place}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 p-4 bg-zinc-100 rounded-2xl">
                        <h1 className="text-2xl font-extrabold font-mono">Information:-</h1>
                        <div className="flex justify-around">
                            <div className="text-sm bg-sky-200 p-4 rounded-xl text-zinc-700 space-y-2">
                                <p className="font-semibold text-xl">📍 Place: {college.place}</p>
                                <p className="font-semibold text-xl">🏷️ Category: {college.category}</p>
                                <p className="font-semibold text-xl">🎓 Departments: {college.departments.join(', ')}</p>
                            </div>
                            <div className="text-sm bg-sky-200 p-4 rounded-xl text-zinc-700 space-y-2">
                                <p className="font-semibold text-xl">🤵🏻‍♂️ Head Of Departments: {college.hods}</p>
                                <p className="font-semibold text-xl">👨🏻‍🏫 Teachers: {college.teachers}</p>
                                <p className="font-semibold text-xl">🙎🏻 Students: {college.students}</p>
                            </div>
                        </div>
                    </div>

                    <section className="mt-4">
                        <InfoTable title="Head of Departments" data={hodData} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPage={rowsPerPage} />
                        <InfoTable title="Teachers" data={teacherData} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPage={rowsPerPage} />
                        <InfoTable title="Students" data={studentData} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPage={rowsPerPage} />
                    </section>
                </div>
            ) : (
                <p className="text-red-500">College not found.</p>
            )}
        </div>
    );
};

const InfoTable = ({
    title,
    data,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
}: {
    title: string;
    data: { name: string; email: string; department: string }[];
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <section className="mt-6">
            <h1 className="text-lg font-bold text-zinc-800 mb-2">{title}</h1>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label={`${title} table`}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: "#a8a8a8" }}>Name</TableCell>
                                <TableCell style={{ backgroundColor: "#a8a8a8" }}>Email</TableCell>
                                <TableCell style={{ backgroundColor: "#a8a8a8" }}>Department</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.department}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </Paper>
        </section>
    );
};

export default AdminView;
