import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      transparentCard: string;
      border: string;
      appBarBg: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      transparentCard?: string;
      border?: string;
      appBarBg?: string;
    };
  }
}

export const darkTheme = createTheme({
  shape: {
    borderRadius: 12, 
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#535e63be",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
    custom: {
      transparentCard: "rgba(255, 255, 255, 0.01)",
      border: "rgba(255, 255, 255, 0.1)",
      appBarBg: "rgba(30, 30, 30, 0.7)",
    },
  },
  typography: {
    h6: {
      fontWeight: 700,
      letterSpacing: "0.5px",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.custom.transparentCard,
          backdropFilter: "blur(10px)",
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.custom.border}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.custom.appBarBg,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${theme.palette.custom.border}`,
          boxShadow: "none",
        }),
      },
    },
  },
});
