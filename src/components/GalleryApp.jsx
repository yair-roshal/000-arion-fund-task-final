import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'

// Styles for the gallery container
const galleryStyles = {
  paddingTop: '90px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '100%',
  boxSizing: 'border-box',
}

// Styles for individual images container
const imagesContainer = {
  boxSizing: 'border-box',
  float: 'left',
}

// Styles for the image itself
const imageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
}

// Styles for the image number overlay
const imageNumberStyles = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
  padding: '5px 10px',
  borderRadius: '5px',
  fontSize: '14px',
}

function GalleryApp({ images }) {
  // Check screen size for responsive design
  const isLargeScreen = useMediaQuery('(min-width: 1200px)')
  const isSmallScreen = useMediaQuery('(max-width: 400px)')
  // Determine the number of images per row based on screen size
  const imagesPerRow = isLargeScreen ? 3 : isSmallScreen ? 1 : 2

  return (
    <Box sx={galleryStyles}>
      {/* Map through the images and create image containers */}
      {images.map((image, index) => (
        <Box
          style={{
            ...imagesContainer,
            width: `calc(100% / ${imagesPerRow})`,
          }}
          key={image.id + index}
        >
          <Paper
            sx={{ p: 1, m: 1 }}
            elevation={24}
            // variant='outlined'
            square
            style={{ position: 'relative' }}
          >
            {/* Display the image */}
            <img
              src={image.download_url}
              alt={image.author}
              style={imageStyles}
            />
            {/* Display the image number */}
            <Typography variant='body2' style={imageNumberStyles}>
              {~~image.id + 1}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  )
}

export default GalleryApp
