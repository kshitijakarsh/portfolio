"use client"

import { useEffect, useState } from "react"
import { Home, User, Code, Github } from "lucide-react"

interface DockProps {
  activeSection: string;
}

export function Dock({ activeSection }: DockProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Code },
    { id: "github", label: "GitHub", icon: Github },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 px-3 py-2 rounded-xl bg-card border border-border backdrop-blur">
      {navItems.map((item) => {
        const isActive = activeSection === item.id
        const Icon = item.icon
        
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`p-2 rounded-md transition-colors ${
              isActive ? "text-primary bg-secondary/50" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={item.label}
          >
            <Icon className="h-5 w-5" />
          </a>
        )
      })}
    </div>
  )
}

