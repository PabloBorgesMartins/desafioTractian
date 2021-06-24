import { GlobalStyle } from "./styles/global"
import Routes from './routes'
import AppProvider from "./hooks";

export function App() {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
}


