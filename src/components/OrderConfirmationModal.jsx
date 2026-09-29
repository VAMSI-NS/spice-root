import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Sparkles,
  Clock,
  MapPin,
  Bike,
  ArrowRight,
  X,
  Share2,
} from 'lucide-react';

export const OrderConfirmationModal = () => {
  const {
    confirmedOrder,
    setConfirmedOrder,
    setActiveTab,
    setTrackingOrderId,
  } = useApp();

  if (!confirmedOrder) return null;

  const order = confirmedOrder;

  const handleTrackOrder = () => {
    setTrackingOrderId(order.id);
    setConfirmedOrder(null);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="modal-overlay" onClick={() => setConfirmedOrder(null)}>
      <div
        className="modal-box"
        style={{ maxWidth: '520px', textAlign: 'center', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #16A34A 0%, #059669 100%)',
            color: '#FFF',
            padding: '2.5rem 1.5rem 2rem 1.5rem',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setConfirmedOrder(null)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0, 0, 0, 0.2)',
              border: 'none',
              color: '#FFF',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#FFF',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}
          >
            <CheckCircle2 size={44} />
          </div>

          <h2 className="heading-serif" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px' }}>
            🎉 ORDER CONFIRMED!
          </h2>
          <div style={{ fontSize: '0.92rem', opacity: 0.95 }}>
            Order ID: <strong>#{order.id}</strong>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Estimated Time Card */}
          <div
            style={{
              padding: '14px',
              borderRadius: '14px',
              background: 'var(--accent-saffron-light)',
              border: '1px solid rgba(255, 122, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={22} color="var(--accent-saffron)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  ESTIMATED ARRIVAL
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                  30–40 Minutes
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#16A34A',
                background: 'rgba(22, 163, 74, 0.15)',
                padding: '4px 10px',
                borderRadius: '9999px',
              }}
            >
              Hot & Fresh
            </span>
          </div>

          {/* Quick Details */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'var(--bg-secondary)',
              textAlign: 'left',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Items Ordered:</span>
              <strong>{order.items.reduce((sum, i) => sum + i.quantity, 0)} Items</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Paid:</span>
              <strong style={{ color: 'var(--accent-saffron)', fontSize: '0.95rem' }}>₹{order.pricing.grandTotal}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Payment:</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Deliver to:</span>
              <span>{order.address?.flat}, {order.address?.area}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={handleTrackOrder}
              className="btn-saffron"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              <Bike size={18} />
              <span>Track Live Delivery Status</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setConfirmedOrder(null)}
              className="btn-outline"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '0.88rem',
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
