"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Star } from "lucide-react"

interface CelebrationOverlayProps {
  show: boolean
  onComplete: () => void
  score?: number
  message?: string
}

export function CelebrationOverlay({
  show,
  onComplete,
  score = 1,
  message = "Correct Answer!",
}: CelebrationOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4F46E5", "#8B5CF6", "#EC4899", "#10B981"],
      })

      // Hide after animation completes - reduced from 1500ms to 800ms
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete()
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex flex-col items-center justify-center p-8 rounded-xl bg-gradient-to-br from-green-500/90 to-emerald-600/90 text-white shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="mb-4 rounded-full bg-white/20 p-4"
            >
              <CheckCircle className="h-12 w-12" />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-2"
            >
              {message}
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center"
            >
              <Star className="h-5 w-5 text-yellow-300 mr-1 fill-yellow-300" />
              <span className="text-xl font-bold">
                +{score} {score === 1 ? "point" : "points"}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CelebrationOverlay
