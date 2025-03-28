"use client";
import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import maleFemale from '../../assets/maleFemale.png'
import { useGetAbsentPresent7DaysDataMutation } from "../../Redux/API/Admin";

const CountChart = ({ boys, girls, absent, present }: { boys?: number; girls?: number, present?: number, absent?: number }) => {
  let data: any;
  if (boys && girls) {
    data = [
      { name: "Total", count: boys + girls, fill: "white" },
      { name: "Girls", count: girls, fill: "#ffc800" },
      { name: "Boys", count: boys, fill: "#C3EBFA" },
    ];
  } else {
    data = [
      { name: "Total", count: absent! + present!, fill: "grey" },
      { name: "Present", count: present!, fill: "green" },
      { name: "Absent", count: absent!, fill: "red" },
    ]
  }


  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center Image */}
      <img
        src={maleFemale} // Replace with your image path
        alt="Center Icon"
        className="absolute w-12 h-12"
      />

      {/* Radial Chart */}
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );

};

const StudentRatio = ({ title, other, userId }: { title?: string, other?: boolean, userId?:string }) => {
  const [boys, setBoys] = useState(0);
  const [girls, setGirls] = useState(0);
  const [present, setpresent] = useState(0);
  const [absent, setabsent] = useState(0);
  const [GetPresentAbsentOverview] = useGetAbsentPresent7DaysDataMutation();

  useEffect(() => {
    const GetPResentAbsent7Days = async()=>{
      const response = await  GetPresentAbsentOverview(userId);
      if(response && "data" in response && response.data?.success && response.data?.APData){
        setpresent(response.data.APData.PresentStudents)
        setabsent(response.data.APData.AbsentStudents)
      }else{
        console.log(response.error);
      }
      
    }
    // Mocked Data (Replace with API call if needed)
    let data: any;
    if (!other) {
      data = [
        { sex: "MALE", _count: 60 },
        { sex: "FEMALE", _count: 70 },
      ];
      setBoys(data.find((d: any) => d.sex === "MALE")?._count || 0);
      setGirls(data.find((d: any) => d.sex === "FEMALE")?._count || 0);
    }
    else {
      GetPResentAbsent7Days();
    }


  }, []);

  return (
    <div className="bg-white rounded-2xl w-full h-full p-4 shadow-md flex flex-col items-center">
      <h1 className="text-md font-semibold text-gray-700">{title ? title : "Students"}</h1>
      <div className="h-full w-full flex items-center justify-center">
        <CountChart boys={boys} girls={girls} present={present} absent={absent} />
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-300 rounded-full" />
          <h1 className="text-sm font-bold">{boys ? boys : present}</h1>
          <h2 className="text-xs text-gray-500">{boys?"Boys":"Present"} ({Math.round(((boys ? boys : present) / ((boys ? boys : present) + (girls ? girls : absent))) * 100)}%)</h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-[#ffc800] rounded-full" />
          <h1 className="text-sm font-bold">{girls?girls:absent}</h1>
          <h2 className="text-xs text-gray-500">{girls?"Girls":"Absent"} ({Math.round(((girls ? girls : absent) / ((boys ? boys : present) + (girls ? girls : absent))) * 100)}%)</h2>
        </div>
      </div>
    </div>
  );
};


export default StudentRatio;
