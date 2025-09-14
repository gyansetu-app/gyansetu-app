import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import LeaderPage from './pages/LeaderPage.tsx'
import LearnPage from './pages/LearnPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<HomePage />} />
      <Route path="/learn" element = {<LearnPage />} />
      <Route path="/leaderboard" element = {<LeaderPage />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
