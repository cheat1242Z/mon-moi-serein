import React from 'react';
import { NavLink } from 'react-router-dom';
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
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/mood', icon: Heart, label: 'Humeur' },
  { to: '/diary', icon: BookOpen, label: 'Journal' },
  { to: '/planner', icon: Calendar, label: 'Planning' },
  { to: '/pomodoro', icon: Timer, label: 'Focus' },
  { to: '/wellness', icon: Activity, label: 'Bien-être' },
  { to: '/music', icon: Music, label: 'Musique' },
  { to: '/analytics', icon: BarChart3, label: 'Analyses' },
];

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary bg-primary/10 scale-105'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};