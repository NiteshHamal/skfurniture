import { KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';


function Navbar() {

    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    const pageTitles = {
        '/': 'Dashboard',
        '/category': 'Category',
        '/product': 'Product',
        '/settings': 'Settings'
    }

    const title = pageTitles[location.pathname] || 'Dashboard'; // fallback
    return (
        <>
            <Box sx={{
                height: 65,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee ',
                px: 2,
            }}>

                {/* LEFT */}
                <Typography variant="h6">{title}</Typography>

                {/* RIGHT (icons / profile / buttons later) */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box /> {/* notification icon later */}
                    <Box>
                        <IconButton onClick={handleOpen}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,            // space between avatar, text, arrow
                                textTransform: 'none', // prevent uppercase
                                padding: 0.5,
                                borderRadius: 2,
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                            }}>
                            <Avatar sx={{ width: 36, height: 36 }}>
                            </Avatar>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>Nitesh</Typography>
                            <KeyboardArrowDown></KeyboardArrowDown>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/login" selected={location.pathname === '/login'}>Logout</MenuItem>
                        </Menu>
                    </Box>

                </Box>
            </Box>
        </>
    )
}

export default Navbar
