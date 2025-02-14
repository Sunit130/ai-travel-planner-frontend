import type React from "react"
import Link from "next/link"

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm text-gray-500 md:text-left">
            Built with love for travelers. Start your journey.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-gray-500 hover:text-emerald-600 hover:underline">
            Terms
          </Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-emerald-600 hover:underline">
            Contact
          </Link>
          <Link href="/about" className="text-sm text-gray-500 hover:text-emerald-600 hover:underline">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}

