// import { createContext, useContext, useState } from "react";

// const TimelineContext = createContext();

// const initialEntries = [
//   { id: 1, type: "Meetup", friendName: "Tom Baker", date: "2026-03-29" },
//   { id: 2, type: "Text", friendName: "Sarah Chen", date: "2026-03-28" },
//   { id: 3, type: "Meetup", friendName: "Olivia Martinez", date: "2026-03-26" },
//   { id: 4, type: "Video", friendName: "Aisha Patel", date: "2026-03-23" },
//   { id: 5, type: "Meetup", friendName: "Sarah Chen", date: "2026-03-21" },
//   { id: 6, type: "Call", friendName: "Marcus Johnson", date: "2026-03-19" },
//   { id: 7, type: "Meetup", friendName: "Aisha Patel", date: "2026-03-17" },
//   { id: 8, type: "Text", friendName: "Olivia Martinez", date: "2026-03-13" },
//   { id: 9, type: "Call", friendName: "Lisa Nakamura", date: "2026-03-11" },
//   { id: 10, type: "Call", friendName: "Sarah Chen", date: "2026-03-11" },
//   { id: 11, type: "Video", friendName: "Marcus Johnson", date: "2026-03-06" },
//   { id: 12, type: "Video", friendName: "Ryan O'Brien", date: "2026-02-24" },
// ];

// export function TimelineProvider({ children }) {
//   const [entries, setEntries] = useState(initialEntries);

//   const addEntry = (type, friendName) => {
//     const newEntry = {
//       id: Date.now(),
//       type,
//       friendName,
//       date: new Date().toISOString().split("T")[0],
//     };
//     setEntries((prev) => [newEntry, ...prev]);
//   };

//   return (
//     <TimelineContext.Provider value={{ entries, addEntry }}>
//       {children}
//     </TimelineContext.Provider>
//   );
// }

// export function useTimeline() {
//   return useContext(TimelineContext);
// }

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
