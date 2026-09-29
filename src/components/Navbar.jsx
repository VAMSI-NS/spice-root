import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Search,
  Heart,
  ShoppingBag,
  User,
  Sun,
  Moon,
  ShieldCheck,
  Compass,
  Tag,
  Info,
  Clock,
  Menu as MenuIcon,
  X,
  Star,
} from 'lucide-react';

export const Navbar = ({ onOpenAccount, onOpenFavorites }) => {
  const {
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    cartCount,
    cartGrandTotal,
    favorites,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    orders,
    restaurantInfo,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const activeOrdersCount = orders.filter(
    (o) => o.statusCode !== 'delivered' && o.statusCode !== 'cancelled'
  ).length;

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop & Tablet Top Bar */}
      <header
        className="glass-nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Top announcement bar */}
        <div
          style={{
            background: 'linear-gradient(90deg, #E65100 0%, #FF7A00 50%, #E65100 100%)',
            color: '#FFFFFF',
            fontSize: '0.78rem',
            fontWeight: 600,
            padding: '5px 16px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            letterSpacing: '0.02em',
          }}
        >
          <Flame size={14} />
          <span>✨ Flat ₹100 OFF on your first royal order! Use code: <strong>WELCOME100</strong></span>
          <span style={{ opacity: 0.8, margin: '0 4px' }}>|</span>
          <span>⚡ 30-min express hot delivery</span>
        </div>

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0.8rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}
        >
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FF7A00 0%, #D9531E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                boxShadow: 'var(--shadow-saffron)',
              }}
            >
              <Flame size={24} />
            </div>
            <div>
              <div
                className="font-serif"
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                }}
              >
                SPICEROUTE
                <span style={{ color: 'var(--accent-saffron)', marginLeft: '4px' }}>KITCHEN</span>
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                }}
              >
                Authentic Indian Flavors
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
            }}
            className="desktop-nav"
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'menu', label: 'Menu' },
              { id: 'offers', label: 'Offers', badge: 'New' },
              { id: 'about', label: 'About' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'track', label: 'Track Order', activeCount: activeOrdersCount },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: isActive ? 'var(--accent-saffron-light)' : 'transparent',
                    color: isActive ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.92rem',
                    padding: '8px 14px',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    position: 'relative',
                  }}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        padding: '1px 6px',
                        borderRadius: '9999px',
                        background: 'var(--accent-saffron)',
                        color: '#FFF',
                        fontWeight: 700,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.activeCount > 0 && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#16A34A',
                        boxShadow: '0 0 8px #16A34A',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Global Search Bar */}
          <div
            style={{
              position: 'relative',
              flex: '1',
              maxWidth: '280px',
              display: 'none',
            }}
            className="desktop-search"
          >
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: isSearchFocused ? 'var(--accent-saffron)' : 'var(--text-muted)',
                transition: 'color 0.2s',
              }}
            />
            <input
              type="text"
              placeholder="Search biryani, dosa, paneer..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'menu') setActiveTab('menu');
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 38px',
                borderRadius: '9999px',
                background: 'var(--bg-secondary)',
                border: `1.5px solid ${isSearchFocused ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Actions: Theme Toggle, Favorites, Cart, Account, Admin */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#6366F1" />}
            </button>

            {/* Favorites Button */}
            <button
              onClick={onOpenFavorites}
              title="View Favorites"
              style={{
                position: 'relative',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: favorites.length > 0 ? '#EF4444' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Heart size={18} fill={favorites.length > 0 ? '#EF4444' : 'none'} />
              {favorites.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#EF4444',
                    color: '#FFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-saffron"
              style={{
                padding: '8px 16px',
                fontSize: '0.88rem',
              }}
            >
              <ShoppingBag size={18} />
              <span style={{ fontWeight: 700 }}>
                {cartCount > 0 ? `${cartCount} • ₹${Math.round(cartGrandTotal)}` : 'Cart'}
              </span>
            </button>

            {/* User Account */}
            <button
              onClick={onOpenAccount}
              title="User Account & Orders"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px 6px 6px',
                borderRadius: '9999px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
              className="desktop-user-btn"
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--accent-saffron)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                }}
              >
                AP
              </div>
              <span>Aarav</span>
            </button>

            {/* Admin Switch */}
            <button
              onClick={() => handleNavClick(activeTab === 'admin' ? 'home' : 'admin')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: activeTab === 'admin' ? '#9333EA' : 'transparent',
                color: activeTab === 'admin' ? '#FFF' : 'var(--text-muted)',
                border: `1px solid ${activeTab === 'admin' ? '#9333EA' : 'var(--border-color)'}`,
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title="Toggle Admin Demo Dashboard"
            >
              <ShieldCheck size={14} />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 45,
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '8px 6px 12px 6px',
        }}
        className="mobile-bottom-nav"
      >
        {[
          { id: 'home', label: 'Home', icon: Flame },
          { id: 'menu', label: 'Menu', icon: Compass },
          { id: 'offers', label: 'Offers', icon: Tag },
          { id: 'track', label: 'Track', icon: Clock, badge: activeOrdersCount > 0 ? activeOrdersCount : null },
          { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount > 0 ? cartCount : null, isAction: true },
          { id: 'account', label: 'Account', icon: User, isAccountAction: true },
        ].map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isAction) {
                  setIsCartOpen(true);
                } else if (item.isAccountAction) {
                  onOpenAccount();
                } else {
                  handleNavClick(item.id);
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: isActive ? 'var(--accent-saffron)' : 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                position: 'relative',
                flex: 1,
              }}
            >
              <div style={{ position: 'relative' }}>
                <Icon size={20} />
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-8px',
                      background: item.id === 'cart' ? 'var(--accent-saffron)' : '#16A34A',
                      color: '#FFF',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-search { display: block !important; }
          .mobile-bottom-nav { display: none !important; }
          .desktop-user-btn { display: flex !important; }
        }
        @media (max-width: 859px) {
          .desktop-user-btn { display: none !important; }
          body { padding-bottom: 70px; }
        }
      `}</style>
    </>
  );
};
