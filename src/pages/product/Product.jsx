import { Add, CategoryOutlined } from '@mui/icons-material'
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/CustomTable'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

function CustomTabPanel({ children, value, index }) {
  return value === index && (
    <Box sx={{ p: 2 }}>
      {children}
    </Box>
  )
}

function Product() {

  const navigate = useNavigate()
  const [value] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  //fetch products
  const fetchProducts= async() => {
    try{
      const response = await api.get('/api/admin/products')
      setProducts(response.data.data || [])
      console.log('Products:', response.data.data)
    } catch(err){
      console.log('Error Fetching products:', err)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleViewProduct = (row) => {
    console.log('View product:', row)
  }

  const handleEditProduct = (row) => {
    console.log('View Product:', row)
  }

  const handleDeleteProduct = (row) => {
    console.log('Delete Product:', row)
    if(window.confirm(`Are you sure you want to delete ${row.name}?`)){

    }
  }

  const handleAddNewProduct = () => {
    navigate('add-product')
  }


  //Define table columns
  const productColumns = [
    {key: 'image', label: 'Image'},
    {key: 'name', label: 'Name'},
    {key: 'subcategory', label: 'Sub-Category'},
    {key: 'sale_price', label: 'Sale Price'},
    {key: 'cross_price', label: 'Cross Price'},
    {key: 'action', label: 'Action'},
  ]

  //Transform product data for table
  const productRows = products.map(product => ({
    id: product.id,
    image: product.product_images?.[0]?.url || null,
    name: product.name,
    subcategory: product.sub_category?.name || 'N/A',
    sale_price: product.sale_price,
    cross_price: product.cross_price,
    original: product 
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
          <Tabs value={value} >
            <Tab label="Product" icon={<CategoryOutlined />} iconPosition='start' />
          </Tabs>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={handleAddNewProduct}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Add New Product
          </Button>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {loading ? (
            <Typography>Loading products. . .</Typography>
          ):(
            <CustomTable 
            columns={productColumns}
            rows={productRows}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          )}
        </CustomTabPanel>
      </Box>
    </>
  )
}

export default Product
