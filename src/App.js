import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar/Topbar";
import { Route, Routes } from "react-router-dom";

import "@fontsource/source-sans-pro";
import TSParticles from "scenes/global/tsParticles/tsParticles";
import Footer from "scenes/global/Footer/Footer";
import GiftBoxAnnouncement from "scenes/content/GiftBox";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <div className="content">
            <Topbar />
            <TSParticles key={theme.palette.mode} />
            <Routes>
              <Route path="/" element={<GiftBoxAnnouncement />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
