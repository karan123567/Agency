import './globals.css'

export const metadata = {
  title: 'SHAKTI STUDIO — Digital Cosmos',
  description: 'We build extraordinary digital experiences — where technology meets the divine.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
