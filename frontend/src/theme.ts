import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#535e63be", // cinza azulado neutro
    },
    background: {
      default: "#121212", // fundo geral escuro
      paper: "#1e1e1e", // fundo de cards/painéis
    },
    text: {
      primary: "#ffffff", // texto principal
      secondary: "#b0bec5", // texto secundário
    },
  },
});