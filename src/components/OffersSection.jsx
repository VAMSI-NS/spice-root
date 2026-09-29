import React from 'react';
import { useApp } from '../context/AppContext';
import { Tag, Sparkles, Copy, Check, ArrowRight, Percent, Flame } from 'lucide-react';

export const OffersSection = () => {
  const { availableCoupons, applyCouponCode, setIsCartOpen, setActiveTab } = useApp();

  const handleApply = (code) => {
    applyCouponCode(code);
    setIsCartOpen(true);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.25rem 4rem 1.25rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'var(--accent-saffron-light)',
            color: 'var(--accent-saffron)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
          }}
        >
          <Sparkles size={16} />
          <span>EXCLUSIVE DEALS & REWARDS</span>
        </div>

        <h1 className="heading-serif" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          SpiceRoute Offers & Fest Deals
        </h1>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0.5rem auto 0 auto', fontSize: '1rem' }}>
          Apply coupons at checkout or click below to auto-apply right into your feast cart!
        </p>
      </div>

      {/* Featured Big Banner */}
      <div
        style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #FF7A00 0%, #D9531E 100%)',
          color: '#FFF',
          padding: '2.5rem',
          marginBottom: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          alignItems: 'center',
          gap: '2rem',
          boxShadow: 'var(--shadow-saffron)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div>
          <span
            style={{
              background: '#FFF',
              color: '#E65100',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            FIRST ORDER SPECIAL
          </span>

          <h2 className="heading-serif" style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '0.75rem', lineHeight: 1.15 }}>
            Get ₹100 OFF On Your First Order
          </h2>

          <p style={{ opacity: 0.9, marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Experience the true aroma of aged saffron and dum-cooked royal handi dishes.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px dashed #FFF',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
              }}
            >
              WELCOME100
            </div>

            <button
              onClick={() => handleApply('WELCOME100')}
              style={{
                background: '#FFF',
                color: '#E65100',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              Apply Offer
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
            alt="Royal Dum Biryani"
            style={{
              width: '100%',
              maxWidth: '320px',
              borderRadius: '20px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
              transform: 'rotate(-2deg)',
            }}
          />
        </div>
      </div>

      {/* Grid of Other Coupons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {availableCoupons.map((coupon) => (
          <div
            key={coupon.code}
            className="glass-card"
            style={{
              padding: '1.5rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span
                  style={{
                    background: `${coupon.color}20`,
                    color: coupon.color,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                  }}
                >
                  {coupon.tag}
                </span>

                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {coupon.discount}
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {coupon.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {coupon.description}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px dashed var(--border-color)',
              }}
            >
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: 'var(--text-primary)',
                }}
              >
                {coupon.code}
              </div>

              <button
                onClick={() => handleApply(coupon.code)}
                className="btn-saffron"
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <span>Apply</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
