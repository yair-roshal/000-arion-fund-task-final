import React from 'react'
import { Button } from '@mui/material'

const StyledButton = ({ sxProps, onClick, children }) => (
  <Button
    sx={{
      fontSize: '15px',
      fontWeight: '500',
      border: '2px solid #000',
      backgroundColor: 'lightgray !important',
      color: '#000',
      position: 'fixed',
      bottom: '20px',
      cursor: 'pointer',
      padding: '5px 10px',
      ...sxProps,
    }}
    onClick={onClick}
  >
    {children}
  </Button>
)

export default StyledButton
