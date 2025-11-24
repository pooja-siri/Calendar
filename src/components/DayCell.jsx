import React from "react";

const DayCell = ({ 
  day, 
  events, 
  isToday, 
  onAddEvent, 
  onEditEvent, 
  onDeleteEvent 
}) => {
  return (
    <div
      className={`border h-28 p-1 rounded-md relative 
        overflow-hidden hover:bg-gray-100 cursor-pointer
        ${isToday ? "bg-blue-200 border-blue-600" : "bg-white"}`}
      onDoubleClick={() => onAddEvent(day.format("YYYY-MM-DD"))}
    >
      <div className="text-gray-700 text-sm font-medium">
        {day.date()}
      </div>

      <div className="mt-1 space-y-1 overflow-y-auto max-h-20 pr-1">
        {events.map((ev, index) => (
          <div
            key={index}
            className={`text-xs p-1 rounded text-white flex justify-between items-center
              ${index % 2 === 0 ? "bg-blue-500" : "bg-green-500"}`}
          >
            <span onClick={() => onEditEvent(ev)}> {ev.title} </span>

            {/* Delete Button */}
            <button
              className="ml-2 text-white text-xs bg-red-600 px-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteEvent(ev);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCell;
