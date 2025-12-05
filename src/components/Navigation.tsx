import { Home, Calendar, Map, User, Users } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { name: 'Home', icon: Home, page: 'home' },
    { name: 'Events', icon: Calendar, page: 'events' },
    { name: 'Maps', icon: Map, page: 'maps' },
    { name: 'Profile', icon: User, page: 'profile' },
    { name: 'Social', icon: Users, page: 'social' },
  ];

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-white">GSU Commuters Net</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`${
                    isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-white hover:bg-blue-700 hover:text-white'
                  } flex items-center gap-2`}
                  onClick={() => onNavigate(item.page)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}