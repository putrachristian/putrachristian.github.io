import { useEffect, useCallback } from "react"

// Throttle function to limit function calls
const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Custom hook for scroll optimization
export const useScrollOptimization = () => {
  useEffect(() => {
    // Disable smooth scrolling during fast scrolls for better performance
    let scrollTimeout
    const handleScroll = throttle(() => {
      document.documentElement.style.scrollBehavior = "auto"
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.documentElement.style.scrollBehavior = "smooth"
      }, 150)
    }, 16) // ~60fps

    // Add passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Optimize scroll container
  const optimizeScrollContainer = useCallback((element) => {
    if (!element) return

    // Enable hardware acceleration
    element.style.transform = "translateZ(0)"
    element.style.willChange = "scroll-position"

    // Optimize for mobile
    element.style.webkitOverflowScrolling = "touch"
  }, [])

  return { optimizeScrollContainer }
}
