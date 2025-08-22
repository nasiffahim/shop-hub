import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { MongoClient } from "mongodb"
import bcrypt from 'bcryptjs'

const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = client.connect()

// ✅ Export authOptions separately
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Demo user for testing
        if (credentials.email === 'email@demo.com' && credentials.password === 'password123') {
          return {
            id: 'demo-user',
            email: 'email@demo.com',
            name: 'Demo User',
          }
        }

        try {
          const client = await clientPromise
          const users = client.db().collection('users')
          
          const user = await users.findOne({ email: credentials.email })
          
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return {
              id: user._id.toString(), // ✅ make sure id is string
              email: user.email,
              name: user.name,
            }
          }
        } catch (error) {
          console.error('Auth error:', error)
        }
        
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// ✅ Default export still needed
export default NextAuth(authOptions)
