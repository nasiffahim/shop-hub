import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ShopHub
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/products" className={styles.link}>
            Products
          </Link>
          
          {session ? (
            <div className={styles.userMenu}>
              <Link href="/dashboard/add-product" className={styles.link}>
                Dashboard
              </Link>
              <span className={styles.userEmail}>{session.user.email}</span>
              <button 
                onClick={() => signOut()} 
                className={styles.signOutButton}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/auth/signin" className={styles.signInButton}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}