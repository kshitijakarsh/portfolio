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

// Helper function to truncate text
const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length - 3)}...`
}

// Helper function to format tweet text with links
const formatTweetText = (text: string) => {
  return text
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">#$1</a>')
    .replace(/@(\w+)/g, '<a href="https://twitter.com/$1" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">@$1</a>')
}

export function TweetCard() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock tweets for demonstration
    const mockTweets: Tweet[] = [
      {
        id: "1",
        text: "Just launched my new portfolio website built with #NextJS and #TailwindCSS! Check it out and let me know what you think. #WebDevelopment #Portfolio",
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
        }
      }
    ]
    
    setTweets(mockTweets)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-lg border border-border bg-card/80 p-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-primary/10" />
                <div className="h-3 w-1/2 rounded bg-primary/10" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-primary/10" />
              <div className="h-4 w-5/6 rounded bg-primary/10" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 justify-center mb-8">
        <Twitter className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-medium">Latest Tweets</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {tweets.map((tweet) => (
          <div 
            key={tweet.id} 
            className="relative flex flex-col gap-4 rounded-lg border border-border bg-card/80 p-6 backdrop-blur-sm transition-all duration-200 hover:bg-card/90 hover:scale-[1.02]"
          >
            {/* Tweet header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full border border-border/50">
                  <Image 
                    src="/images/pfp.jpg" 
                    alt="Profile" 
                    width={48} 
                    height={48} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-lg">Kshitij Akarsh</span>
                  </div>
                  <div className="text-sm text-muted-foreground">@kshitijakarsh</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(tweet.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
            </div>

            {/* Tweet content */}
            <div 
              className="text-base leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: formatTweetText(tweet.text)
              }} 
            />

            {/* Media */}
            {tweet.media && tweet.media.length > 0 && (
              <div className="relative mt-2 overflow-hidden rounded-lg">
                <Image 
                  src={tweet.media[0].url}
                  alt={tweet.media[0].alt}
                  width={600}
                  height={338}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>{tweet.public_metrics.reply_count}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                <Repeat2 className="h-4 w-4" />
                <span>{tweet.public_metrics.retweet_count}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <Heart className="h-4 w-4" />
                <span>{tweet.public_metrics.like_count}</span>
              </button>
              <a 
                href={`https://twitter.com/kshitijakarsh/status/${tweet.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 