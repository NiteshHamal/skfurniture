import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

    const navigate = useNavigate()

    const[email, setEmail]= useState('')
    const[password, setPassword]= useState('')
    const[loading, setLoading] = useState(false)
    const[error, setError]= useState('')

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await api.post('/api/admin/auth/login', {
                email,
                password,
            })

            const {access_token, user} = response.data.data
          

            // storage token for future request 
            localStorage.setItem('token', access_token)
            
            localStorage.setItem('user', JSON.stringify(user))

            console.log('logged in user:', user)
            console.log('login response:', response.data)

            navigate('/')
            
        } catch (error) {
            setError(
                error.response?.data?.message|| 'Invalid email or password'
            )
        } finally{
            setLoading(false)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
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
                    <TextField fullWidth size="small"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </Box>
                {/* Password */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: 12, mb: 0.5 }}>
                        Password
                    </Typography>
                    <TextField fullWidth size="small" type="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </Box>
                <Button
                    fullWidth
                    type='sumbit'
                    variant="contained"
                    disabled= {loading}
                    sx={{
                        height: 42,
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 2,
                        fontSize: '14px',
                        bgcolor: '#746be3'
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>

            </form>
        </>
    )
}

export default LoginForm
