"use client"

// import '@/app/styles/globals.css'
import { Suspense } from 'react'
import Loading from '@/app/loading';
import { Providers } from '@/app/context/provider';

export default function RootLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    // <Suspense fallback={<Loading />}>
    <html lang="en">
      <body>
        <Providers>
          {modal}
          {children}
        </Providers>
      </body>
    </html>
    // </Suspense>
  )
}
