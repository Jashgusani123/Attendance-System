import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { motion } from "framer-motion";
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
import Clock from '../../Components/Admin/Clock';
import InnerNavbar from '../../Components/Admin/InnerNavbar';
import { useGetFirstCardsQuery, useGetJoingTableQuery } from '../../Redux/API/Admin';
import { Data } from '../../Types/API/AdminType';
import { Capitalize } from '../../Utils/toCapitalize';





function createData(
  college: string,
  departments: number,
  hods: number,
  teachers: number,
  students: number
): Data {
  return { college, departments, hods, teachers, students };
}


const AdminHome = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: FirstCardData } = useGetFirstCardsQuery();
  const { data: JoingTableData } = useGetJoingTableQuery();
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const data1 = FirstCardData?.Data.cardSecond?.map((item: any) => ({
    name: item.date,
    Created: item.CreatedClassCount,
    TotalPresent: item.PresentCount
  })) || [];


  const data = [
    { name: "HODs", count: FirstCardData?.Data.cardFirst?.HODs || 0, fill: "#8884d8" },
    { name: "Teachers", count: FirstCardData?.Data.cardFirst?.Teachers || 0, fill: "#82ca9d" },
    { name: "Students", count: FirstCardData?.Data.cardFirst?.Student || 0, fill: "#ffc658" },
  ];
  const requestsData = FirstCardData?.Data.cardThird?.map((item: any) => ({
    name: item.date,
    pending: item.PandingRequestCount,
    notifications: item.NotificationRequestCount
  })) || [];

  const rows: Data[] = JoingTableData?.tableData?.map((item: any) =>
    createData(item.college, item.departments, item.hods, item.teachers, item.students)
  ) || [];


  return (
    <>
      {/* Main content */}
      <div className="min-h-screen flex flex-col p-4 overflow-y-auto">
        {/* Sticky Navbar */}
        <InnerNavbar Name='Admin Dashbord' Components={<Clock />} />


        <hr />

        {/* Dashboard cards */}
        <section className="w-full grid md:grid-cols-3 gap-4 p-2 overflow-x-hidden">
          {/* Total Students Card */}
          <motion.div
            initial={{ x: "-100%", opacity: 0, rotate: -15, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white shadow rounded-2xl h-full flex flex-col justify-center items-center"
          >
            <div className="text-blue-900 font-semibold text-lg mb-2">Total Students</div>
            <div className='flex flex-col sm:flex-row w-70 justify-center items-center'>
              <ResponsiveContainer width="100%" height={130}>
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

              <div className="flex justify-around mt-2 h-full w-40 flex-col text-sm">
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
                <LineChart data={requestsData}>
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

        <section className="mt-4">
          <h1 className="text-lg font-bold text-zinc-800 mb-2">JoiningData Table</h1>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow >
                    <TableCell style={{ backgroundColor: "#747474" }}>College</TableCell>
                    <TableCell align="center" style={{ backgroundColor: "#747474" }}>Departments</TableCell>
                    <TableCell align="center" style={{ backgroundColor: "#747474" }}>HODs</TableCell>
                    <TableCell align="center" style={{ backgroundColor: "#747474" }}>Teachers</TableCell>
                    <TableCell align="center" style={{ backgroundColor: "#747474" }}>Students</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{Capitalize(row.college)}</TableCell>
                      <TableCell align="center">{row.departments}</TableCell>
                      <TableCell align="center">{row.hods}</TableCell>
                      <TableCell align="center">{row.teachers}</TableCell>
                      <TableCell align="center">{row.students}</TableCell>
                    </TableRow>
                  ))}
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
            />
          </Paper>
        </section>

      </div>
    </>
  )
}

export default AdminHome