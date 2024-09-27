import React from 'react';
import { ChevronLeft, ChevronRight, Search, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const sidebarItems = [
    { id: 'talent-screening', label: 'Talent Screening', icon: Search, href: '/talent-screening' },
    { id: 'credentialing', label: 'Credentialing', icon: FileCheck, href: '/credentialing' },
    // ... (other items)
  ];

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-indigo-800 text-white transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-16'}`}>
      <Link href="/" className="block p-4 hover:bg-indigo-700">
        <h1 className={`text-2xl font-bold ${isOpen ? '' : 'text-center'}`}>
          {isOpen ? 'Nova' : 'N'}
        </h1>
      </Link>
      <button onClick={toggleSidebar} className="p-4 hover:bg-indigo-700 w-full text-left">
        {isOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
      </button>
      <nav className="mt-8">
        <ul>
          {sidebarItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.id}>
                <Link 
                  href={item.href}
                  className={`flex items-center p-4 hover:bg-indigo-700 ${active ? 'bg-indigo-700' : ''}`}
                >
                  <item.icon className={`w-6 h-6 mr-4 ${active ? 'text-white' : 'text-indigo-300'}`} />
                  {isOpen && <span className={active ? 'font-bold' : ''}>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;