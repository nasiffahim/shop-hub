import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../styles/AddProduct.module.css'

export default function AddProduct() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          price: parseFloat(product.price)
        }),
      })

      if (res.ok) {
        alert('Product added successfully!')
        setProduct({
          name: '',
          description: '',
          price: '',
          category: ''
        })
        router.push('/products')
      } else {
        alert('Error adding product')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error adding product')
    }
    
    setLoading(false)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <div className={styles.container}>
        <h1>Access Denied</h1>
        <p>You need to be signed in to access this page.</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Add Product - Dashboard</title>
      </Head>

      <div className={styles.container}>
        <h1>Add New Product</h1>
        <p>Welcome, {session.user.email}!</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              rows={4}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category (Optional)</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}