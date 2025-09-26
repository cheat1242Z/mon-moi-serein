import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="max-w-md mx-auto bg-background/95 backdrop-blur-sm min-h-screen shadow-xl">
        <main className="pb-20">
          <Outlet />
        </main>
        <Navigation />
      </div>
    </div>
  );
};