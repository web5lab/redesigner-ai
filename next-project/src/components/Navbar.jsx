import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { UserSelector } from '../store/global.Selctor';
import logo from "../assets/logo.webp"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(UserSelector);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={` transition-all duration-300 bg-slate-900/95 backdrop-blur-md shadow-lg`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-indigo-400 font-bold text-xl">
              <img src={logo} className="h-10 w-10" alt="Logo" />
              <span>redesignr<span className="text-purple-400">.ai</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              <li><a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a></li>
              <li><Link href="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link></li>
              <li><a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-slate-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </nav>

          {/* Desktop User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user && user.name ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 cursor-pointer">
                  {user.profilePicture ? (
                    <img
                      onClick={() => router.push('/dashboard')}
                      src={user.profilePicture}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span
                    onClick={() => router.push('/dashboard')}
                    className="text-white cursor-pointer"
                  >
                    {user.name}
                  </span>
                </div>
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <a
                  href="https://discord.gg/mg7Z4XeF3k"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                >
                  Contact Us
                </a>
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* Tablet User Section (visible on md and hidden on lg+) */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            {user && user.name ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 cursor-pointer">
                  {user.profilePicture ? (
                    <img
                      onClick={() => router.push('/dashboard')}
                      src={user.profilePicture}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span
                    onClick={() => router.push('/dashboard')}
                    className="text-white cursor-pointer text-sm"
                  >
                    {user.name.length > 10 ? `${user.name.substring(0, 10)}...` : user.name}
                  </span>
                </div>
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 text-sm"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <a
                  href="https://discord.gg/mg7Z4XeF3k"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 text-sm"
                >
                  Contact
                </a>
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 text-sm"
                >
                  DashBoard
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button and Dashboard Link */}
          <div className="flex md:hidden items-center space-x-2">
            {user && user.name && (
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-2 rounded-lg text-sm"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 pb-4 border-t border-slate-700">
            <nav className="pt-4">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="block text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-slate-800"
                    onClick={closeMobileMenu}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="block text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-slate-800"
                    onClick={closeMobileMenu}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="block text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-slate-800"
                    onClick={closeMobileMenu}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="block text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-slate-800"
                    onClick={closeMobileMenu}
                  >
                    FAQ
                  </a>
                </li>
              </ul>

              {/* Mobile User Section */}
              {user && user.name ? (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="text-white">{user.name}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
                  <a
                    href="https://discord.gg/mg7Z4XeF3k"
                    className="block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 text-center mx-4"
                    onClick={closeMobileMenu}
                  >
                    Contact Us
                  </a>
                  <Link
                    href="/login"
                    className="block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 text-center mx-4"
                    onClick={closeMobileMenu}
                  >
                    DashBoard
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;