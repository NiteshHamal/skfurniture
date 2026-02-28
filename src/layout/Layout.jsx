import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar></Sidebar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Navbar></Navbar>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
