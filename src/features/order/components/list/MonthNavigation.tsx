"use client";
import { useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameYear,
} from "date-fns";

export function MonthNavigation() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const months = Array.from({ length: 7 }, (_, i) =>
    addMonths(selectedDate, i - 3)
  );

  const handleClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-gray-200">
      {months.map((date) => {
        const isSelected = isSameMonth(date, selectedDate);
        const showYear = !isSameYear(date, selectedDate);

        const label = showYear
          ? `${date.getFullYear()}년 ${date.getMonth() + 1}월`
          : `${date.getMonth() + 1}월`;

        return (
          <button
            key={format(date, "yyyy-MM")}
            onClick={() => handleClick(date)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-md transform scale-105"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary hover:shadow-sm"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
