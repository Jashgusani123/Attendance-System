import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { motion } from "framer-motion";
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
interface Column {
  id: 'college' | 'departments' | 'hods' | 'teachers' | 'students';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'college', label: 'College Name', minWidth: 150 },
  { id: 'departments', label: 'Departments', minWidth: 100, align: 'center' },
  { id: 'hods', label: 'HODs', minWidth: 100, align: 'center' },
  { id: 'teachers', label: 'Teachers', minWidth: 100, align: 'center' },
  { id: 'students', label: 'Students', minWidth: 100, align: 'center' },
];


interface Data {
  college: string;
  departments: number;
  hods: number;
  teachers: number;
  students: number;
}

function createData(
  college: string,
  departments: number,
  hods: number,
  teachers: number,
  students: number
): Data {
  return { college, departments, hods, teachers, students };
}

const rows = [
  createData('ABC College', 5, 5, 35, 450),
  createData('XYZ Institute', 8, 8, 60, 900),
  createData('PQR University', 10, 10, 80, 1200),
  createData('LMN College', 4, 4, 28, 350),
  createData('DEF Institute', 6, 6, 40, 600),
  createData('UVW Academy', 3, 3, 22, 300),
  createData('HIJ College', 7, 7, 55, 870),
];


const data = [
  { name: "Hods", count: 301, fill: "#2563eb" },
  { name: "Teachers", count: 230, fill: "#fbbf24" },
  { name: "Students", count: 300, fill: "#837279" },
];

const AdminHome = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);
        
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const [data1] = useState<any[]>([
      { name: "Mon", Created: 20, TotalPresent: 15 },
      { name: "Tue", Created: 18, TotalPresent: 71 },
      { name: "Wed", Created: 22, TotalPresent: 33 },
      { name: "Thu", Created: 19, TotalPresent: 78 },
      { name: "Fri", Created: 21, TotalPresent: 41 },
    ]);
  return (
    <>
    {/* Main content */}
    <div className="flex-1 w-full p-4 overflow-y-auto">
    <nav className="top_nav bg-zinc-300 rounded-[10px] sticky top-0 z-50 w-full flex p-2 mb-2 justify-between items-center h-[10%]">
      <h1 className="text-zinc-800 text-xl font-extrabold">Admin Dashboard</h1>
      <div className="right_side flex items-center gap-2">
        <input
          type="text"
          placeholder="Search Here.."
          className="bg-white border-2 border-zinc-400 px-3 h-10 rounded-md text-sm outline-none"
        />
        <Search className="bg-white border-zinc-400 border-2 text-blue-900 p-1 rounded-full shadow cursor-pointer h-10 w-13" />
      </div>
    </nav>

    <hr />

    {/* Dashboard cards */}
    <section className="w-full grid grid-cols-3 gap-4 p-2 ">
      {/* Total Students Card */}
      <motion.div
    initial={{ x: "-100%", opacity: 0, rotate: -15, scale: 0.8 }}
    animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
        className="bg-white shadow rounded-2xl h-full flex flex-col justify-center items-center"
      >
        <div className="text-blue-900 font-semibold text-lg mb-2">Total Students</div>
        <div className='flex w-80 justify-center items-center'>
          <ResponsiveContainer width="50%" height={130}>
            <RadialBarChart
              innerRadius="40%"
              outerRadius="100%"
              barSize={16}
              data={data}
              cx="50%"
              cy="50%"
            >
              <RadialBar background dataKey="count" />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="flex justify-around mt-2 h-full flex-col text-sm">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                <span className="text-zinc-700">{item.name}: <b>{item.count}</b></span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Classes Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="bg-white shadow rounded-2xl h-full p-4 flex flex-col justify-center items-center"
      >
        <h2 className="text-blue-900 font-semibold text-lg mb-2">Classes</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data1}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Created" fill="#ffc800" radius={2} name="Created" />
            <Bar dataKey="TotalPresent" fill="#2563eb" radius={2} name="TotalPresent" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Requests Card */}
      <motion.div
        initial={{ x: "-100%", opacity: 0, rotate: -15, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-white shadow rounded-2xl h-full p-4 flex flex-col justify-center items-center"
      >
        <h2 className="text-blue-900 font-semibold text-lg mb-2">Requests</h2>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[
              { name: "Mon", pending: 10, notifications: 5 },
              { name: "Tue", pending: 15, notifications: 7 },
              { name: "Wed", pending: 20, notifications: 10 },
              { name: "Thu", pending: 25, notifications: 13 },
              { name: "Fri", pending: 30, notifications: 17 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px"
                }}
                formatter={(value: number, name: string) => {
                  const label = name === "pending" ? "Pending Requests" : "Notification Requests";
                  return [value, label];
                }}
              />
              <Line type="monotone" dataKey="pending" stroke="#2563eb" strokeWidth={2} dot={true} />
              <Line type="monotone" dataKey="notifications" stroke="#fbbf24" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>

    {/* Joinings Section */}
    <section className="mt-4">
      <h1 className="text-lg font-bold text-zinc-800 mb-2">Joining (Last 5 Days)</h1>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth , backgroundColor:"#a8a8a8" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.hods}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className='flex'
        />
      </Paper>
    </section>
  </div>
  </>
  )
}

export default AdminHome