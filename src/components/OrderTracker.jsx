import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  MapPin,
  Bike,
  Phone,
  CheckCircle2,
  ChefHat,
  Store,
  Home,
  ShieldCheck,
  ChevronDown,
  Navigation,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export const OrderTracker = () => {
  const {
    orders,
    trackingOrderId,
    setTrackingOrderId,
    updateOrderStatus,
    setActiveTab,
    restaurantInfo,
  } = useApp();

  // Find currently selected order
  const order = orders.find((o) => o.id === trackingOrderId) || orders[0];

  // Dynamic status index (0 = placed, 1 = accepted, 2 = preparing, 3 = out_for_delivery, 4 = delivered)
  const getStatusIndex = (code) => {
    switch (code) {
      case 'pending': return 0;
      case 'accepted': return 1;
      case 'preparing': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 2;
    }
  };

  const currentStep = order ? getStatusIndex(order.statusCode) : 2;

  // Driver bike position along path percentage
  const getBikePositionPercent = (stepIndex) => {
    switch (stepIndex) {
      case 0: return 5;
      case 1: return 15;
      case 2: return 25;
      case 3: return 68;
      case 4: return 92;
      default: return 50;
    }
  };

  const bikePercent = getBikePositionPercent(currentStep);

  const stepDetails = [
    { title: 'Order Placed', desc: 'We have received your royal order', icon: CheckCircle2, time: 'Just now' },
    { title: 'Restaurant Accepted', desc: 'Master chefs are reviewing the ticket', icon: Store, time: '2 mins' },
    { title: 'Preparing Food', desc: 'Simmering in traditional handi on slow dum 👨‍🍳', icon: ChefHat, time: '15 mins' },
    { title: 'Out for Delivery', desc: 'Delivery hero is on the way with your hot food 🛵', icon: Bike, time: '25 mins' },
    { title: 'Delivered', desc: 'Delivered hot to your doorstep. Enjoy! 🎉', icon: Home, time: '35 mins' },
  ];

  if (!order) {
    return (
      <div
        style={{
          maxWidth: '800px',
          margin: '3rem auto',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
        }}
      >
        <Bike size={48} color="var(--accent-saffron)" style={{ marginBottom: '1rem' }} />
        <h2 className="heading-serif" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
          No Active Orders to Track
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '6px', marginBottom: '1.5rem' }}>
          Place an order from our authentic menu to watch live preparation & delivery!
        </p>
        <button
          onClick={() => setActiveTab('menu')}
          className="btn-saffron"
          style={{ padding: '12px 24px' }}
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.25rem 4rem 1.25rem' }}>
      {/* Top Header Row with Order Selector */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: currentStep === 4 ? '#16A34A' : 'var(--accent-saffron)',
                color: '#FFF',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
              }}
            >
              {order.status || 'Live Tracking'}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Placed at {order.date}
            </span>
          </div>

          <h1 className="heading-serif" style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '4px' }}>
            Order #{order.id}
          </h1>
        </div>

        {/* Order Selector dropdown if multiple orders exist */}
        {orders.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Select Order:
            </span>
            <select
              value={order.id}
              onChange={(e) => setTrackingOrderId(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  #{o.id} — {o.status} ({o.items.length} items)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid: Interactive Map on Left, Timeline on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          alignItems: 'start',
        }}
      >
        {/* LEFT: Simulated Map Canvas / Interface */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'var(--bg-tertiary)',
              border: '2px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              minHeight: '340px',
            }}
          >
            {/* Stylized Simulated Map Graphic SVG Background */}
            <svg
              viewBox="0 0 500 340"
              style={{ width: '100%', height: '100%', display: 'block', background: '#19202A' }}
            >
              {/* Map grid lines & roads */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </pattern>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <rect width="500" height="340" fill="url(#grid)" />

              {/* Curving City Road Pathways */}
              <path
                d="M 60 80 Q 150 180 250 140 T 420 260"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 60 80 Q 150 180 250 140 T 420 260"
                fill="none"
                stroke="url(#roadGradient)"
                strokeWidth="6"
                strokeDasharray="8,8"
                strokeLinecap="round"
              />

              {/* Secondary city streets */}
              <path d="M 120 40 L 180 300" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <path d="M 300 30 L 360 310" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <path d="M 20 200 L 460 200" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />

              {/* Start Point: SpiceRoute Kitchen */}
              <circle cx="60" cy="80" r="24" fill="rgba(255,122,0,0.2)" className="radar-ping" />
              <circle cx="60" cy="80" r="14" fill="#FF7A00" />
              <text x="60" y="84" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">🍲</text>
              <text x="60" y="116" fill="#FDFBF7" fontSize="11" fontWeight="bold" textAnchor="middle">SpiceRoute Hub</text>

              {/* End Point: Customer Home */}
              <circle cx="420" cy="260" r="22" fill="rgba(16,185,129,0.2)" className="radar-ping" />
              <circle cx="420" cy="260" r="14" fill="#10B981" />
              <text x="420" y="264" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">🏠</text>
              <text x="420" y="294" fill="#FDFBF7" fontSize="11" fontWeight="bold" textAnchor="middle">{order.address?.tag || 'Your Home'}</text>

              {/* Live Moving Delivery Bike Marker */}
              <g
                transform={`translate(${
                  currentStep === 0 ? 60 :
                  currentStep === 1 ? 110 :
                  currentStep === 2 ? 180 :
                  currentStep === 3 ? 310 : 420
                }, ${
                  currentStep === 0 ? 80 :
                  currentStep === 1 ? 125 :
                  currentStep === 2 ? 160 :
                  currentStep === 3 ? 195 : 260
                })`}
                className="bike-anim"
              >
                <circle cx="0" cy="0" r="20" fill="rgba(255, 122, 0, 0.3)" />
                <circle cx="0" cy="0" r="15" fill="#FF7A00" stroke="#FFF" strokeWidth="2.5" />
                <text x="0" y="4" fill="#FFF" fontSize="11" textAnchor="middle">🛵</text>
              </g>
            </svg>

            {/* Floating Live Status Overlay Pill */}
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                padding: '12px 16px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: currentStep === 4 ? '#16A34A' : 'var(--accent-saffron)',
                    boxShadow: `0 0 10px ${currentStep === 4 ? '#16A34A' : 'var(--accent-saffron)'}`,
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {currentStep === 4 ? 'Delivered successfully! 🎉' :
                     currentStep === 3 ? 'Out for delivery with Vikram 🛵' :
                     currentStep === 2 ? 'Master Chef preparing in kitchen 👨‍🍳' : 'Restaurant accepted order'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Estimated delivery time: 30-40 mins (2.4 km away)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Driver Info Card */}
          {order.driver && (
            <div
              style={{
                padding: '16px',
                borderRadius: '20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={order.driver.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'}
                  alt={order.driver.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--accent-saffron)',
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {order.driver.name}
                    </h3>
                    <span
                      style={{
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#D97706',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '6px',
                      }}
                    >
                      ★ {order.driver.rating}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {order.driver.vehicle}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 600, marginTop: '2px' }}>
                    🛡️ Vaccinated & Temperature Checked
                  </div>
                </div>
              </div>

              {/* Call and Share OTP */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <a
                  href={`tel:${order.driver.phone}`}
                  className="btn-saffron"
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={14} />
                  <span>Call Rider</span>
                </a>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Delivery OTP: <strong>4829</strong>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Simulation Switcher (For Demo & Testing) */}
          <div
            style={{
              padding: '14px',
              borderRadius: '16px',
              background: 'var(--bg-secondary)',
              border: '1px dashed var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                🎮 Demo Status Controller (Fast Preview)
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-saffron)' }}>
                Click stage to simulate
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
              {[
                { code: 'pending', label: 'Placed' },
                { code: 'accepted', label: 'Accepted' },
                { code: 'preparing', label: 'Kitchen' },
                { code: 'out_for_delivery', label: 'On Way' },
                { code: 'delivered', label: 'Delivered' },
              ].map((s) => (
                <button
                  key={s.code}
                  onClick={() => updateOrderStatus(order.id, s.code)}
                  style={{
                    padding: '6px 2px',
                    borderRadius: '6px',
                    border: `1px solid ${order.statusCode === s.code ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                    background: order.statusCode === s.code ? 'var(--accent-saffron)' : 'var(--bg-card)',
                    color: order.statusCode === s.code ? '#FFF' : 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Visual Stepper Timeline & Order Items Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Vertical Stepper */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '24px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Live Order Progress
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
              {stepDetails.map((step, idx) => {
                const isCompleted = currentStep >= idx;
                const isCurrent = currentStep === idx;
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      position: 'relative',
                    }}
                  >
                    {/* Circle Node */}
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isCompleted ? (isCurrent ? 'var(--accent-saffron)' : '#16A34A') : 'var(--bg-secondary)',
                        color: isCompleted ? '#FFF' : 'var(--text-muted)',
                        border: `2px solid ${isCompleted ? (isCurrent ? 'var(--accent-saffron)' : '#16A34A') : 'var(--border-color)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 2,
                        boxShadow: isCurrent ? '0 0 12px rgba(255, 122, 0, 0.4)' : 'none',
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    {/* Step Text */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: isCompleted ? 800 : 500,
                            color: isCompleted ? 'var(--text-primary)' : 'var(--text-muted)',
                          }}
                        >
                          {step.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: isCompleted ? 'var(--accent-saffron)' : 'var(--text-muted)', fontWeight: 600 }}>
                          {step.time}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary Pill */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '24px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Ordered Dishes ({order.items.length})
              </h3>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                ₹{order.pricing?.grandTotal}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {order.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.84rem',
                    padding: '8px 0',
                    borderBottom: i < order.items.length - 1 ? '1px solid var(--border-light)' : 'none',
                  }}
                >
                  <div>
                    <strong>{item.quantity}x</strong> {item.name}
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {item.portion} • {item.spiceLevel}
                    </div>
                  </div>
                  <span style={{ fontWeight: 700 }}>₹{item.itemTotal * item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Delivery to: <strong>{order.address?.flat}, {order.address?.area}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
