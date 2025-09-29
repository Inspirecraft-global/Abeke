import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowDownIcon, CartIcon, ProfileIcon, SearchIcon } from '../../icons';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { useAuthStore } from '../../store/auth.store';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, resetAuthenticatedUser } = useAuthStore();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSignOut = () => {
    resetAuthenticatedUser();
    setIsDropdownOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div className="relative">
      <div className="flex p-3 md:p-5 pr-4 md:pr-10">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <img
            className="w-24 md:w-[150px] h-auto"
            src="/images/logo/logo.png"
            alt="Logo"
          />
          <div className="hidden md:flex border font-inter border-gray-300 rounded-md max-w-[500px] w-full pr-3 h-10 items-center">
            <input
              className="w-full h-full focus:outline-none px-3 text-sm"
              placeholder="what are you looking for?"
            />
            <SearchIcon className="ml-2 mt-2 text-gray-400" />
          </div>
          {/* Navigation Items */}
          <div className="flex text-[#000] items-center gap-2 md:gap-6 justify-center">
            <div className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                className="text-base font-semibold hover:text-gray-700 transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="text-base font-semibold hover:text-gray-700 transition-colors"
              >
                Products
              </NavLink>
              <CartIcon className="text-base font-semibold hover:text-blue-600 transition-colors cursor-pointer" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <SearchIcon className="text-base font-semibold" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col gap-1 p-1"
              >
                <div
                  className={`w-5 h-0.5 bg-gray-600 transition-transform ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-gray-600 transition-opacity ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                ></div>
                <div
                  className={`w-5 h-0.5 bg-gray-600 transition-transform ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                ></div>
              </button>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center dropdown-toggle"
              >
                <ProfileIcon className="text-base font-semibold" />
                <ArrowDownIcon
                  className={`inline ml-1 text-gray-400 cursor-pointer transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <Dropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                {isAuthenticated ? (
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <DropdownItem
                      onClick={handleSignOut}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </DropdownItem>
                  </div>
                ) : (
                  <div className="py-2">
                    <DropdownItem
                      to="/login"
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-gray-700 hover:bg-gray-100"
                    >
                      Sign In
                    </DropdownItem>
                    <DropdownItem
                      to="/forms"
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </DropdownItem>
                  </div>
                )}
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg mobile-menu">
          <div className="px-4 py-3 space-y-3">
            <NavLink
              to="/"
              className="block text-base font-semibold hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="block text-base font-semibold hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </NavLink>
            <div className="flex items-center gap-2">
              <CartIcon className="text-base font-semibold" />
              <span className="text-sm text-gray-600">Cart</span>
            </div>

            {/* Mobile Search */}
            <div className="border border-gray-300 rounded-md p-2 mt-3">
              <input
                className="w-full focus:outline-none text-sm"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
