import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { CategoryOutlined, DashboardOutlined, HomeOutlined, Menu, SettingsOutlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';


const drawerWidth = 270;


function Sidebar() {

    const location = useLocation();


    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", px: 2, minHeight: 56, }} >
                    <Box
                        component="img"
                        src='/logo.png'
                        alt='Logo'
                        sx={{
                            height: 36,
                            maxWidth: "140px",
                            objectFit: "contain",
                        }}
                    />
                    <IconButton size="small">
                        <Menu />
                    </IconButton>
                </Toolbar>

                <Divider sx={{ m: 0 }} />
                <List component="nav" sx={{ p: 0 }}>
                    {/* MAIN CATEGORY */}
                    <ListSubheader
                        sx={{
                            bgcolor: "inherit",
                            px: 2,
                            mt: 2,
                            fontSize: "12px",
                            fontWeight: 400,
                            fontFamily: "Lato, serif",
                            color: "#6c6b80",
                            textTransform: "uppercase",
                            fontStyle: "normal",
                            letterSpacing: "1px",
                        }}
                    >
                        Main
                    </ListSubheader>
                    <ListItemButton component={Link} to="/" selected={location.pathname === '/'}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 1,
                            "&:hover": {
                                bgcolor: "rgba(0,0,0,0.04)",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: "#555" }}>
                            <HomeOutlined></HomeOutlined>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/category" selected={location.pathname === '/category'}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 1,
                            "&:hover": {
                                bgcolor: "rgba(0,0,0,0.04)",
                            }
                        }}>
                        <ListItemIcon sx={{ minWidth: 40, color: "#555" }}>
                            <CategoryOutlined></CategoryOutlined>
                        </ListItemIcon>
                        <ListItemText primary="Category" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/product" selected={location.pathname === '/product'}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 1,
                            "&:hover": {
                                bgcolor: "rgba(0,0,0,0.04)",
                            }
                        }}>
                        <ListItemIcon sx={{ minWidth: 40, color: "#555" }}>
                            <DashboardOutlined></DashboardOutlined>
                        </ListItemIcon>
                        <ListItemText primary="Product" />
                    </ListItemButton>

                    {/* SETUP CATEGORY */}
                    <ListSubheader sx={{ bgcolor: "inherit", px: 2, mt: 2 }}>Setup</ListSubheader>
                    <ListItemButton component={Link} to="/settings" selected={location.pathname === '/settings'}
                        sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 1,
                            "&:hover": {
                                bgcolor: "rgba(0,0,0,0.04)",
                            }
                        }}>
                        <ListItemIcon sx={{ minWidth: 40, color: "#555" }}>
                            <SettingsOutlined></SettingsOutlined>
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </List>

            </Drawer>

        </>
    )
}

export default Sidebar
