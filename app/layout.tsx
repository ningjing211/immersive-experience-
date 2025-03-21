import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Game 2',
  description: 'Created with v0',
  generator: 'v0.dev',
  icons: {
    icon: 'https://conflux-tech.com/wp-content/uploads/2025/03/conflux-game-favicon-48.png',
    shortcut: 'https://conflux-tech.com/wp-content/uploads/2025/03/conflux-game-favicon-48.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
