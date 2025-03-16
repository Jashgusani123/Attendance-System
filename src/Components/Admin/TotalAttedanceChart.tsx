"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const data = [
    { name: "Mon", present: 20, absent: 5 },
    { name: "Tue", present: 18, absent: 7 },
    { name: "Wed", present: 22, absent: 3 },
    { name: "Thu", present: 19, absent: 6 },
    { name: "Fri", present: 21, absent: 4 },
  ];
const AttendanceChart = () => (
  <ResponsiveContainer width="100%" height={180}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="present" fill="#ffc800" radius={5}  />
      <Bar dataKey="absent" fill="#C3EBFA" radius={5}/>
    </BarChart>
  </ResponsiveContainer>
);

export default AttendanceChart;
