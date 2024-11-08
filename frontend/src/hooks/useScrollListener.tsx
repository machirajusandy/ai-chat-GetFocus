import { useState, useEffect } from 'react'

const useScrollListener = () => {
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const body = document.body
      const html = document.documentElement

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY || html.scrollTop || body.scrollTop

      if (scrollTop + windowHeight >= height - 100) {
        setAutoScrollEnabled(true)
      } else {
        setAutoScrollEnabled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return autoScrollEnabled
}

export default useScrollListener
