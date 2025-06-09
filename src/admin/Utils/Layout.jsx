import React from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      {/* Main content beside the sidebar */}
      <div className="flex-grow-1 p-4" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
