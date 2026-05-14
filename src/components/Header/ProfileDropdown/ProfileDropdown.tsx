import { User } from 'lucide-react';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  children: ReactNode;
}

const ProfileDropdown = ({ children }:DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>

      {/* Avatar Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer border border-white/50 bg-white/15 backdrop-blur-xl shadow-[0_8px_28px_rgba(15,23,42,0.25)] ring-1 ring-white/40 hover:scale-[1.03] hover:ring-2 hover:ring-primary/60 focus:outline-none transition-all duration-300"
      >
        {/* <img
          src={avatarUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        /> */}
        <User className='text-2xl text-black/90 drop-shadow-sm transition-transform duration-300 group-hover:scale-105' />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-2xl border border-white/40 bg-white/20 shadow-[0_20px_50px_rgba(15,23,42,0.28)] ring-1 ring-white/30 focus:outline-none transition-all duration-300 ease-out ${isOpen
          ? 'transform opacity-100 scale-100 visible'
          : 'transform opacity-0 scale-95 invisible -translate-y-1'
          }`}
      >

        <div className="px-2 py-2" >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;