import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const datePickerStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  backgroundColor: '#fff',
  padding: '10px',
  borderBottom: '1px solid #ccc',
  zIndex: '1000',
  display: 'flex',
  alignItems: 'center',
}

function DatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState('')

  const handleDateChange = (e) => {
    const date = e.target.value
    setSelectedDate(date)
    onDateChange(date)
  }

  return (
    <Box sx={datePickerStyles}>
      <TextField
        label='Select a Date'
        type='date'
        value={selectedDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          flex: '1',
          margin: '5px',
        }}
      />
    </Box>
  )
}

export default DatePicker
