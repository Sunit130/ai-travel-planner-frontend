import type React from "react"
import Link from "next/link"
import { Button } from "./button"

export const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-emerald-600">
          TravelTales
        </Link>
        <nav className="flex items-center space-x-4">
          <Button size="sm"><Link href="/generate-itinerary">Plan a Trip</Link></Button>
        </nav>
      </div>
    </header>
  )
}

