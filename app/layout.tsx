"use client"

// import '@/styles/globals.css'
import { Suspense } from 'react'
import Loading from '@/app/loading';
import { NextAuthProvider } from '@/app/context/provider';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <Suspense fallback={<Loading />}>
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
    // </Suspense>
  )
}
