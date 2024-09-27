import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Settings, LogOut } from 'lucide-react';

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">John Doe</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">Account</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
            <Settings className="w-4 h-4 inline-block mr-2" />
            Settings
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
            <LogOut className="w-4 h-4 inline-block mr-2" />
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default UserProfile;