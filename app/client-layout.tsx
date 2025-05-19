"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomNavigation } from "@/components/bottom-navigation"
import { usePathname } from "next/navigation"

// Client component to conditionally render navigation
function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavigation = pathname === "/login" || pathname === "/onboarding" || pathname.startsWith("/onboarding/")

  return (
    <>
      {children}
      {!hideNavigation && <BottomNavigation />}
    </>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NavigationWrapper>{children}</NavigationWrapper>
    </ThemeProvider>
  )
}
