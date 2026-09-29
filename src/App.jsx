import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryPills } from './components/CategoryPills';
import { FoodCard } from './components/FoodCard';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTracker } from './components/OrderTracker';
import { OffersSection } from './components/OffersSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { UserAccountModal } from './components/UserAccountModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import {
  Flame,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  X,
  Star,
} from 'lucide-react';

const MainApp = () => {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    vegFilterOnly,
    setVegFilterOnly,
    nonVegFilterOnly,
    setNonVegFilterOnly,
    bestsellerOnly,
    setBestsellerOnly,
    spicyOnly,
    setSpicyOnly,
    priceSort,
    setPriceSort,
    menuItems,
    isCartOpen,
    setIsCartOpen,
  } = useApp();

  // Modals
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState('orders');

  const openAccountWithTab = (tabName = 'orders') => {
    setAccountInitialTab(tabName);
    setIsAccountOpen(true);
  };

  // Popular / Bestseller items for Home page
  const popularItems = menuItems.filter((i) => i.bestseller).slice(0, 6);

  // Filtered Menu logic
  const filteredDishes = menuItems.filter((dish) => {
    // Category match
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'vegetarian' && !dish.isVeg) return false;
      if (selectedCategory === 'non-veg' && dish.isVeg) return false;
      if (selectedCategory !== 'vegetarian' && selectedCategory !== 'non-veg' && dish.category !== selectedCategory) {
        return false;
      }
    }

    // Veg / Non-Veg toggles
    if (vegFilterOnly && !dish.isVeg) return false;
    if (nonVegFilterOnly && dish.isVeg) return false;

    // Bestseller toggle
    if (bestsellerOnly && !dish.bestseller) return false;

    // Spicy toggle
    if (spicyOnly && !dish.isSpicy) return false;

    // Global Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = dish.name.toLowerCase().includes(q);
      const matchDesc = dish.description.toLowerCase().includes(q);
      const matchCategory = dish.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory) return false;
    }

    return true;
  }).sort((a, b) => {
    if (priceSort === 'low-high') return a.price - b.price;
    if (priceSort === 'high-low') return b.price - a.price;
    if (priceSort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setVegFilterOnly(false);
    setNonVegFilterOnly(false);
    setBestsellerOnly(false);
    setSpicyOnly(false);
    setPriceSort('none');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notifications */}
      <Toast />

      {/* Global Navigation Bar */}
      <Navbar
        onOpenAccount={() => openAccountWithTab('orders')}
        onOpenFavorites={() => openAccountWithTab('favorites')}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onExploreMenu={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOrderNow={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Popular Today Section */}
            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.25rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  marginBottom: '1.75rem',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--accent-saffron)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '4px',
                    }}
                  >
                    <Flame size={16} />
                    <span>CHEF'S SIGNATURE SELECTION</span>
                  </div>
                  <h2 className="heading-serif" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Popular Today
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-outline"
                  style={{ padding: '8px 18px', fontSize: '0.88rem' }}
                >
                  <span>View All 24+ Dishes</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Food Card Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {popularItems.map((dish) => (
                  <FoodCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>

            {/* Category Discovery Preview */}
            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.25rem 3rem 1.25rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 className="heading-serif" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Explore Authentic Cuisines
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
                  Select a category to jump directly into our handcrafted menu
                </p>
              </div>

              <CategoryPills />
            </section>

            {/* Testimonials Snippet on Home */}
            <ReviewsSection />
          </>
        )}

        {/* VIEW 2: COMPLETE RESTAURANT MENU */}
        {activeTab === 'menu' && (
          <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.25rem 4rem 1.25rem' }}>
            {/* Menu Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-saffron)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                <Sparkles size={16} />
                <span>FRESHLY PREPARED • MADE TO ORDER</span>
              </div>
              <h1 className="heading-serif" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                SpiceRoute Royal Menu
              </h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0.5rem auto 0 auto', fontSize: '0.95rem' }}>
                All dishes are cooked fresh in traditional earthen handis and copper vessels with 100% natural ingredients.
              </p>
            </div>

            {/* Category Pills Scroller */}
            <div style={{ marginBottom: '1.25rem' }}>
              <CategoryPills />
            </div>

            {/* Filters and Search Bar Row */}
            <div
              className="glass-card"
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '18px',
                marginBottom: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              {/* Mobile Search input */}
              <div style={{ position: 'relative', flex: '1 1 240px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search biryani, paneer, dosa, naan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '9999px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Filter Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                {/* Veg Toggle */}
                <button
                  onClick={() => {
                    setVegFilterOnly(!vegFilterOnly);
                    if (!vegFilterOnly) setNonVegFilterOnly(false);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    border: `1.5px solid ${vegFilterOnly ? '#16A34A' : 'var(--border-color)'}`,
                    background: vegFilterOnly ? 'rgba(22, 163, 74, 0.15)' : 'transparent',
                    color: vegFilterOnly ? '#16A34A' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div className="badge-veg" style={{ width: '12px', height: '12px' }}>
                    <div className="badge-veg-dot" style={{ width: '5px', height: '5px' }} />
                  </div>
                  <span>Veg Only</span>
                </button>

                {/* Non-Veg Toggle */}
                <button
                  onClick={() => {
                    setNonVegFilterOnly(!nonVegFilterOnly);
                    if (!nonVegFilterOnly) setVegFilterOnly(false);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    border: `1.5px solid ${nonVegFilterOnly ? '#DC2626' : 'var(--border-color)'}`,
                    background: nonVegFilterOnly ? 'rgba(220, 38, 38, 0.15)' : 'transparent',
                    color: nonVegFilterOnly ? '#DC2626' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div className="badge-nonveg" style={{ width: '12px', height: '12px' }}>
                    <div className="badge-nonveg-triangle" style={{ borderBottomWidth: '6px', borderLeftWidth: '3.5px', borderRightWidth: '3.5px' }} />
                  </div>
                  <span>Non-Veg</span>
                </button>

                {/* Bestseller Toggle */}
                <button
                  onClick={() => setBestsellerOnly(!bestsellerOnly)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    border: `1.5px solid ${bestsellerOnly ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                    background: bestsellerOnly ? 'var(--accent-saffron-light)' : 'transparent',
                    color: bestsellerOnly ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Sparkles size={13} />
                  <span>Bestsellers</span>
                </button>

                {/* Spicy Toggle */}
                <button
                  onClick={() => setSpicyOnly(!spicyOnly)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    border: `1.5px solid ${spicyOnly ? '#DC2626' : 'var(--border-color)'}`,
                    background: spicyOnly ? 'rgba(220, 38, 38, 0.15)' : 'transparent',
                    color: spicyOnly ? '#DC2626' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Flame size={13} />
                  <span>Spicy</span>
                </button>

                {/* Price Sort Dropdown */}
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '9999px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="none">Sort By</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="rating">Top Rated (4.8+)</option>
                </select>

                {/* Reset Filters button */}
                {(vegFilterOnly || nonVegFilterOnly || bestsellerOnly || spicyOnly || priceSort !== 'none' || searchQuery) && (
                  <button
                    onClick={resetAllFilters}
                    style={{
                      padding: '6px 10px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-saffron)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Food Items Grid or Empty State */}
            {filteredDishes.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 1.5rem',
                  background: 'var(--bg-card)',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--accent-saffron-light)',
                    color: 'var(--accent-saffron)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                  }}
                >
                  <Search size={28} />
                </div>
                <h3 className="heading-serif" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                  No Dishes Found
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px', maxWidth: '420px', margin: '6px auto 1.5rem auto' }}>
                  No culinary items matched your filters or search term “{searchQuery}”.
                </p>
                <button onClick={resetAllFilters} className="btn-saffron" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                  View Full Menu
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {filteredDishes.map((dish) => (
                  <FoodCard key={dish.id} dish={dish} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* VIEW 3: OFFERS */}
        {activeTab === 'offers' && <OffersSection />}

        {/* VIEW 4: ABOUT US */}
        {activeTab === 'about' && <AboutSection />}

        {/* VIEW 5: REVIEWS */}
        {activeTab === 'reviews' && <ReviewsSection />}

        {/* VIEW 6: LIVE TRACK ORDER */}
        {activeTab === 'track' && <OrderTracker />}

        {/* VIEW 7: ADMIN DASHBOARD */}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Food Customization Modal */}
      <CustomizationModal />

      {/* 3-Step Checkout Modal */}
      <CheckoutModal />

      {/* Order Confirmed Celebration Modal */}
      <OrderConfirmationModal />

      {/* User Account / Orders History / Saved Addresses Modal */}
      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        initialTab={accountInitialTab}
      />

      {/* Restaurant Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
