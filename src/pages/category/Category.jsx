import { Add, CategoryOutlined } from '@mui/icons-material'
import { Box, Button, Tab, Tabs, Typography, } from '@mui/material'
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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState({
    categories: true,
    subCategories: false,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (newValue === 1 && subCategories.length === 0) {
      fetchsubCategories()
    }
  }

  //fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/admin/categories')
      setCategories(response.data.data || [])
      console.log('Categories:', response.data.data)
    } catch (err) {
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(prev => (
        {
          ...prev,
          categories: false
        }
      ))
    }
  }

  //fetch subcategories
  const fetchsubCategories = async () => {
    setLoading(prev => ({ ...prev, subCategories: true }))
    try {
      const response = await api.get('/api/admin/sub-categories')
      setSubCategories(response.data.data || [])
      console.log('Sub-categories:', response.data.data)
    } catch (err) {
      console.log('Error fetchibng sub-categoreis:', err)
    } finally {
      setLoading(prev => ({ ...prev, subCategories: false }))
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const categoryColumns = [
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
  ]

  const subCategoryColumns = [
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
  ]

  const categoryRows = categories.map(cat => ({
    id: cat.id,
    image: cat.category_image,
    name: cat.name,
    description: cat.description,
  }))

  const subCategoryRows = subCategories.map(subCat => ({
    id: subCat.id,
    image: subCat.category_image || subCat.image,
    name: subCat.name,
    category: subCat.parent?.name || 'N/A'
  }))

  const handleAddNew = () => {
    if (value === 0) {
      console.log('Add new category')
    } else {
      console.log('Add new sub-category')
    }
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
            onClick={handleAddNew}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Add New {value === 0 ? 'Category' : 'Sub-Category'}
          </Button>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {loading.categories ? (
            <Typography>Loading categories. . .</Typography>
          ) : (
            <CustomTable
              columns={categoryColumns}
              rows={categoryRows}
            />
          )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {loading.subCategories ? (
            <Typography>Loading sub-categories...</Typography>
          ) : (
            <CustomTable
              columns={subCategoryColumns}
              rows={subCategoryRows}
            />
          )}
        </CustomTabPanel>

      </Box>
    </>
  )
}

export default Category