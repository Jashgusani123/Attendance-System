"use client";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGetAttendaceOverviewMutation, useGetOverViewOfLast7DaysMutation } from "../../Redux/API/Hod";
import { useEffect, useState } from "react";
const AttendanceChart = ({ isOther, userId }: { isOther?: boolean, userId?: string }) => {
  const [GetOverviewLast7Days] = useGetOverViewOfLast7DaysMutation();
  const [GetOverviewAllTime] = useGetAttendaceOverviewMutation();
  const [data, setData] = useState<any[]>([
    { name: "Mon", present: 20, absent: 5 },
    { name: "Tue", present: 18, absent: 7 },
    { name: "Wed", present: 22, absent: 3 },
    { name: "Thu", present: 19, absent: 6 },
    { name: "Fri", present: 21, absent: 4 },
  ]);
  useEffect(() => {

    const GetOverviewLast7daysFunc = async () => {
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
    const GetOverview = async()=>{
      const response = await GetOverviewAllTime(null);
      if(response && "data" in response && response.data.success && response.data.DataOverview){
        
        setData(response.data.DataOverview.map((item: any) => ({
          name: item.date, // Set the X-axis name
          PresentStudents: item.PresentStudents,
          AbsentStudents: item.AbsentStudents
        })).reverse());
      }else{
        console.log(response.error);
      }
    }
    if (isOther && userId) {
      GetOverviewLast7daysFunc();
    } else {
      GetOverview();
    }
  }, [])
  return (
    <ResponsiveContainer width="100%" height={"85%"}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {isOther ? (
          <>
            <Bar dataKey="TotalStudents" fill="grey" radius={5} name="Total Students" />
            <Bar dataKey="PresentStudents" fill="#C3EBFA" radius={5} name="Present Students" />
            <Bar dataKey="AbsentStudents" fill="#ffc800" radius={5} name="Absent Students" />
          </>
        ) : (
          <>
            <Bar dataKey="PresentStudents" fill="#ffc800" radius={5} />
            <Bar dataKey="AbsentStudents" fill="#C3EBFA" radius={5} />
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  )
};

export default AttendanceChart;
