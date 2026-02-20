import { Add, CategoryOutlined } from '@mui/icons-material'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomTable from '../../components/CustomTable'

function CustomTabPanel({ children, value, index }) {
  return value === index && (
    <Box sx={{ p: 2 }}>
      <Typography>{children}</Typography>
    </Box>
  )
}

function Category() {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{
        bgcolor: '#f8fafc',
        minHeight: '100vh',
        p: { xs: 1.5, sm: 3 }
      }}>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'

        }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Category" icon={<CategoryOutlined />} iconPosition='start' />
            <Tab label="Sub-Category" icon={<CategoryOutlined />} iconPosition='start' />
          </Tabs>

          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Add New
          </Button>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {/* <CustomTable /> */}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          Sub-Category Content
        </CustomTabPanel>
      </Box>


    </>
  )
}

export default Category