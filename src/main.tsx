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
import ChapterProgress from "./pages/ChapterProgress.tsx";
import ChemistryPage from "./pages/Subjects/ChemistryPage.tsx";
import MathPage from "./pages/Subjects/MathPage.tsx";
import PhysicsPage from "./pages/Subjects/PhysicsPage.tsx";
import OfflineBanner from "./components/OfflineBanner.tsx";
import "./i18n";
import SettingsPage from "./pages/SettingsPage.tsx";

function App() {
  const location = useLocation();
  const hideBottomBar =
    location.pathname === "/login" || location.pathname === "/onboarding";

  return (
    <>
      <OfflineBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/leaderboard" element={<LeaderPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/visualise" element={<VideoVisualisePage />} />
        <Route path="/learn/progress" element={<ChapterProgress />} />
        <Route path="/learn/physics" element={<PhysicsPage />} />
        <Route path="/learn/chemistry" element={<ChemistryPage />} />
        <Route path="/learn/maths" element={<MathPage />} />
        <Route path="/settings" element={<SettingsPage />} />
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
