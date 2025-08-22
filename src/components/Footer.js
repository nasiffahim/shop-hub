import Link from 'next/link'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h4>ShopHub</h4>
            <p>Built with Next.js, MongoDB, and NextAuth.js</p>
          </div>
          
          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/auth/signin">Sign In</Link></li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h4>Contact</h4>
            <p>Email: info@mystore.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}