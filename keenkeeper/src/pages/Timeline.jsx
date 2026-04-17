import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTimeline } from "../context/TimelineContext";
import callIcon from "../assets/call.png";
import textIcon from "../assets/text.png";
import videoIcon from "../assets/video.png";

const typeIcons = {
  Call: callIcon,
  Text: textIcon,
  Video: videoIcon,
  Meetup: null, // will use emoji
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Timeline() {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilter, setShowFilter] = useState(false);

  const filterOptions = ["All", "Call", "Text", "Video", "Meetup"];

  const filtered = entries
    .filter((e) => filter === "All" || e.type === filter)
    .sort((a, b) => {
      const da = new Date(a.date),
        db = new Date(b.date);
      return sortOrder === "newest" ? db - da : da - db;
    });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto w-full px-4 py-10 flex-1">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Timeline</h1>

        {/* Filter & Sort */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition min-w-[160px] justify-between"
            >
              <span>Filter: {filter}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showFilter && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFilter(opt);
                      setShowFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${filter === opt ? "text-[#1e4d3b] font-semibold" : "text-gray-700"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() =>
              setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
            }
            className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Sort: {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </button>
        </div>

        {/* Entries */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 && (
            <p className="text-gray-400 text-sm py-10 text-center">
              No entries found.
            </p>
          )}
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4"
            >
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                {typeIcons[entry.type] ? (
                  <img
                    src={typeIcons[entry.type]}
                    alt={entry.type}
                    className="w-8 h-8"
                  />
                ) : (
                  <span className="text-2xl">🤝</span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  <span>{entry.type}</span>{" "}
                  <span className="font-normal text-gray-500">
                    with {entry.friendName}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDate(entry.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
