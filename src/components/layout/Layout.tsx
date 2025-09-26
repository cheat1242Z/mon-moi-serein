import React from 'react';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Navigation } from './Navigation';

export const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />
      <div className={`${isMobile ? 'max-w-md' : 'max-w-6xl'} mx-auto bg-background/95 backdrop-blur-sm min-h-screen ${isMobile ? 'shadow-xl' : ''}`}>
        <main className={`${isMobile ? 'pb-20 pt-0' : 'pt-16 pb-4'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};