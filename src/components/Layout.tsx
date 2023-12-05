import React, { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}
const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <div>
      <Header pageTitle={pageTitle} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout;