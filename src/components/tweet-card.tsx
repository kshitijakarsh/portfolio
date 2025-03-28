"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Twitter, Calendar, Heart, MessageCircle, Repeat2, ExternalLink } from "lucide-react"

interface Tweet {
  id: string
  text: string
  created_at: string
  public_metrics: {
    like_count: number
    reply_count: number
    retweet_count: number
  }
  media?: {
    url: string
    alt: string
    type: string
  }[]
}

// Helper function to format tweet text safely
const formatTweetText = (text: string) => {
  return text.split(/\s+/).map((word, index) => {
    if (word.startsWith("http")) {
      return (
        <a
          key={index}
          href={word}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {word}
        </a>
      )
    }
    if (word.startsWith("#")) {
      return (
        <a
          key={index}
          href={`https://twitter.com/hashtag/${word.slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {word}
        </a>
      )
    }
    if (word.startsWith("@")) {
      return (
        <a
          key={index}
          href={`https://twitter.com/${word.slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {word}
        </a>
      )
    }
    return word + " "
  })
}

export function TweetCard() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const mockTweets: Tweet[] = [
          {
            id: "1",
            text: "Just launched my new portfolio website built with #NextJS and #TailwindCSS! 🚀 #WebDevelopment #Portfolio",
            created_at: "2024-03-15T12:00:00.000Z",
            public_metrics: {
              like_count: 15,
              reply_count: 3,
              retweet_count: 2
            }
          },
          {
            id: "2",
            text: "Exploring the new features in Next.js 14. Server components are a game changer! #NextJS #WebDev",
            created_at: "2024-03-10T09:30:00.000Z",
            public_metrics: {
              like_count: 28,
              reply_count: 4,
              retweet_count: 7
            },
            media: [
              {
                url: "/images/pfp.jpg",
                alt: "Next.js code example",
                type: "photo"
              }
            ]
          }
        ]
        
        setTweets(mockTweets)
      } catch (error) {
        console.error("Error fetching tweets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTweets()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-lg border border-border bg-card/80 p-4 w-full max-w-[450px] h-[50px]">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-primary/10" />
                <div className="h-2 w-1/2 rounded bg-primary/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2">
        <Twitter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Latest Tweets</h3>
      </div>
      
      {/* Tweet Cards Container */}
      <div className="flex flex-wrap justify-center gap-2">
        {tweets.map((tweet) => (
          <div 
            key={tweet.id} 
            className="relative flex flex-col gap-3 rounded-lg border border-border bg-card/80 p-4 w-full max-w-[450px] backdrop-blur-sm transition-colors duration-200 hover:bg-card/90"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 overflow-hidden rounded-full border border-border/50">
                  <Image 
                    src="/images/pfp.jpg" 
                    alt="Profile" 
                    width={32} 
                    height={20} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">Kshitij Akarsh</div>
                  <div className="text-xs text-muted-foreground">@kshitijakarsh</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <time>
                  {new Date(tweet.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
            </div>

            {/* Tweet Content */}
            <div className="text-sm leading-snug">{formatTweetText(tweet.text)}</div>

            {/* Tweet Media */}
            {tweet.media?.length ? (
              <div className="relative mt-2 overflow-hidden rounded-lg">
                <Image 
                  src={tweet.media[0].url}
                  alt={tweet.media[0].alt}
                  width={400}
                  height={200}
                  className="w-full object-cover rounded-lg"
                />
              </div>
            ) : null}

            {/* Tweet Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-primary">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{tweet.public_metrics.reply_count}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-green-500">
                <Repeat2 className="h-3.5 w-3.5" />
                <span>{tweet.public_metrics.retweet_count}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-red-500">
                <Heart className="h-3.5 w-3.5" />
                <span>{tweet.public_metrics.like_count}</span>
              </button>
              <a href={`https://twitter.com/kshitijakarsh/status/${tweet.id}`} className="flex items-center gap-1 hover:text-primary">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>View</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
