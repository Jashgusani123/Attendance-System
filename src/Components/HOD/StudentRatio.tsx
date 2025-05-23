"use client";
import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import maleFemale from '../../assets/maleFemale.png'
import { useGetAbsentPresent7DaysDataMutation, useGetBoysAndGirlsOverviewMutation } from "../../Redux/API/Hod";

const CountChart = ({ boys, girls, absent, present }: { boys?: number; girls?: number, present?: number, absent?: number }) => {
  let data: any;
  if (boys !== undefined && girls !== undefined) {
    
    data = [
      { name: "Total", count: boys + girls, fill: "white" },
      { name: "Girls", count: girls, fill: "#ffc800" },
      { name: "Boys", count: boys, fill: "#C3EBFA" },
    ];
  }else {
    data = [
      { name: "Total", count: absent! + present!, fill: "grey" },
      { name: "Present", count: present!, fill: "#C3EBFA" },
      { name: "Absent", count: absent!, fill: "#ffc800" },
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
  const [boys, setBoys] = useState();
  const [girls, setGirls] = useState();
  const [present, setpresent] = useState(0);
  const [absent, setabsent] = useState(0);
  const [GetPresentAbsentOverview] = useGetAbsentPresent7DaysDataMutation();
  const [GetBoysAndGirlsOverview] = useGetBoysAndGirlsOverviewMutation();


  useEffect(() => {
    const GetPresentAbsent7Days = async()=>{
      const response = await  GetPresentAbsentOverview(userId);
      if(response && "data" in response && response.data?.success && response.data?.APData){
        setpresent(response.data.APData.PresentStudents)
        setabsent(response.data.APData.AbsentStudents)
      }else{
        console.log(response.error);
      }
    }
    const GetBoysAndGirlsOverviewFunc = async()=>{
      const response = await GetBoysAndGirlsOverview(null);
        if(response && "data" in response && response.data?.success && response.data?.CardsData){
        setBoys(response.data.CardsData.boys)
        setGirls(response.data.CardsData.girls)
      }else{
        console.log(response.error);
      }
    }
    // Mocked Data (Replace with API call if needed)
    if (!other) {
      GetBoysAndGirlsOverviewFunc();
    }
    else {
      GetPresentAbsent7Days();
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
          <h1 className="text-sm font-bold">{boys !== undefined  ? boys : present}</h1>
          <h2 className="text-xs text-gray-500">{boys !== undefined?"Boys":"Present"} ({Math.round(((boys ? boys : present) / ((boys ? boys : present) + (girls ? girls : absent))) * 100)}%)</h2>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-2 h-2 bg-[#ffc800] rounded-full`} />
          <h1 className="text-sm font-bold">{girls !== undefined ?girls:absent}</h1>
          <h2 className="text-xs text-gray-500">{girls !== undefined?"Girls":"Absent"} ({Math.round(((girls ? girls : absent) / ((boys ? boys : present) + (girls ? girls : absent))) * 100)}%)</h2>
        </div>
      </div>
    </div>
  );
};


export default StudentRatio;
