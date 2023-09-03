import './App.scss'

import React, { useState, useEffect } from 'react'
import DatePicker from './components/DatePicker'
import GalleryApp from './components/GalleryApp'
import StyledButton from './components/StyledButton'
import Box from '@mui/material/Box'
import { Link } from 'react-scroll'

const limit = 20
function App() {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // useEffect____________________

  useEffect(() => {
    fetchImages()
  }, [])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return
    }
    fetchImages()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  // functions__________________

  const fetchImages = async () => {
    console.log('fetchImages')
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

  const handleDateChange = (date) => {
    const randomInt = Math.floor(Math.random() * 50) + 1

    setImages([])
    setPage(randomInt)
    fetchImages()
  }

  return (
    <>
      <Box>
        <div id='top'></div>

        <DatePicker onDateChange={handleDateChange} />
        <GalleryApp images={images} />
      </Box>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <Link to='top' smooth={true} duration={1000} offset={-50}>
        <StyledButton sxProps={{ right: '20px' }}>Scroll to Top</StyledButton>
      </Link>

      <div id='down'></div>

      <Link to='down' smooth={true} duration={1000} offset={-50}>
        <StyledButton sxProps={{ left: '20px' }}>Scroll Down</StyledButton>
      </Link>
    </>
  )
}

export default App
