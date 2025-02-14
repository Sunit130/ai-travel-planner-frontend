"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { MapPin, Calendar, Users } from "lucide-react"
import { TRIPS_TYPE } from "../const"


export default function GenerateItineraryPage() {
    const router = useRouter();
    const [destination, setDestination] = useState<string>("Bangalore")
    const [days, setDays] = useState<number>(7)
    const [travelTypes, setTravelTypes] = useState<string[]>([TRIPS_TYPE[0]])
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [progress, setProgress] = useState(0)


    const handleTravelTypeToggle = (type: string) => {
        setTravelTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
    }


    const callGenerateItinerary = async (destination: string, numberOfDays: number, intrests: string[]) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-itinerary/`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "destination": destination,
                    "duration": numberOfDays,
                    "interests": intrests
                })           
            });
        
            if (!res.ok) return null; // If API fails, return null
        
            return await res.json();
        } catch (error) {
            console.error("Error fetching itinerary:", error);
            return null;
        }
    }


    const handleGenerate = async () => {
        setIsGenerating(true)
        setProgress(0)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsGenerating(false)
                    return 100
                }
                return prev + 1
            })
        }, 250)

        const data = await callGenerateItinerary(destination, days, travelTypes);
        router.push(`/itinerary/${data.destination_slug}/${data.duration}-days/${data.id}`);
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
        <SiteHeader />
        <main className="flex-grow container mx-auto px-4 py-8 lg:px-8">
            <div className="max-w-sm mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-emerald-800">Generate Your Itinerary</h1>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                <MapPin className="text-emerald-600" />
                <Input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="flex-grow w-full"
                />
                </div>
                <div className="flex items-center space-x-2">
                <Calendar className="text-emerald-600" />
                <Input
                    type="number"
                    placeholder="Number of days"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="flex-grow w-full"
                    min="1"
                />
                </div>
                <div className="flex items-start space-x-2">
                <Users className="text-emerald-600 mt-1" />
                <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-700 mb-2">Type of Travel</p>
                    <div className="flex flex-wrap gap-2">
                    {TRIPS_TYPE.map((type) => (
                        <Button
                        key={type}
                        variant={travelTypes.includes(type) ? "primary" : "outline"}
                        size="sm"
                        onClick={() => handleTravelTypeToggle(type)}
                        >
                        {type}
                        </Button>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            {
                !isGenerating && <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !destination || !days || travelTypes.length === 0}
                    variant={"primary"}
                    className="w-full"
                >
                    Generate Itinerary
                </Button>
            }
            {isGenerating && (
                <div className="mt-4">
                <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                    <div
                    className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-sm text-center mt-2 text-emerald-800">
                    {progress}% - Crafting your perfect itinerary...
                </p>
                </div>
            )}
            </div>
        </main>
        <SiteFooter />
        </div>
  )
}

