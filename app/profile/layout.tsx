import React from 'react';

import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <div>
      {/* <Navbar /> */}
     <div>
        Announcements: Tomorrow is a holiday!
      </div>
      <div>
        {children}
      </div>
    </div>)
}