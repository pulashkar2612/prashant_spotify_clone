// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,    // Extra small screens (0px and up)
      sm: 600,  // Small screens (600px and up)
      md: 960,  // Medium screens (960px and up)
      lg: 1280, // Large screens (1280px and up)
      xl: 1920, // Extra-large screens (1920px and up)
    },
  },
});

export default theme;
