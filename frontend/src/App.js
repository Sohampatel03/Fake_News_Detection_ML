import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import DetectionPage from "./pages/DetectionPage";

export default function App() {

  const [page, setPage] = useState("landing");

  return page === "landing"
    ? <LandingPage onDetect={() => setPage("detect")} />
    : <DetectionPage onBack={() => setPage("landing")} />;
}