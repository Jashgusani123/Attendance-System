"use client";

import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// ✅ Define the event type properly
interface MyEvent {
  title: string;
  start: Date;
  end: Date;
}

// ✅ Sample event data
const sampleData: MyEvent[] = [
  { title: "Math Class", start: new Date(2025, 2, 3, 9, 0), end: new Date(2025, 2, 3, 10, 30) },
  { title: "Science Class", start: new Date(2025, 2, 3, 10, 30), end: new Date(2025, 2, 3, 12, 0) },
  { title: "English Class", start: new Date(2025, 2, 4, 9, 0), end: new Date(2025, 2, 4, 10, 30) },
  { title: "History Class", start: new Date(2025, 2, 4, 11, 0), end: new Date(2025, 2, 4, 12, 30) },
  { title: "Lunch Break", start: new Date(2025, 2, 5, 12, 30), end: new Date(2025, 2, 5, 13, 30) },
  { title: "Project Meeting", start: new Date(2025, 2, 6, 14, 0), end: new Date(2025, 2, 6, 15, 30) },
];

// ✅ Correct event styling function
const eventStyleGetter = (event: MyEvent) => {
  let backgroundColor = "#6b7280"; // Default gray
  if (event.title.includes("Math")) backgroundColor = "#F87171";
  if (event.title.includes("Science")) backgroundColor = "#34D399";
  if (event.title.includes("English")) backgroundColor = "#60A5FA";
  if (event.title.includes("History")) backgroundColor = "#FBBF24";
  if (event.title.includes("Lunch")) backgroundColor = "#E5E7EB";
  if (event.title.includes("Project")) backgroundColor = "#A78BFA";

  return {
    style: {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.9,
      color: "white",
      padding: "5px",
      textAlign: "center" as const, // ✅ Fix the type issue
    },
  };
};

const TeacherTimeTable = () => {
  const [view, setView] = useState<any>("week");

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <Calendar
        localizer={localizer}
        events={sampleData}
        startAccessor="start"
        endAccessor="end"
        views={["week", "day"]}
        view={view}
        onView={setView}
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};
<style>{`
    .rbc-calendar {
      font-family: Arial, sans-serif;
      background: white;
      padding: 10px;
      border-radius: 8px;
    }
    
    .rbc-event {
      padding: 4px;
      font-size: 14px;
      border-radius: 5px;
      text-align: center;
    }
    
    .rbc-today {
      background: #e0f7fa !important;
    }
  `}</style>


export default TeacherTimeTable;
