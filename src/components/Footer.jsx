import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Clock, MapPin, Phone, Mail, Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, restaurantInfo } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '3.5rem 1.25rem 2.5rem 1.25rem',
        marginTop: '3rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Col 1: Brand Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF7A00 0%, #D9531E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
              }}
            >
              <Flame size={22} />
            </div>
            <div>
              <div className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                SPICEROUTE <span style={{ color: 'var(--accent-saffron)' }}>KITCHEN</span>
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                Authentic flavors. Made fresh.
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Handcrafted Indian royal dining. Slow-cooked over dum embers with pure desi ghee and freshly stone-ground whole spices.
          </p>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            FSSAI License: <strong>{restaurantInfo.fssaiLicense}</strong>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Explore Menu
          </h4>
          {[
            { id: 'menu', label: 'Dum Biryanis' },
            { id: 'menu', label: 'South Indian Crispy Dosas' },
            { id: 'menu', label: 'Tandoori Starters & Kebabs' },
            { id: 'menu', label: 'North Indian Rich Curries' },
            { id: 'menu', label: 'Desserts & Chilled Lassis' },
            { id: 'offers', label: 'Festive Offers & Coupons' },
          ].map((link, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(link.id);
                scrollToTop();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                textAlign: 'left',
                cursor: 'pointer',
                padding: '2px 0',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Col 3: Timings & Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Hours & Location
          </h4>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <Clock size={16} color="var(--accent-saffron)" style={{ marginTop: '3px', flexShrink: 0 }} />
            <div>
              <strong>Monday – Sunday</strong> <br />
              11:00 AM – 11:00 PM
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <MapPin size={16} color="#16A34A" style={{ marginTop: '3px', flexShrink: 0 }} />
            <div>
              {restaurantInfo.address}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            <Phone size={16} color="#9333EA" style={{ flexShrink: 0 }} />
            <div>{restaurantInfo.contactNumber}</div>
          </div>
        </div>

        {/* Col 4: Newsletter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Join the Royal Club
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Subscribe for secret weekend weekend menu drops, chef specials, and festival discount codes.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to SpiceRoute Royal Club!');
            }}
            style={{ display: 'flex', gap: '6px' }}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-saffron"
              style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem' }}
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright & Back to Top */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
        }}
      >
        <div>
          © 2026 SpiceRoute Kitchen. All Rights Reserved. Crafted with authentic heritage recipes.
        </div>

        <button
          onClick={scrollToTop}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '6px 12px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          <span>Back to top</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
};
