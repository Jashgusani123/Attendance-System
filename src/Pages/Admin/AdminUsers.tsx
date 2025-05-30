import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import InnerNavbar from '../../Components/Admin/InnerNavbar';
import { useGetAllUsersQuery } from '../../Redux/API/Admin';
import { Capitalize } from '../../Utils/toCapitalize';


const AdminUsers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {data:UsersData} = useGetAllUsersQuery();
    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <div className="user_con p-4">
                <InnerNavbar Name='All Users'/>
                <section className="mt-4">
                    <InfoTable title="Head of Departments" data={UsersData?.Users.Hods?UsersData?.Users.Hods:[]} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPage={rowsPerPage} />
                    <InfoTable title="Teachers" data={UsersData?.Users.Teachers?UsersData?.Users.Teachers:[]} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPage={rowsPerPage} />
                    <InfoTable title="Students" data={UsersData?.Users.Students?UsersData?.Users.Students:[]} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} rowsPerPage={rowsPerPage} />
                </section>
            </div>
        </>
    )
}
const InfoTable = ({
    title,
    data,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
}: {
    title: string;
    data: {_id:string , fullName: string; email: string; departmentName: string }[];
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
                                    <TableCell>{Capitalize(row.fullName)}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{Capitalize(row.departmentName)}</TableCell>
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

export default AdminUsers