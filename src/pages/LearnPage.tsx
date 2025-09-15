"use client";
import TopBar from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import React from 'react';
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
      <div>
        <TopBar />
      </div>
      <div className='flex mx-2 mt-2'>
        <Button onClick={() => navigate(-1)}>
          <LucideArrowLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="w-screen h-screen overflow-hidden flex mt-10 items-start justify-center">
        <div className="grid grid-cols-2 gap-6">
          <Button
            className="w-40 h-40 flex flex-col items-center justify-center bg-red-200"
            onClick={() => navigate("/learn/physics")}
          >
            <Atom className="w-20 h-20 mb-4" />
            <span className="text-lg font-medium">Physics</span>
          </Button>
          <Button
            className="w-40 h-40 flex flex-col items-center justify-center bg-green-200"
            onClick={() => navigate("/learn/chemistry")}
          >
            <FlaskConical className="w-20 h-20 mb-4" />
            <span className="text-lg font-medium">Chemistry</span>
          </Button>
          <Button
            className="w-40 h-40 flex flex-col items-center justify-center bg-yellow-200"
            onClick={() => navigate("/learn/maths")}
          >
            <Sigma className="w-20 h-20 mb-4" />
            <span className="text-lg font-medium">Maths</span>
          </Button>
          <Button
            className="w-40 h-40 flex flex-col items-center justify-center bg-blue-200"
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