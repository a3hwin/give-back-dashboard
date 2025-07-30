import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  FolderOpen, 
  Package, 
  ArrowRightLeft, 
  Trophy, 
  Users, 
  LogOut, 
  Menu,
  X,
  Leaf,
  BarChart3
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Categories', href: '/categories', icon: FolderOpen },
  { name: 'Items', href: '/items', icon: Package },
  { name: 'Transactions', href: '/transactions', icon: ArrowRightLeft },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Admins', href: '/admins', icon: Users },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout, currentUser } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    } flex flex-col h-screen shadow-card`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-eco rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Passiton</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-accent"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-eco-green-light text-eco-green font-medium shadow-soft'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="mb-3">
            <p className="text-sm font-medium text-foreground">{currentUser}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`${
            isCollapsed ? 'w-full p-3' : 'w-full justify-start'
          } text-muted-foreground hover:text-destructive hover:bg-destructive/10`}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;