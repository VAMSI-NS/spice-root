import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Star,
  Award,
  ChevronDown,
  Percent,
} from 'lucide-react';

export const Hero = ({ onExploreMenu, onOrderNow }) => {
  const { setActiveTab } = useApp();

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '2.5rem 1.25rem 3.5rem 1.25rem',
        background: 'radial-gradient(ellipse at 80% 20%, var(--accent-saffron-light) 0%, transparent 60%)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '3rem',
        }}
      >
        {/* Left Column: Headline & Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'var(--accent-saffron-light)',
              border: '1px solid rgba(255, 122, 0, 0.3)',
              color: 'var(--accent-saffron)',
              fontSize: '0.85rem',
              fontWeight: 700,
              width: 'fit-content',
            }}
          >
            <Sparkles size={16} />
            <span>AUTHENTIC HERITAGE RECIPES • MADE FRESH</span>
          </div>

          {/* Main Headline */}
          <div>
            <h1
              className="heading-serif"
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                lineHeight: 1.08,
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
              }}
            >
              Good food. <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #FF7A00 0%, #D9531E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Good mood.
              </span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '520px',
              }}
            >
              Freshly prepared Indian favorites, slow-cooked in traditional handis and delivered piping hot to your doorstep.
            </p>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={onOrderNow}
              className="btn-saffron"
              style={{
                padding: '14px 28px',
                fontSize: '1.05rem',
                fontWeight: 700,
              }}
            >
              <span>Order Now</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onExploreMenu}
              className="btn-outline"
              style={{
                padding: '14px 26px',
                fontSize: '1.02rem',
                fontWeight: 600,
              }}
            >
              <span>Explore Menu</span>
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Highlights & Trust badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-saffron)',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                }}
              >
                <Star size={20} fill="var(--accent-saffron)" />
                <span>4.9 / 5</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                12,000+ Happy Foodies
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#16A34A',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                }}
              >
                <Clock size={20} />
                <span>30-40 min</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Express Hot Delivery
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#9333EA',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                }}
              >
                <Award size={20} />
                <span>100% Desi</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Pure Ghee & Handground
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Food Spread */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Glowing background halo */}
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,122,0,0.25) 0%, rgba(255,122,0,0) 70%)',
              top: '10%',
              left: '10%',
              zIndex: 0,
              filter: 'blur(30px)',
            }}
          />

          {/* Main Hero Spread Image Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '540px',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '2px solid rgba(255, 122, 0, 0.25)',
              zIndex: 1,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&auto=format&fit=crop&q=85"
              alt="Authentic Indian Food Feast: Biryani, Dosa, Paneer, Naan"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transform: 'scale(1.02)',
                transition: 'transform 0.5s ease',
              }}
            />

            {/* Gradient bottom overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                color: '#FFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ background: '#16A34A', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                  FRESH TODAY
                </span>
                <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>Chefs Special Handi Dum</span>
              </div>
              <div className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                Royal Awadhi & Coastal Culinary Spread
              </div>
            </div>
          </div>

          {/* Floating Pill: Customer Review */}
          <div
            className="glass-card"
            style={{
              position: 'absolute',
              top: '-15px',
              right: '-10px',
              zIndex: 3,
              padding: '10px 16px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(255, 122, 0, 0.3)',
              animation: 'bike-float 4s ease-in-out infinite',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF7A00 0%, #D9531E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
              }}
            >
              <Flame size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '2px', color: '#F59E0B' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#F59E0B" />
                ))}
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                “Best Biryani in town!”
              </div>
            </div>
          </div>

          {/* Floating Pill: First Order Discount */}
          <div
            onClick={() => setActiveTab('offers')}
            className="glass-card"
            style={{
              position: 'absolute',
              bottom: '15px',
              left: '-15px',
              zIndex: 3,
              padding: '10px 16px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(22, 163, 74, 0.4)',
              cursor: 'pointer',
              animation: 'bike-float 3.5s ease-in-out infinite reverse',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
              }}
            >
              <Percent size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 800, textTransform: 'uppercase' }}>
                Special Offer
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                ₹100 OFF with WELCOME100
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
