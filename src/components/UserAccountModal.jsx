import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  Clock,
  Heart,
  CreditCard,
  Tag,
  LogOut,
  X,
  Plus,
  Trash2,
  RotateCcw,
  Bike,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const UserAccountModal = ({ isOpen, onClose, initialTab = 'orders' }) => {
  const {
    user,
    setUser,
    addresses,
    addAddress,
    deleteAddress,
    orders,
    reorder,
    setTrackingOrderId,
    setActiveTab,
    favorites,
    menuItems,
    quickAddToCart,
  } = useApp();

  const [tab, setTab] = useState(initialTab);

  if (!isOpen) return null;

  const handleTrack = (orderId) => {
    setTrackingOrderId(orderId);
    onClose();
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReorder = (pastOrder) => {
    reorder(pastOrder);
    onClose();
  };

  const favoriteDishes = menuItems.filter((i) => favorites.includes(i.id));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: '780px', width: '100%', minHeight: '520px', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-card)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-saffron) 0%, var(--accent-saffron-dark) 100%)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
              }}
            >
              AP
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {user.name}
              </h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {user.phone} • {user.email}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-secondary)',
              border: 'none',
              color: 'var(--text-primary)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 1rem',
          }}
        >
          {[
            { id: 'orders', label: 'Order History', icon: Clock, count: orders.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
            { id: 'favorites', label: 'Favorite Dishes', icon: Heart, count: favorites.length },
            { id: 'profile', label: 'Profile Settings', icon: User },
          ].map((item) => {
            const isActive = tab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: 'none',
                  border: 'none',
                  borderBottom: `2.5px solid ${isActive ? 'var(--accent-saffron)' : 'transparent'}`,
                  color: isActive ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '1px 6px',
                      borderRadius: '9999px',
                      background: isActive ? 'var(--accent-saffron)' : 'var(--bg-card)',
                      color: isActive ? '#FFF' : 'var(--text-muted)',
                      fontWeight: 700,
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          {/* 1. ORDER HISTORY */}
          {tab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No past orders found.
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            Order #{ord.id}
                          </span>
                          <span
                            style={{
                              background: ord.statusCode === 'delivered' ? 'rgba(22, 163, 74, 0.15)' : 'var(--accent-saffron-light)',
                              color: ord.statusCode === 'delivered' ? '#16A34A' : 'var(--accent-saffron)',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '9999px',
                            }}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {ord.date} • {ord.paymentMethod}
                        </div>
                      </div>

                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        ₹{ord.pricing?.grandTotal}
                      </div>
                    </div>

                    {/* Items */}
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {ord.items.map((it, idx) => (
                        <span key={idx}>
                          {it.quantity}x {it.name} ({it.portion})
                          {idx < ord.items.length - 1 ? ' • ' : ''}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '10px',
                        paddingTop: '8px',
                        borderTop: '1px dashed var(--border-color)',
                      }}
                    >
                      <button
                        onClick={() => handleTrack(ord.id)}
                        className="btn-outline"
                        style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                      >
                        <Bike size={14} />
                        <span>Track Status</span>
                      </button>

                      <button
                        onClick={() => handleReorder(ord)}
                        className="btn-saffron"
                        style={{ padding: '6px 16px', fontSize: '0.78rem' }}
                      >
                        <RotateCcw size={14} />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 2. SAVED ADDRESSES */}
          {tab === 'addresses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-saffron-light)', color: 'var(--accent-saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>{addr.tag}</span>
                        {addr.isDefault && (
                          <span style={{ fontSize: '0.68rem', background: '#16A34A', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {addr.flat}, {addr.street}, {addr.area}, {addr.city} - {addr.pincode}
                      </p>
                      {addr.instructions && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-saffron)', marginTop: '4px' }}>
                          Instructions: {addr.instructions}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteAddress(addr.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                    title="Delete address"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 3. FAVORITE DISHES */}
          {tab === 'favorites' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {favoriteDishes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No favorite dishes yet. Click ❤️ on any dish to save it here!
                </div>
              ) : (
                favoriteDishes.map((dish) => (
                  <div
                    key={dish.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '14px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={dish.image}
                        alt={dish.name}
                        style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {dish.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent-saffron)', fontWeight: 700, marginTop: '2px' }}>
                          ₹{dish.price}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        quickAddToCart(dish, e);
                      }}
                      className="btn-saffron"
                      style={{ padding: '8px 14px', fontSize: '0.78rem' }}
                    >
                      <ShoppingBag size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 4. PROFILE SETTINGS */}
          {tab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'var(--accent-saffron-light)', border: '1px solid rgba(255, 122, 0, 0.3)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                  👑 SpiceRoute Royal Club Member
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  You have <strong>340 spice reward points</strong> available. 1 point = ₹1 discount on checkout.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
