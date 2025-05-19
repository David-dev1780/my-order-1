"use client"

import { usePathname, useRouter } from "next/navigation"
import { Bell, BookOpen, Coins, Gift, Home, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [tokens, setTokens] = useState(50)

  // In a real app, this would fetch tokens from an API or context
  useEffect(() => {
    // This is just a placeholder for demonstration
    const interval = setInterval(() => {
      // Simulate token changes for demo purposes
      const storedTokens = localStorage.getItem("quiz_tokens")
      if (storedTokens) {
        setTokens(Number.parseInt(storedTokens))
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      name: "Exams",
      href: "/subjects/civil-services",
      icon: BookOpen,
      active: pathname.includes("/exams") || pathname.includes("/subjects"),
    },
    {
      name: "Current Affairs",
      href: "/current-affairs",
      icon: Bell,
      active: pathname.includes("/current-affairs"),
    },
    {
      name: "Battle",
      href: "/battle",
      icon: Users,
      active: pathname.includes("/battle"),
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: Gift,
      active: pathname.includes("/tasks") || pathname.includes("/invite"),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      active: pathname.includes("/profile"),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
      <div className="flex items-center justify-around h-16 bg-gradient-to-r from-background to-muted/30">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.href)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              "text-muted-foreground hover:text-foreground transition-colors",
              item.active ? "text-primary" : "",
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-950 px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md">
          <Coins className="h-3 w-3 mr-1" />
          {tokens} tokens
        </div>
      </div>
    </div>
  )
}
