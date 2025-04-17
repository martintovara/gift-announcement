import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { GUIDE } from "../../config/env";

const Guide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const borderColor =
    theme.palette.mode === "dark" ? colors.primary[300] : colors.primary[300];

  const guideItems = GUIDE.TEXT.split(";").map((item) => item.trim());

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
          {GUIDE.HEAD}
        </Typography>
        <ul
          style={{
            paddingLeft: "20px",
            fontSize: "calc(12px + 0.75vw)",
          }}
        >
          {guideItems.map((item, index) => (
            <li key={index} style={{ marginBottom: "16px" }}>
              {item}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Guide;
