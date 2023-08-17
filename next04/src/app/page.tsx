import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Feedback from './feedback/page'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex justify-center h-screen content-center">
      <h1>Hello World</h1>
    </main>
  )
}
