import Link from 'next/link'
import styles from '../styles/ProductCard.module.css'

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>
          📦
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description
          }
        </p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>
          <Link href={`/products/${product._id}`}>
            <button className={styles.button}>View Details</button>
          </Link>
        </div>
      </div>
    </div>
  )
}