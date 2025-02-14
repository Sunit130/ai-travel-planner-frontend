"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "./input"
import { Button } from "./button"

interface Comment {
  id: number
  author: string
  content: string
  avatar: string
  date: string
}

interface CommentSectionProps {
  initialComments?: Comment[]
}

export const CommentSection: React.FC<CommentSectionProps> = ({ initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: 1,
      author: "Current User",
      content: newComment,
      avatar: "/placeholder.svg",
      date: "new Date().toLocaleDateString()",
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Comment</Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

