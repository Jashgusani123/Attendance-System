"use client";
import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import maleFemale from '../../assets/maleFemale.png'

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    { name: "Total", count: boys + girls, fill: "white" },
    { name: "Girls", count: girls, fill: "#ffc800" },
    { name: "Boys", count: boys, fill: "#C3EBFA" },
  ];

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

const StudentRatio = () => {
    const [boys, setBoys] = useState(0);
    const [girls, setGirls] = useState(0);
  
    useEffect(() => {
      // Mocked Data (Replace with API call if needed)
      const data = [
        { sex: "MALE", _count: 60 },
        { sex: "FEMALE", _count: 70 },
      ];
  
      setBoys(data.find((d) => d.sex === "MALE")?._count || 0);
      setGirls(data.find((d) => d.sex === "FEMALE")?._count || 0);
    }, []);
  
    return (
      <div className="bg-white rounded-2xl w-full h-full p-4 shadow-md flex flex-col items-center">
        <h1 className="text-md font-semibold text-gray-700">Students</h1>
        <div className="h-full w-full flex items-center justify-center">
          <CountChart boys={boys} girls={girls} />
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 bg-blue-300 rounded-full" />
            <h1 className="text-sm font-bold">{boys}</h1>
            <h2 className="text-xs text-gray-500">Boys ({Math.round((boys / (boys + girls)) * 100)}%)</h2>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 bg-[#ffc800] rounded-full" />
            <h1 className="text-sm font-bold">{girls}</h1>
            <h2 className="text-xs text-gray-500">Girls ({Math.round((girls / (boys + girls)) * 100)}%)</h2>
          </div>
        </div>
      </div>
    );
  };
  

export default StudentRatio;
