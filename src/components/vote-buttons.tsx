"use client"

import type React from "react"
import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "./button"

interface VoteButtonsProps {
  initialUpvotes?: number
  initialDownvotes?: number
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({ initialUpvotes = 0, initialDownvotes = 0 }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)

  const handleUpvote = () => {
    if (userVote === "up") {
      setUpvotes((prev) => prev - 1)
      setUserVote(null)
    } else {
      if (userVote === "down") {
        setDownvotes((prev) => prev - 1)
      }
      setUpvotes((prev) => prev + 1)
      setUserVote("up")
    }
  }

  const handleDownvote = () => {
    if (userVote === "down") {
      setDownvotes((prev) => prev - 1)
      setUserVote(null)
    } else {
      if (userVote === "up") {
        setUpvotes((prev) => prev - 1)
      }
      setDownvotes((prev) => prev + 1)
      setUserVote("down")
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-1 ${userVote === "up" ? "bg-emerald-50 text-emerald-600" : ""}`}
        onClick={handleUpvote}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{upvotes}</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-1 ${userVote === "down" ? "bg-red-50 text-red-600" : ""}`}
        onClick={handleDownvote}
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{downvotes}</span>
      </Button>
    </div>
  )
}

