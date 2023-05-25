import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react'
import Loading from '@/app/loading';
import Navbar from '@/app/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={<Loading />}>
        <html lang="en">
          <head>
            <title>Port IO</title>
          </head>
          <Navbar />
          <body>
            <div className="container mx-auto">
              {children}
            </div>
          </body>
        </html>
      </Suspense>
    </SessionProvider>
  )
}
