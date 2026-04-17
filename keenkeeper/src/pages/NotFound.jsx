import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl font-bold text-[#1e4d3b] mb-4">404</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like this page doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#1e4d3b] text-white px-6 py-2 rounded-lg hover:bg-[#163829] transition"
        >
          Go Home
        </button>
      </div>
      <Footer />
    </div>
  );
}
