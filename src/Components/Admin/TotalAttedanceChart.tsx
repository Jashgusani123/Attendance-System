"use client";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGetOverViewOfLast7DaysMutation } from "../../Redux/API/Admin";
import { useEffect, useState } from "react";
const AttendanceChart = ({ isOther, userId }: { isOther?: boolean, userId?: string }) => {
  const [GetOverviewLast7Days] = useGetOverViewOfLast7DaysMutation();
  const [data, setData] = useState<any[]>([
    { name: "Mon", present: 20, absent: 5 },
    { name: "Tue", present: 18, absent: 7 },
    { name: "Wed", present: 22, absent: 3 },
    { name: "Thu", present: 19, absent: 6 },
    { name: "Fri", present: 21, absent: 4 },
  ]);
  useEffect(() => {

    const GetOverview = async () => {
      const response = await GetOverviewLast7Days(userId);
      if(response && "data" in response && response.data.success && response.data.DataOf7Days){
        console.log(response.data);
        
        setData(response.data.DataOf7Days.map((item: any) => ({
          name: item.date, // Set the X-axis name
          TotalStudents: item.TotalStudents,
          PresentStudents: item.PresentStudents,
          AbsentStudents: item.AbsentStudents
        })).reverse());
      }else{
        console.log(response.error);
        
      }

    }
    if (isOther && userId) {
      GetOverview();
    } else {
      
    }
  }, [])
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {isOther ? (
          <>
            <Bar dataKey="TotalStudents" fill="#FFA07A" radius={5} name="Total Students" />
            <Bar dataKey="PresentStudents" fill="#4CAF50" radius={5} name="Present Students" />
            <Bar dataKey="AbsentStudents" fill="#FF5733" radius={5} name="Absent Students" />
          </>
        ) : (
          <>
            <Bar dataKey="present" fill="#ffc800" radius={5} />
            <Bar dataKey="absent" fill="#C3EBFA" radius={5} />
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  )
};

export default AttendanceChart;
