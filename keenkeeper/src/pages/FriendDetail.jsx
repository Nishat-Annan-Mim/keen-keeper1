import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTimeline } from "../context/TimelineContext";
import friendsData from "../data/friends.json";
import callIcon from "../assets/call.png";
import textIcon from "../assets/text.png";
import videoIcon from "../assets/video.png";

const statusStyles = {
  overdue: "bg-red-500 text-white",
  "almost due": "bg-yellow-400 text-white",
  "on-track": "bg-green-600 text-white",
};

const statusLabel = {
  overdue: "Overdue",
  "almost due": "Almost Due",
  "on-track": "On-Track",
};

const tagColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
];

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();

  const friend = friendsData.find((f) => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Friend not found.
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(friend.next_due_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleCheckIn = (type) => {
    addEntry(type, friend.name);
    toast.success(`${type} with ${friend.name} logged!`, {
      style: { background: "#1e4d3b", color: "#fff" },
      iconTheme: { primary: "#fff", secondary: "#1e4d3b" },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto w-full px-4 py-10 flex-1">
        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            {/* Friend Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-2 border-gray-100"
              />
              <h2 className="text-xl font-bold text-gray-900 mb-2">{friend.name}</h2>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusStyles[friend.status]}`}>
                {statusLabel[friend.status]}
              </span>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {friend.tags.map((tag, i) => (
                  <span key={tag} className={`text-[11px] px-2 py-0.5 rounded-full font-medium uppercase ${tagColors[i % tagColors.length]}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm italic mt-3">"{friend.bio}"</p>
              <p className="text-gray-400 text-xs mt-1">Preferred: email</p>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {[
                { icon: "⏰", label: "Snooze 2 Weeks" },
                { icon: "📦", label: "Archive" },
                { icon: "🗑️", label: "Delete", danger: true },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm border-b border-gray-100 last:border-0 hover:bg-gray-50 transition ${
                    btn.danger ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  <span>{btn.icon}</span>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{friend.days_since_contact}</div>
                <div className="text-xs text-gray-500 mt-1">Days Since Contact</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{friend.goal}</div>
                <div className="text-xs text-gray-500 mt-1">Goal (Days)</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <div className="text-lg font-bold text-gray-900">{formattedDate}</div>
                <div className="text-xs text-gray-500 mt-1">Next Due</div>
              </div>
            </div>

            {/* Relationship Goal */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">Relationship Goal</h3>
                <button className="text-xs border border-gray-300 px-3 py-1 rounded text-gray-600 hover:bg-gray-50">
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Connect every <strong>{friend.goal} days</strong>
              </p>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckIn("Call")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm text-gray-700"
                >
                  <img src={callIcon} alt="Call" className="w-8 h-8" />
                  Call
                </button>
                <button
                  onClick={() => handleCheckIn("Text")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm text-gray-700"
                >
                  <img src={textIcon} alt="Text" className="w-8 h-8" />
                  Text
                </button>
                <button
                  onClick={() => handleCheckIn("Video")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm text-gray-700"
                >
                  <img src={videoIcon} alt="Video" className="w-8 h-8" />
                  Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}