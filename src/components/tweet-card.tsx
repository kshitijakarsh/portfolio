"use client"

import { Github } from "lucide-react"
import Link from "next/link"

export function SocialLinks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Github className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Connect With Me</h3>
      </div>
      
      <div className="grid gap-4">
        <Link 
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border border-border bg-card/80 p-4 transition-colors hover:bg-card/90"
        >
          <Github className="h-5 w-5" />
          <span>Follow me on GitHub</span>
        </Link>
      </div>
    </div>
  )
} 