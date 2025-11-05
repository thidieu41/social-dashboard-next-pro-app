"use client"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useProgressBar } from "./ProgressProvider"

export default function ProgressWatcher() {
  const pathname = usePathname()
  const prevPath = useRef(pathname)
  const { done } = useProgressBar()

  useEffect(() => {
    // Chỉ gọi done khi route thật sự đổi
    if (prevPath.current !== pathname) {
      const timer = setTimeout(() => {
        done()
      }, 400) // thêm delay nhỏ để page render xong hoàn toàn
      prevPath.current = pathname
      return () => clearTimeout(timer)
    }
  }, [pathname, done])

  return null
}
