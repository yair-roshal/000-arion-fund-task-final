import './App.scss'

import React, { useState, useEffect } from 'react'
import DatePicker from './components/DatePicker'
import GalleryApp from './components/GalleryApp'
import StyledButton from './components/StyledButton'
import Box from '@mui/material/Box'

const limit = 20

function App() {
  // State variables for managing images, pagination, loading state, and errors
  const [images, setImages] = useState([]) // Stores the fetched images
  const [page, setPage] = useState(1) // Keeps track of the current page number
  const [isLoading, setIsLoading] = useState(false) // Indicates whether new images are being loaded
  const [error, setError] = useState(null) // Stores any error that occurs during image fetching

  // useEffect to fetch initial images when the component mounts
  useEffect(() => {
    fetchImages()
  }, [])

  // Function to handle scrolling and trigger image loading
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      fetchImages()
    }
  }

  // useEffect to add and remove the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  // Function to fetch images from the API
  const fetchImages = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
      )
      const data = await response.json()
      setImages((prevImages) => [...prevImages, ...data])
      setPage(page + 1)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle date change and fetch random images
  const handleDateChange = () => {
    const randomInt = Math.floor(Math.random() * 50) + 1
    setImages([])
    setPage(randomInt)
    fetchImages()
  }

  const scrollDown = () => {
    global.scrollBy({
      top: 5000,
      left: 0,
      behavior: 'smooth',
    })
  }

  const scrollToTop = () => {
    global.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <DatePicker onDateChange={handleDateChange} />

      {/* GalleryApp component to display the fetched images */}
      <GalleryApp images={images} />

      {/* Loading indicator */}
      {isLoading && <p>Loading...</p>}

      {/* Display error message if there's an error */}
      {error && <p>Error: {error.message}</p>}

      {/* Scroll To Top button */}
      <StyledButton sxProps={{ right: '20px' }} onClick={scrollToTop}>
        Scroll to Top
      </StyledButton>

      {/* Scroll down button */}
      <StyledButton sxProps={{ left: '20px' }} onClick={scrollDown}>
        Scroll Down
      </StyledButton>
    </>
  )
}

export default App
