import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar/Topbar";
import { Route, Routes } from "react-router-dom";

import "@fontsource/source-sans-pro";
import TSParticles from "./scenes/global/tsParticles/tsParticles";
import Footer from "./scenes/global/Footer/Footer";
import GiftBoxAnnouncement from "./scenes/content/GiftBox";
import Guide from "./scenes/content/Guide";
import Gallery from "scenes/content/Gallery";
import { GALLERY } from "../src/config/env";

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
              <Route path="*" element={<GiftBoxAnnouncement />} />
              <Route path="/" element={<GiftBoxAnnouncement />} />
              <Route path="/Guide" element={<Guide />} />
              <Route
                path="/Gallery"
                element={
                  <Gallery
                    folderPath="/my-gallery"
                    imageCount={parseInt(GALLERY.NB_IMGS)}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
