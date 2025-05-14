import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 0.5, sm: 1 },
        px: 4,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        letterSpacing: "1px",
        opacity: 0.85,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.background.default,
        fontSize: theme.typography.footer.fontSize,
      }}
    >
      <Typography
        variant="inherit"
        style={{ color: colors.grey[100], userSelect: "none" }}
      >
        Martin Tovara © 2025
      </Typography>
    </Box>
  );
};

export default React.memo(Footer);
