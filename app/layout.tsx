import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AWS Course Ranking',
  description: 'Ranking tool for AWS course instructors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500">
          {children}
        </div>
      </body>
    </html>
  )
}