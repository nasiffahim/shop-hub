import Link from 'next/link'
import styles from '../styles/Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Welcome to ShopHub
          </h1>
          <p className={styles.subtitle}>
            Discover amazing products with modern web technology. 
            Built with Next.js, MongoDB, and NextAuth.js for a seamless shopping experience.
          </p>
          <div className={styles.buttons}>
            <Link href="/products" className={styles.primaryButton}>
              Browse Products
            </Link>
            <Link href="/auth/signin" className={styles.secondaryButton}>
              Get Started
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.placeholder}>
            🛍️
          </div>
        </div>
      </div>
    </section>
  )
}