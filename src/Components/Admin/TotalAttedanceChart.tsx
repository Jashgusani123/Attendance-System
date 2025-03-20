"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const AttendanceChart = ({ isOther }: { isOther?: boolean }) => {
  let data;
  if (isOther) {
    data = [
      { name: "Mon", total: 30, present: 20, absent: 10 },
      { name: "Tue", total: 28, present: 18, absent: 10 },
      { name: "Wed", total: 32, present: 22, absent: 10 },
      { name: "Thu", total: 29, present: 19, absent: 10 },
      { name: "Fri", total: 31, present: 21, absent: 10 },
    ];

  } else {
    data = [
      { name: "Mon", present: 20, absent: 5 },
      { name: "Tue", present: 18, absent: 7 },
      { name: "Wed", present: 22, absent: 3 },
      { name: "Thu", present: 19, absent: 6 },
      { name: "Fri", present: 21, absent: 4 },
    ];
  }
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {isOther ? <><Bar dataKey="total" fill="#FFA07A" radius={5} name="Total Students" />
          <Bar dataKey="present" fill="#4CAF50" radius={5} name="Present Students" />
          <Bar dataKey="absent" fill="#FF5733" radius={5} name="Absent Students" /></> 
          : <><Bar dataKey="present" fill="#ffc800" radius={5} />
          <Bar dataKey="absent" fill="#C3EBFA" radius={5} /></>}
      </BarChart>
    </ResponsiveContainer>
  )
};

export default AttendanceChart;
