import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Home, 
  Heart, 
  BookOpen, 
  Calendar, 
  Timer, 
  Activity, 
  BarChart3,
  Music
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Accueil' },
  { to: '/dashboard/mood', icon: Heart, label: 'Humeur' },
  { to: '/dashboard/diary', icon: BookOpen, label: 'Journal' },
  { to: '/dashboard/planner', icon: Calendar, label: 'Planning' },
  { to: '/dashboard/pomodoro', icon: Timer, label: 'Focus' },
  { to: '/dashboard/wellness', icon: Activity, label: 'Bien-être' },
  { to: '/dashboard/music', icon: Music, label: 'Musique' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analyses' },
];

export const Navigation = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Navigation mobile compacte en bas
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
        <div className="px-1 py-1">
          <div className="flex justify-around max-w-full overflow-x-auto">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center py-1.5 px-2 rounded-lg transition-all duration-200 min-w-fit ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`
                }
              >
                <Icon size={16} />
                <span className="text-[10px] mt-0.5 font-medium truncate max-w-12">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  // Navigation desktop horizontale en haut
  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex justify-center space-x-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`
              }
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};