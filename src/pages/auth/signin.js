import { getProviders, signIn, getSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"
import styles from '../../styles/Auth.module.css'

export default function SignIn({ providers }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCredentialsSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    
    if (result?.ok) {
      router.push('/dashboard/add-product')
    } else {
      alert('Invalid credentials')
    }
    
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Sign In</h1>
        
        {/* Credentials Sign In */}
        <form onSubmit={handleCredentialsSignIn} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        {/* OAuth Providers */}
        {Object.values(providers).map((provider) => (
          provider.id !== 'credentials' && (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/dashboard/add-product' })}
                className={styles.oauthButton}
              >
                Sign in with {provider.name}
              </button>
            </div>
          )
        ))}
        
        <p className={styles.note}>
          Demo credentials: email@demo.com / password123
        </p>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  if (session) {
    return {
      redirect: {
        destination: '/dashboard/add-product',
        permanent: false,
      },
    }
  }

  const providers = await getProviders()
  
  return {
    props: {
      providers,
    },
  }
}