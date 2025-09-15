"use client";
import TopBar from '@/components/TopBar';
import { Button } from '@/components/ui/button';
// import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LucideArrowLeft,
  Atom,
  FlaskConical,
  Sigma,
  Monitor
} from 'lucide-react';

const LearnPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <div className="flex p-2">
        <Button onClick={() => navigate(-1)} className="p-2 w-24">
          <LucideArrowLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="flex justify-center items-start p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <Button
            className="w-full h-40 flex flex-col items-center justify-center bg-red-200 rounded-lg"
            onClick={() => navigate("/learn/physics")}
          >
            <Atom className="w-20 h-20 mb-4" />
            <span className="text-lg font-medium">Physics</span>
          </Button>
          <Button
            className="w-full h-40 flex flex-col items-center justify-center bg-green-200 rounded-lg"
            onClick={() => navigate("/learn/chemistry")}
          >
            <FlaskConical className="w-20 h-20 mb-4" />
            <span className="text-lg font-medium">Chemistry</span>
          </Button>
          <Button
            className="w-full h-40 flex flex-col items-center justify-center bg-yellow-200 rounded-lg"
            onClick={() => navigate("/learn/maths")}
          >
            <Sigma className="w-20 h-20 mb-4" />
            <span className="text-lg font-medium">Maths</span>
          </Button>
          <Button
            className="w-full h-40 flex flex-col items-center justify-center bg-blue-200 rounded-lg"
            onClick={() => navigate("/learn/computer")}
          >
            <Monitor className="w-20 h-20 mb-4" />
            <span className="text-lg font-medium">Computer</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default LearnPage;
