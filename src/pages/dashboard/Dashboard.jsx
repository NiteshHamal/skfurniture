import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Metricbar from '../../components/dashboard/Metricbar'
import { Category, ContactMail, Inventory, People, Star, ToggleOn } from '@mui/icons-material'
import { useRoutes } from 'react-router-dom'
import MonthlyAcitvityChart from '../../components/dashboard/MonthlyAcitvityChart'

const Dashboard = () => (
    <>
        <Box sx={{
            bgcolor: '#f8fafc',
            minHeight: '100vh',
            p: { xs: 1.5, sm: 3 }
        }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4">Dashboard Overview</Typography>
                <Typography>Welcome back! Here's what's happening with your store today.</Typography>
            </Box>

            <Grid container spacing={2.5} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Metricbar
                        icon={<People />}
                        value={1}
                        title="Total Users"
                        iconBgColor='#ede9fe'
                        iconColor='#7c3aed'
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Metricbar
                        icon={<Category />}
                        value={27}
                        title="Categories"
                        iconBgColor='#fce7f3'
                        iconColor='#ec4899'
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Metricbar
                        icon={<Inventory />}
                        title="Total Products"
                        value={2}
                        iconBgColor={'#dbeafe'}
                        iconColor={'#3b82f6'}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Metricbar
                        icon={<ToggleOn />}
                        title={'Active Products'}
                        value={2}
                        iconBgColor={'#d1fae5'}
                        iconColor={'#10b981'}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Metricbar
                        icon={<Star />}
                        title={'Featured'}
                        value={2}
                        iconBgColor={'#fef3c7'}
                        iconColor={'#f59e0b'}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Metricbar
                        icon={<ContactMail />}
                        title={'Contact'}
                        value={0}
                        iconBgColor={'#fee2e2'}
                        iconColor={'#ef4444'}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2.5} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12 }} 
                sx={{ 
                    border: '1px solid #e2e8f0', 
                    backgroundColor: '#fff',
                    borderRadius: '12px'
                    }}>
                    <Typography variant="h6" sx={{ m: 2 }}>
                        Monthly Activity Overview
                    </Typography>
                    <MonthlyAcitvityChart />
                </Grid>
            </Grid>

            {/* Reacent User and Contacts */}
            <Grid container spacing={2.5} sx={{ mb:4}}>
                {/* Recent Products  */}
            <Grid size={ {xs: 12 , md: 7}}>

                </Grid>
            </Grid>
        </Box>
    </>
)

export default Dashboard



