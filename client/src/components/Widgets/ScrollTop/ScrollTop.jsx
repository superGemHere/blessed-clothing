import { useState, useEffect } from 'react'
import { ArrowUpward } from '@mui/icons-material'
import styles from './ScrollTop.module.css'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className={styles.scrollToTopBtn} aria-label="Scroll to top">
          <ArrowUpward />
        </button>
      )}
    </>
  )
}