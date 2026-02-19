import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

function LoginForm() {
    return (
        <>
            <form>
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: '32px',
                            color: '#746be3',
                        }}
                    >
                        SK Furniture
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '22px',
                            color: '#383838',
                        }}
                    >
                        Hey, Hello 👋
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            color: '#7f7e92',
                        }}
                    >
                        Enter the information you entered while registering.
                    </Typography>
                </Box>
                {/* Email */}
                <Box sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12, mb: 0.5 }}>
                        Email
                    </Typography>
                    <TextField fullWidth size="small" />
                </Box>
                {/* Password */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: 12, mb: 0.5 }}>
                        Password
                    </Typography>
                    <TextField fullWidth size="small" type="password" />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        height: 42,
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        fontSize: '14px',
                        bgcolor: '#746be3'
                    }}
                >
                    Login
                </Button>

            </form>
        </>
    )
}

export default LoginForm
