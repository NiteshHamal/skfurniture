import { ArrowCircleLeftOutlined, CategoryOutlined, CloudUpload, Delete } from '@mui/icons-material'
import { Box, Button, FormControlLabel, Grid, IconButton, Paper, Switch, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CustomTabPanel({ children, value, index }) {
    return value === index && (
        <Box sx={{ p: 2 }}>
            {children}
        </Box>
    )
}

function AddProduct() {
    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    const [images, setImages] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])

    const handleBack = () => {
        navigate('/product')
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);

        //Generate preview URLs
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    }

    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
            //Revoke the object URL to avoid memory leaks
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        })
    }

    return (
        <>
            <Box sx={{
                bgcolor: '#f8fafc',
                minHeight: '100vh',
                p: { xs: 1.5, sm: 3 },

            }}>
                <Box sx={{ mb: 3 }} >
                    <Button
                        onClick={handleBack}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                            color: 'text.primary',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                opacity: 0.7
                            }
                        }}
                        startIcon={<ArrowCircleLeftOutlined />}
                    >
                        Back
                    </Button>

                    <Tabs value={value} onChange={handleChange}>
                        <Tab label='Add Product' icon={<CategoryOutlined />} iconPosition='start' />
                    </Tabs>
                </Box>

                {/* form content */}

                <CustomTabPanel value={value} index={0}>
                    <Paper sx={{ p: 3 }}>
                        <Grid container spacing={3}>

                            {/* First row - three fields */}

                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <Typography variant='subtitle2' gutterBottom>
                                    Product Name
                                </Typography>
                                <TextField
                                    fullWidth
                                    size='small'
                                    placeholder='Enter Product name'
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <Typography variant='subtitle2' gutterBottom>
                                    Sub Category
                                </Typography>
                                <TextField
                                    fullWidth
                                    size='small'
                                    placeholder='Select sub category'
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <Typography variant='subtitle2' gutterBottom>Sales Price</Typography>
                                <TextField
                                    fullWidth
                                    size='small'
                                    type='number'
                                    placeholder='Enter sale Price'
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Cross Price
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="number"
                                    placeholder="Enter cross price"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Is Active"
                                    labelPlacement='start'
                                    sx={{ mt: 3.5 }} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Is Featured"
                                    labelPlacement='start'
                                    sx={{ mt: 3.5 }} />
                            </Grid>

                            {/* Image Upload Section */}
                            <Box sx={{ mt: 4 }}>
                                <Typography variant='h6' gutterBottom>
                                    Product Images
                                </Typography>
                                <Button
                                    variant='outlined'
                                    component='label'
                                    startIcon={<CloudUpload />}
                                    sx={{ mb: 2 }}
                                >
                                    Upload Images
                                    <input
                                        type='file'
                                        hidden
                                        multiple
                                        accept='image/*'
                                        onChange={handleImageChange}
                                    />
                                </Button>

                                {/* Image Preview Section */}
                                {imagePreviews.length > 0 && (
                                    <Grid container spacing={2}>
                                        {imagePreviews.map((preview, index) => (
                                            <Grid item xs={6} sm={4} md={3} key={index}>
                                                <Box sx={{
                                                    position: 'relative',
                                                    width: 100,
                                                    height: 100
                                                }}>
                                                    <img
                                                        src={preview}
                                                        alt={`preview-${index}`}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            borderRadius: 4,
                                                        }}
                                                    />
                                                    <IconButton
                                                        size='small'
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -8,
                                                            right: -8,
                                                            bgcolor: 'background.paper',
                                                            boxShadow: 1,
                                                            '&:hover': {
                                                                bgcolor: 'error.light',
                                                                color: 'white'
                                                            },
                                                        }}
                                                        onClick={() => handleRemoveImage(index)}
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </Box>
                        </Grid>
                    </Paper>
                </CustomTabPanel>
            </Box>
        </>
    )
}

export default AddProduct
