"use client";
import TopBar from '@/components/TopBar';
import { Button } from '@/components/ui/button';
// import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Atom,
  FlaskConical,
  Sigma,
  Monitor,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Progress } from '@/components/ui/progress';

const LearnPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <main className='flex flex-col'>
        <div className="flex p-2 gap-3 px-3">
          <Input placeholder='Search anything...' className='w-full relative top-1 shadow-shadow' />
          <Button className='relative top-1 h-12 w-15 mr-1' ><Search /></Button>
        </div>
        <div className='px-3 mx-2 mt-5'>
          <p className='text-2xl'>Modules in Progress</p>
          <div>
            <Card className='mt-3'>
              <CardContent>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <Avatar>
                      <AvatarFallback>TR</AvatarFallback>
                    </Avatar>
                    <div className='ml-3 mr-2 flex flex-col'>
                      <p className='ml-3'>A Basic Introduction to Trigonometry</p>
                      <p className='ml-3'>Teacher: <span className='font-normal'> Mrs. Jaya Chaturvedi</span></p>
                    </div>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <p className=''>Stone 18 - 45% completed</p>
                    <p>34 Stones</p>
                  </div>
                  <Progress value={45} className='' />
                </div>
              </CardContent>
            </Card>
          </div>
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
      </main>
    </>
  );
};

export default LearnPage;
