import { createContext, useContext, useState } from "react";

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([]);

  const addEntry = (type, friendName) => {
    const newEntry = {
      id: Date.now(),
      type,
      friendName,
      date: new Date().toISOString().split("T")[0],
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}
