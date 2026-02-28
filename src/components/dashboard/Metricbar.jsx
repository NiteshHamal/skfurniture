import { Box, Paper, Typography } from "@mui/material";
import React from "react";

function Metricbar({ icon, value, title, iconBgColor, iconColor }) {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          minHeight: 100,
          borderRadius: 4,
          px: 2.5,
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.2s",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "10px",
              color: iconColor,
              backgroundColor: iconBgColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" },
            }}
          >
            <Typography>{value}</Typography>
            <Typography>{title}</Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default Metricbar;
