import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#232938',
      light: '#4f535f',
      dark: '#181c27',
    },
    secondary: {
      main: '#D4AF37',
      light: '#dcbf5f',
      dark: '#947a26',
    },
  },
});

theme = responsiveFontSizes(theme);

export { theme };