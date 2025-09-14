"use client";

import TopBar from "@/components/TopBar";
import GameCarousel from "@/components/home/GameCarousel";
import { Card, CardContent } from "@/components/ui/card";


export default function HomePage() {
    return <>
            <TopBar />
        <div className="flex flex-col px-2">
            {/* Home row layout */}
            <div className="flex px-2 mb-3">
{Array.from({ length: 3 }).map((_, index) => (
               <Card key={index} className="basis-1/3 min-h-40 mr-2">
                    <CardContent>
                        <p className="text-lg">hello</p>
                    </CardContent>
                </Card> 
 
))}
           </div>
            <GameCarousel />

        </div>
    </>
}