import { Box, useTheme } from "@mui/material";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { tokens } from "theme";
import configParticles from "./config.json";

const TSParticles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const updatedConfigParticles = { ...configParticles };
  updatedConfigParticles.particles.color.value =
    theme.palette.mode === "dark" ? colors.primary[200] : colors.grey[500];

  return (
    <Box>
      <Particles
        id="tsparticles"
        init={particlesInit}
        // @ts-ignore
        options={updatedConfigParticles}
      />
    </Box>
  );
};

export default TSParticles;
