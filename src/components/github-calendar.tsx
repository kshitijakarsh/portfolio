"use client"

import { useEffect, useState } from "react"
import GitHubCalendar from "react-github-calendar"
import { useTheme } from "next-themes"

interface GitHubContributionsProps {
  username: string
}

export function GitHubContributions({ username }: GitHubContributionsProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="animate-pulse">
        <div className="h-[120px] bg-primary/10 rounded-lg"></div>
      </div>
    )
  }

  // Define base colors for both themes
  const darkTheme = {
    background: '#0d1117',
    text: '#7d8590',
    grade4: '#39d353',
    grade3: '#26a641',
    grade2: '#006d32',
    grade1: '#0e4429',
    grade0: '#161b22'
  }

  const lightTheme = {
    background: '#ffffff',
    text: '#24292f',
    grade4: '#216e39',
    grade3: '#30a14e',
    grade2: '#40c463',
    grade1: '#9be9a8',
    grade0: '#ebedf0'
  }

  // Use the current theme
  const currentTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme

  return (
    <div className="calendar-container" style={{ backgroundColor: currentTheme.background }}>
      <GitHubCalendar
        username={username}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        fontSize={12}
        blockSize={10}
        blockMargin={4}
        blockRadius={2}
        theme={{
          light: [
            lightTheme.grade0,
            lightTheme.grade1,
            lightTheme.grade2,
            lightTheme.grade3,
            lightTheme.grade4
          ],
          dark: [
            darkTheme.grade0,
            darkTheme.grade1,
            darkTheme.grade2,
            darkTheme.grade3,
            darkTheme.grade4
          ]
        }}
        style={{
          color: currentTheme.text,
          width: '100%',
          minHeight: '117px',
        }}
        labels={{
          totalCount: '{{count}} contributions in the last year',
        }}
      />
    </div>
  )
}

