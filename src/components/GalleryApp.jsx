import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'

const galleryStyles = {
  paddingTop: '90px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '100%',
  boxSizing: 'border-box',
}

const imagesContainer = {
  boxSizing: 'border-box',
  float: 'left',
}

const imageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
}

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
  const isLargeScreen = useMediaQuery('(min-width: 1200px)')
  const imagesPerRow = isLargeScreen ? 3 : 2

  return (
    <Box sx={galleryStyles}>
      {images.map((image, index) => (
        <Box
          style={{
            ...imagesContainer,
            width: `calc(100% / ${imagesPerRow})`,
          }}
          key={image.id}
        >
          <Paper
            sx={{ p: 1 }}
            elevation={24}
            variant='outlined'
            square
            style={{ position: 'relative' }}
          >
            <img
              src={image.download_url}
              alt={image.author}
              style={imageStyles}
            />
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
