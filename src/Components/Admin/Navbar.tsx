import { Tooltip } from '@mui/material';
import {
  Bell,
  BookOpen,
  Building,
  Inbox,
  Landmark,
  LogOut,
  MenuIcon,
  Settings,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../Pages/Notification';

interface NotificationType {
  _id: string;
  upperHeadding: string;
  description: string;
  type: string;
  pandingId?: string;
}

const navItems = [
  { label: 'Colleges', icon: <Landmark /> },
  { label: 'Departments', icon: <Building /> },
  { label: 'Users', icon: <Users /> },
  { label: 'Classes', icon: <BookOpen /> },
  { label: 'Requests', icon: <Inbox /> },
  { label: 'Notifications', icon: <Bell /> }
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState<NotificationType[]>([]);

  const handleSetting = () => {
    navigate('/admin/setting', { state: { type: 'Admin' } });
  };

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`transition-all duration-300 sticky top-2 ${isExpanded ? 'w-[25%]' : 'w-[5%]'} h-full z-50`}
    >
      <nav className="flex flex-col justify-between items-center p-4 w-full h-full bg-amber-400 rounded-tr-2xl rounded-br-2xl shadow-lg">
        
        {/* Header with Logo and Menu Button */}
        <div className={`flex items-center w-full ${isExpanded ? 'justify-between' : 'justify-center'} h-16`}>
          {isExpanded && (
            <Link to="/" className="font-bold text-2xl text-blue-900">
              QuickAttend
            </Link>
          )}
          <Tooltip title="Menu">
            <div className={`flex items-center justify-center bg-white rounded-[10px] ${isExpanded ? 'w-10 h-10' : 'w-12 h-12'}`}>
              <MenuIcon color="#1c398e" size={isExpanded ? 28 : 35} />
            </div>
          </Tooltip>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col flex-1 items-center justify-center gap-5">
          {navItems.map((item) => (
            <Tooltip key={item.label} title={item.label} placement="right">
              <span
                onClick={() => navigate('/hod/view')}
                className="text-blue-900 flex items-center gap-2 text-base font-medium cursor-pointer hover:bg-yellow-300 px-3 py-2 rounded-lg transition-all"
              >
                <span className="text-xl">{item.icon}</span>
                {isExpanded && <span>{item.label}</span>}
              </span>
            </Tooltip>
          ))}
        </div>

        {/* Bottom Icons */}
        <div className={`flex ${isExpanded ? 'justify-between' : 'flex-col items-center'} gap-4 w-full`}>
          {isExpanded && (
            <>
              <span
                onClick={handleSetting}
                className="text-blue-900 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md relative"
              >
                <Tooltip title="Setting">
                  <Settings />
                </Tooltip>
              </span>

              <span
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-blue-900 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md relative"
              >
                <Tooltip title="Notification">
                  <Bell size={24} />
                </Tooltip>

                {notifications.length > 0 && (
                  <span className="absolute top-[-5px] right-[-8px] bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notifications.length}
                  </span>
                )}

                {showNotifications && (
                  <div className="absolute top-[-35px] right-0 z-50 bg-white shadow-lg rounded-lg">
                    <Notification
                      fun={setShowNotifications}
                      notifications={notifications}
                      type="Hod"
                    />
                  </div>
                )}
              </span>
            </>
          )}

          <span
            onClick={handleSetting}
            className="text-blue-900 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer bg-white shadow-md relative"
          >
            <Tooltip title="Logout">
              <LogOut />
            </Tooltip>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
