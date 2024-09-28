import React from 'react'
import { Box } from '@mui/material'
import { keyframes } from '@mui/system'

const scaleAnimation = keyframes`
  0% {
    transform: scaley(1.0);
    opacity: 1;
  }
  50% {
    transform: scaley(0.4);
    opacity: 0.4;
  }
  100% {
    transform: scaley(1.0);
    opacity: 1;
  }
`

export default function ScaleLoader({
  color = '#C7C8CC',
  size = 35,
  margin = 2,
  speedMultiplier = 1.5,
}) {
  const animationDuration = `${1 / speedMultiplier}s`

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: color,
            width: `${size / 5}px`,
            height: `${size}px`,
            margin: `0 ${margin}px`,
            borderRadius: '2px',
            display: 'inline-block',
            animation: `${scaleAnimation} ${animationDuration} ease-in-out infinite`,
            animationDelay: `${index * 0.1}s`,
            opacity: 1 - (index * 0.15),
          }}
        />
      ))}
      {/* <Box className="sr-only">Loading...</Box> */}
    </Box>
  )
}