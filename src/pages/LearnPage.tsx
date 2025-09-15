"use client";
import TopBar from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideArrowLeft } from 'lucide-react';

const LearnPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <TopBar />
      </div>
      <div className='flex mx-2'>
        <Button onClick={() => navigate(-1)}><LucideArrowLeft/></Button>
      </div>
      <div className="w-screen h-screen overflow-hidden flex mt-20 items-start justify-center">
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="w-40 h-40 bg-red-200"
            onClick={() => navigate("/learn/physics")}
          >
            Physics
          </Button>
          <Button
            className="w-40 h-40 bg-green-200"
            onClick={() => navigate("/learn/chemistry")}
          >
            Chemistry
          </Button>
          <Button
            className="w-40 h-40 bg-yellow-200"
            onClick={() => navigate("/learn/maths")}
          >
            Maths
          </Button>
          <Button
            className="w-40 h-40 bg-blue-200"
            onClick={() => navigate("/learn/computer")}
          >
            Computer
          </Button>
        </div>
      </div>
    </>
  );
};

export default LearnPage;
