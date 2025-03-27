"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { Github, Mail, Linkedin, ExternalLink, Code, Activity } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Dock } from "@/components/dock"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProgressBar } from "@/components/progress-bar"
import { ScrollProgress } from "@/components/scroll-progress"
import { CustomCursor } from "@/components/custom-cursor"
import { BlurFadeSection } from "@/components/blur-fade-section"
import { RetroGrid } from "@/components/retro-grid"
import { ShinyBorder } from "@/components/shiny-border"
import { TweetCard } from "@/components/tweet-card"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { GitHubContributions } from "@/components/github-calendar"

// Define the props type for the project
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
}

// Skills data
const skills = [
  { name: "React / Next.js", percentage: 90 },
  { name: "TypeScript", percentage: 85 },
  { name: "Node.js", percentage: 80 },
  { name: "CSS / Tailwind", percentage: 95 },
  { name: "UI/UX Design", percentage: 75 },
  { name: "Database / API", percentage: 85 },
]

// Projects data
const projects = [
  {
    title: "Dhairya",
    description: "A full-featured platform to join gym trainers and users with dashboard",
    image: "/images/Dhairya.png",
    technologies: ["React.js", "Node.js", "Tailwind CSS", "Cloudinary"],
    link: "https://dhairya-five.vercel.app/",
    github: "https://github.com/kshitijakarsh/Dhairya",
  },
  {
    title: "Working",
    description: "",
    image: "/images/Loading.gif",
    technologies: [],
    link: "#",
    github: "#",
  },
  {
    title: "Working",
    description: "",
    image: "/images/Loading.gif",
    technologies: [],
    link: "#",
    github: "#",
  },
  {
    title: "Working",
    description: "",
    image: "/images/Loading.gif",
    technologies: [],
    link: "#",
    github: "#",
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <ShinyBorder className="hover-lift h-full">
      <div className="relative h-40 w-full overflow-hidden">
        <Image 
          src={project.image || "/placeholder.svg"} 
          alt={project.title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-0.5 bg-secondary text-xs rounded-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 justify-end mt-3">
          <a href={project.github} className="text-sm text-foreground/70 hover:text-primary inline-flex items-center">
            <Github className="h-3.5 w-3.5 mr-1" />
            Code
          </a>
          <a href={project.link} className="text-sm text-foreground/70 hover:text-primary inline-flex items-center">
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Demo
          </a>
        </div>
      </CardContent>
    </ShinyBorder>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMounted, setIsMounted] = useState(false)
  const [username, setUsername] = useState("kshitijakarsh")

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    if (!isMounted) return;
    
    const sections = ["home", "about", "projects", "github"]

    for (const section of sections) {
      const element = document.getElementById(section)
      if (!element) continue

      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveSection(section)
        break
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMounted, handleScroll])
  
  const currentYear = isMounted ? new Date().getFullYear() : 2024;

  return (
    <main className="min-h-screen bg-background">
      {/* Fixed Elements */}
      <ScrollProgress />
      <CustomCursor />
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <Dock activeSection={activeSection} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-5">
        <div className="absolute inset-0 overflow-hidden">
          <RetroGrid />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-28 h-28 md:w-36 md:h-36 mb-6 border-2 border-primary/50 rounded-full overflow-hidden">
            <Image 
              src="/images/pfp.jpg"
              alt="Profile Picture" 
              fill
              sizes="(max-width: 768px) 112px, 144px"
              priority
              className="object-cover" 
            />
          </div>

          <div className="mb-3">
            <TypewriterEffect text="Kshitij Akarsh" />
          </div>
          <p className="text-xl text-cyan-400 font-mono mb-6">Full Stack Developer</p>

          <div className="flex gap-6">
            <a href="#" className="neon-text p-2 hover:text-cyan-400 transition-colors duration-300">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="neon-text p-2 hover:text-purple-400 transition-colors duration-300">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="neon-text p-2 hover:text-pink-400 transition-colors duration-300">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <BlurFadeSection>
        <section id="about" className="section-container">
          <h2 className="section-heading">About</h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-5">
              <p>
                Hello! I'm a passionate full-stack developer with expertise in React, Next.js, and Node.js. I love building beautiful, functional websites and applications.
              </p>
              <p className="text-muted-foreground">
                With over 5 years of experience in web development, I've worked on a variety of projects ranging from small business websites to complex enterprise applications.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you can find me hiking, reading, or experimenting with new technologies.
              </p>
            </div>
            
            <div className="space-y-5">
              <h3 className="text-lg font-medium mb-4">Skills</h3>
              {skills.map((skill, index) => (
                <ProgressBar 
                  key={index}
                  label={skill.name}
                  percentage={skill.percentage}
                  delay={index * 100}
                  color="hsl(var(--primary))"
                />
              ))}
            </div>
          </div>
        </section>
      </BlurFadeSection>

      {/* Tweet Section with increased width and spacing */}
      <BlurFadeSection>
        <section className="py-20 md:py-32"> {/* Increased vertical spacing */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6"> {/* Wider container for tweets */}
            <TweetCard />
          </div>
        </section>
      </BlurFadeSection>

      {/* Projects Section */}
      <BlurFadeSection>
        <section id="projects" className="section-container">
          <h2 className="section-heading">Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>
      </BlurFadeSection>

      {/* GitHub Section */}
      <BlurFadeSection>
        <section id="github" className="section-container">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Contribution Activity</h3>
                  </div>
                  <a 
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                
                <div className="contribution-wrapper">
                  <GitHubContributions username={username} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </BlurFadeSection>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/30 mt-16">
        <div className="max-w-3xl mx-auto px-5">
          <p>© {currentYear} Kshitij Akarsh</p>
        </div>
      </footer>
    </main>
  )
}