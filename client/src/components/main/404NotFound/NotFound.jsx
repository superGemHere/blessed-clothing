import React from 'react';
import { Box, Typography, Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from '@mui/icons-material';

import NikeAirMaxImg from '../../../assets/NikeAirMax.png';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',
    },
    background: {
      default: '#f3f3f3',
      paper: '#f3f3f3',
    },
  },
});

export default function NotFound() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'primary.main',
          textAlign: 'center',
          paddingBottom: 4,
        }}
      >
        <Box
          component="img"
          src={NikeAirMaxImg}
          alt="Large Shoe Silhouette"
          sx={{
            width: '100%',
            maxWidth: 500,
            height: '300',
            mb: 4,
            mt: 0,
          }}
        />
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '4rem', sm: '6rem', md: '8rem' }, fontWeight: 'bold', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, mb: 4 }}>
          Shoe Not Found
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, mb: 4, maxWidth: 600 }}>
          We've looked high and low, but it seems this shoe has wandered off. Let's get you back on the right path!
        </Typography>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Home />}
          href="/"
          sx={{ 
            borderColor: 'primary.main', 
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            px: 4,
            py: 1.5,
            fontSize: '1.2rem',
          }}
        >
          Return to Home
        </Button>
      </Box>
    </ThemeProvider>
  );
}