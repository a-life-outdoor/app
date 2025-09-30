import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Micro Adventures',
  description: 'Find your next adventure with like-minded people',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
