import { createTheme, withTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        color: 'secondary',
        fullWidth: true,
      },
    },
  },
  palette: {
    primary: {
      main: '#2e2e2e',
    },
    secondary: {
      main: '#8179a6',
    },
    background: {
      default: '#eeeeee',
      paper: '#fafafa',
    },
    text: {
      primary: '#212121',
      secondary: '#424242',
      disabled: '#9e9e9e',
    },
  },
  typography: {
    fontFamily: ' "Raleway", sans-serif',
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 769,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
});
export default theme;
