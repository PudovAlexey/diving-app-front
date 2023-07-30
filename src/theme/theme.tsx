import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#000214",
      dark: "#002884",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ff7961",
      main: "#41424F",
      dark: "#ba000d",
      contrastText: "#ffffff",
    },
    grey: {
      main: "#9A9A9A",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          borderRadius: "40px",
          padding: "0.4rem 4rem",
          fontFamily: "Roboto",
          fontSize: "16px",
          textTransform: "uppercase",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: ({ theme }) => ({
          fontFamily: "Montserrat",
          fontSize: "80px",
          fontWeight: "bold",
          letterSpacing: "10px",
          textTransform: "uppercase",
          color: theme.palette.primary.contrastText,
        }),
        h2: ({ theme }) => ({
          fontFamily: "Roboto",
          fontSize: "60px",
          fontWeight: "bold",
          color: theme.palette.grey.main,
        }),
        root: () => ({
          fontFamily: "Roboto",
          fontSize: "20px",
          fontWeight: "bold",
          color: theme.palette.primary.contrastText,
        }),
      },
    },
  },
});

export { theme };
