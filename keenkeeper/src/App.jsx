import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TimelineProvider } from "./context/TimelineContext";
import Home from "./pages/Home";
import FriendDetail from "./pages/FriendDetail";
import Timeline from "./pages/Timeline";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <TimelineProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friend/:id" element={<FriendDetail />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TimelineProvider>
  );
}
