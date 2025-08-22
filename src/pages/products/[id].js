import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/ProductDetail.module.css'

export default function ProductDetail({ product }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <h1>Product Not Found</h1>
        <Link href="/products">
          <button className={styles.button}>Back to Products</button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} - ShopHub</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className={styles.container}>
        <Link href="/products">
          <button className={styles.backButton}>← Back to Products</button>
        </Link>
        
        <div className={styles.productDetail}>
          <div className={styles.productImage}>
            {/* Placeholder for product image */}
            <div className={styles.imagePlaceholder}>
              📦
            </div>
          </div>
          
          <div className={styles.productInfo}>
            <h1>{product.name}</h1>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.description}>{product.description}</p>
            
            {product.category && (
              <p className={styles.category}>
                <strong>Category:</strong> {product.category}
              </p>
            )}
            
            <p className={styles.date}>
              <strong>Added:</strong> {new Date(product.createdAt).toLocaleDateString()}
            </p>
            
            <div className={styles.actions}>
              <button className={styles.button}>Add to Cart</button>
              <button className={styles.buttonSecondary}>Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${params.id}`)
    
    if (!res.ok) {
      return {
        props: {
          product: null
        }
      }
    }
    
    const product = await res.json()
    
    return {
      props: {
        product
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      props: {
        product: null
      }
    }
  }
}