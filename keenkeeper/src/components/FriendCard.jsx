import { useNavigate } from "react-router-dom";

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
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
];

export default function FriendCard({ friend }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-gray-100"
      />
      <h3 className="font-semibold text-gray-800 text-sm mb-1">
        {friend.name}
      </h3>
      <p className="text-xs text-gray-400 mb-2">
        {friend.days_since_contact}d ago
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {friend.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase ${tagColors[i % tagColors.length]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status */}
      <span
        className={`text-[10px] px-3 py-1 rounded-full font-semibold ${statusStyles[friend.status]}`}
      >
        {statusLabel[friend.status]}
      </span>
    </div>
  );
}
