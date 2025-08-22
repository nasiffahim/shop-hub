import { connectToDatabase } from '../../../lib/mongodb'
import Product from '../../../models/Product'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  await connectToDatabase()
  
  const { id } = req.query

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID' })
  }

  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id)
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }
      
      res.status(200).json(product)
    } catch (error) {
      console.error('Error fetching product:', error)
      res.status(500).json({ error: 'Failed to fetch product' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, description, price, category } = req.body
      
      const product = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price: parseFloat(price),
          category: category || ''
        },
        { new: true, runValidators: true }
      )
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }
      
      res.status(200).json(product)
    } catch (error) {
      console.error('Error updating product:', error)
      res.status(500).json({ error: 'Failed to update product' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const product = await Product.findByIdAndDelete(id)
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }
      
      res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
      console.error('Error deleting product:', error)
      res.status(500).json({ error: 'Failed to delete product' })
    }
  }

  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).json({ error: 'Method not allowed' })
  }
}