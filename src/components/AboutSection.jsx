import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  ShieldCheck,
  ChefHat,
  Flame,
  Heart,
} from 'lucide-react';

export const AboutSection = () => {
  const { restaurantInfo } = useApp();

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.25rem 4rem 1.25rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
          <ChefHat size={16} />
          <span>OUR CULINARY HERITAGE</span>
        </div>

        <h1 className="heading-serif" style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Cooking with tradition, <br />
          <span style={{ color: 'var(--accent-saffron)' }}>serving with passion.</span>
        </h1>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0.75rem auto 0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Preserving India's richest culinary legacies with authentic stone-ground spices, clay tandoors, and slow dum handis.
        </p>
      </div>

      {/* Main Story Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          marginBottom: '3.5rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 className="heading-serif" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            The SpiceRoute Story
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.7 }}>
            {restaurantInfo.story}
          </p>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.7 }}>
            We never use artificial colors, chemical preservatives, or reused cooking oils. Every dish that leaves our kitchen is sealed with food-grade tamper-evident packaging and cooked fresh on your order.
          </p>

          {/* Pillars Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ padding: '14px', borderRadius: '14px', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-saffron)', fontWeight: 800 }}>
                <Flame size={18} />
                <span>Clay Dum Embers</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Handis sealed with whole wheat dough for sealed aroma
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '14px', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontWeight: 800 }}>
                <Award size={18} />
                <span>Stone Ground Spices</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Fresh batches prepared daily without pre-ground mixes
              </div>
            </div>
          </div>
        </div>

        {/* Gallery / Photos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80"
            alt="SpiceRoute Kitchen Ambiance"
            style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '18px' }}
          />
          <img
            src="https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&auto=format&fit=crop&q=80"
            alt="Authentic Tandoor cooking"
            style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '18px', marginTop: '1.5rem' }}
          />
        </div>
      </div>

      {/* Info Cards Row (Timings, Address, Contact, FSSAI) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.25rem',
        }}
      >
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-saffron-light)', color: 'var(--accent-saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Opening Hours</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Monday – Sunday <br />
            <strong>11:00 AM – 11:00 PM</strong>
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(22, 163, 74, 0.15)', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={20} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Restaurant Location</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {restaurantInfo.address}
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(147, 51, 234, 0.15)', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={20} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Contact & Reservations</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Phone: <strong>{restaurantInfo.contactNumber}</strong> <br />
            Email: <strong>{restaurantInfo.email}</strong>
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={20} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Hygiene & Safety</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            FSSAI Lic: <strong>{restaurantInfo.fssaiLicense}</strong> <br />
            100% Eco-Friendly Packaging
          </p>
        </div>
      </div>
    </div>
  );
};
