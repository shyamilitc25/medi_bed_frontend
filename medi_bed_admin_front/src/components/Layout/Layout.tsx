import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';


interface LayoutProps {
    children: React.ReactNode;
    pageTitle:string;
  }
  
  
const Layout: React.FC<LayoutProps> = ({ children,pageTitle }) => {
  const [isSidebarOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
     
      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-grow p-4 ">
        <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;