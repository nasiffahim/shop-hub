import Head from 'next/head'
import Link from 'next/link'
import ProductCard from '../../components/ProductCard'
import styles from '../../styles/Products.module.css'

export default function Products({ products }) {
  return (
    <>
      <Head>
        <title>Products - ShopHub</title>
        <meta name="description" content="Browse all our amazing products" />
      </Head>

      <div className={styles.container}>
        <h1>All Products</h1>
        
        {products.length === 0 ? (
          <div className={styles.empty}>
            <p>No products available yet.</p>
            <Link href="/auth/signin">
              <button className={styles.button}>Sign in to add products</button>
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`)
    const products = await res.json()
    
    return {
      props: {
        products: products || []
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        products: []
      }
    }
  }
}