import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e2e2e",
    },
    secondary: {
      main: "#8179a6",
    },
    background: {
      default: "#eeeeee",
      paper: "#fafafa",
    },
    text: {
      primary: "#212121",
      secondary: "#424242",
      disabled: "#9e9e9e",
    },
  },
  typography: {
    fontFamily: ' "Raleway", sans-serif',
  },
});
export default theme;
