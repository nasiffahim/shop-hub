import Head from 'next/head'
import Link from 'next/link'
import Hero from '../components/Hero'
import styles from '../styles/Home.module.css'

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>ShopHub</title>
        <meta name="description" content="Welcome to our amazing product store" />
      </Head>

      <Hero />

      {/* Product Highlights Section */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <h2>Featured Products</h2>
          <div className={styles.productGrid}>
            {products.slice(0, 3).map((product) => (
              <div key={product._id} className={styles.productCard}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className={styles.price}>${product.price}</span>
                <Link href={`/products/${product._id}`}>
                  <button className={styles.button}>View Details</button>
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.seeAll}>
            <Link href="/products">
              <button className={styles.buttonSecondary}>See All Products</button>
            </Link>
          </div>
        </div>
      </section>
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
    return {
      props: {
        products: []
      }
    }
  }
}