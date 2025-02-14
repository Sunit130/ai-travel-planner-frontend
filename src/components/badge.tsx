import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "tag"
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default" }) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"

  const variants = {
    default: "bg-emerald-100 text-emerald-800",
    outline: "bg-transparent border border-emerald-600 text-emerald-600",
    tag: "bg-peach-100 text-peach-800",
  }

  return <span className={`${baseStyles} ${variants[variant]}`}>{children}</span>
}

