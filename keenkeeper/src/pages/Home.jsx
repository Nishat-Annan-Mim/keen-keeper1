import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FriendCard from "../components/FriendCard";
import friendsData from "../data/friends.json";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === "on-track").length;
  const needAttention = friends.filter(
    (f) => f.status === "overdue" || f.status === "almost due",
  ).length;
  const interactionsThisMonth = 12;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Banner */}
      <section className="bg-gray-50 py-12 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-5">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
        <button className="bg-[#1e4d3b] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#163829] transition flex items-center gap-2 mx-auto">
          <span>+</span> Add a Friend
        </button>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
          {[
            { label: "Total Friends", value: totalFriends },
            { label: "On Track", value: onTrack },
            { label: "Need Attention", value: needAttention },
            { label: "Interactions This Month", value: interactionsThisMonth },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="text-3xl font-bold text-gray-900">
                {card.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{card.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-6xl mx-auto w-full px-4 pb-16">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          Your Friends
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#1e4d3b] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">Loading your friends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
