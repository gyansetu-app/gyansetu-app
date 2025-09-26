import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LeaderPage from "./pages/LeaderPage.tsx";
import LearnPage from "./pages/LearnPage.tsx";
import BottomBar from "./components/BottomBar.tsx";
import QuizPage from "./pages/Quizpage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import OnboardingPage from "./pages/OnboardingPage.tsx";
import VideoVisualisePage from "./pages/VideoVisualisePage.tsx";

function App() {
  const location = useLocation();
  const hideBottomBar =
    location.pathname === "/login" || location.pathname === "/onboarding";

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/leaderboard" element={<LeaderPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/visualise" element={<VideoVisualisePage />} />
      </Routes>
      {!hideBottomBar && <BottomBar />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
