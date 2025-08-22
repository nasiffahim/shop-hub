import { connectToDatabase } from '../../../lib/mongodb'
import Product from '../../../models/Product'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'   // <-- import your auth config

export default async function handler(req, res) {
  await connectToDatabase()

  if (req.method === 'GET') {
    try {
      const products = await Product.find({}).sort({ createdAt: -1 })
      return res.status(200).json(products)
    } catch (error) {
      console.error('Error fetching products:', error)
      return res.status(500).json({ error: 'Failed to fetch products' })
    }
  }

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)  // ✅ use this instead
    
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    try {
      const { name, description, price, category } = req.body

      if (!name || !description || !price) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const product = new Product({
        name,
        description,
        price: parseFloat(price),
        category: category || '',
        createdBy: session.user.id,
      })

      await product.save()
      return res.status(201).json(product)
    } catch (error) {
      console.error('Error creating product:', error)
      return res.status(500).json({ error: 'Failed to create product' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).json({ error: 'Method not allowed' })
}
