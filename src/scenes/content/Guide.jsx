import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Guide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const borderColor =
    theme.palette.mode === "dark" ? colors.primary[300] : colors.primary[300];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "1000px",
          width: "95%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          minHeight: "50%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            fontSize: "25pt",
          }}
        >
          Nápověda
        </Typography>
        <ul
          style={{
            paddingLeft: "20px",
            fontSize: "17pt",
          }}
        >
          <li style={{ marginBottom: "16px" }}>
            Vítám vás v této rychlé interaktivní hře, kde na vás čeká jedna
            záhadná hádanka a překvapení!
          </li>
          <li style={{ marginBottom: "16px" }}>
            Při najetí na stránku se objeví tajemný <strong>"dárek"</strong>.
            Pokud na něj poklepete dvakrát (double-click), otevře se před vámi{" "}
            <strong>hádanka</strong>. Po správné odpovědi odhalíte něco opravdu
            zajímavého!
          </li>
          <li style={{ marginBottom: "16px" }}>
            Nezapomeňte, že to, co se ve hře dozvíte, je <strong>tajné</strong>!
            Nikomu neprozrazujte, co jste zjistili, ať si ostatní hráči mohou
            užít překvapení stejně jako vy.
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default Guide;
