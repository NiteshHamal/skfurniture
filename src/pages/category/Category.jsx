import { Add, CategoryOutlined } from '@mui/icons-material'
import { Box, Button, Tab, Tabs, Typography,  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/CustomTable'
import api from '../../services/api'
import axios from 'axios'

function CustomTabPanel({ children, value, index }) {
  return value === index && (
    <Box sx={{ p: 2 }}>
      {children}
    </Box>
  )
}

function Category() {
  const [value, setValue] = useState(0)
  const[categories, setCategories] = useState([]);
  const[loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response= await api.get('/api/admin/categories')
        setCategories(response.data.data || [])
        console.log(response.data.data);
      } catch (err) {
        console.error('Error fetching categories:', err)
      } finally{
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const columns = [
    {key: 'image', label: 'Image'},
    {key: 'name', label: 'Name' },
    {key: 'description', label: 'Description'},
  ]

  const rows = categories.map(cat => ({
    image: cat.category_image,
    name: cat.name,
    description: cat.description,
  }))

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
          {loading ? <Typography>Loading . . . </Typography>: <CustomTable columns={columns} rows={rows}></CustomTable>}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          Sub-Category Content
        </CustomTabPanel>
      </Box>


    </>
  )
}

export default Category