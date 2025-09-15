"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarDemo() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return <div className="absolute right-4 z-99 max-w-[350px]">
        <Calendar mode="single" selected={date} onSelect={setDate} />
    </div>
}
