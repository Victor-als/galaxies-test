
import { ApolloProvider } from "@apollo/client/react";
import { Home } from "./pages/Home/Home";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme";
import { client } from "./api/appolloClient.";
import { Header } from "./components/Header";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> 
        <Header />
        <Home />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
