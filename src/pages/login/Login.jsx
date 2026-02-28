import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../../components/login/LoginForm";

const Login = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={0} sx={{ flex: 1 }}>
          <Grid
            size={{ xs: 0, md: 6 }}
            sx={{ height: "100vh", display: { xs: "none", md: "block" } }}
          >
            <Box
              component="img"
              src="/login-image.jpg"
              alt="Furniture Image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 720,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                px: { xs: 2, sm: 4 },
                py: { xs: 4, sm: 8 },
              }}
            >
              <LoginForm />
            </Box>

            {/* Footer */}
            <Box
              sx={{
                width: "100%",
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "14px", color: "#acacac", textAlign: "center" }}
              >
                © 2025 SK Furniture © All Right Reserved. Developed by{" "}
                <Box
                  component="span"
                  sx={{ color: "#746be3", fontWeight: 500 }}
                >
                  Mero Vision Pvt. Ltd.
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
