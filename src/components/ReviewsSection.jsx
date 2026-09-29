import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, MessageSquare, Plus, CheckCircle2, ThumbsUp, Sparkles, X } from 'lucide-react';

export const ReviewsSection = () => {
  const { reviews, addReview } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [dishName, setDishName] = useState('Royal Chicken Dum Biryani');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addReview({ rating, dishName, comment: comment.trim() });
    setComment('');
    setShowModal(false);
  };

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
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#D97706',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
          }}
        >
          <Star size={16} fill="#D97706" />
          <span>VERIFIED GUEST EXPERIENCES</span>
        </div>

        <h1 className="heading-serif" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Loved by Thousands of Foodies
        </h1>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0.5rem auto 0 auto', fontSize: '1rem' }}>
          Hear what our royal patrons have to say about our flavors, authentic recipes, and speedy hot delivery.
        </p>
      </div>

      {/* Rating Scorecard Overview */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          borderRadius: '24px',
          marginBottom: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-saffron)', lineHeight: 1 }}>
            4.8
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '8px 0', color: '#F59E0B' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#F59E0B" />
            ))}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Based on 12,450+ verified ratings
          </div>
        </div>

        {/* Rating Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { star: '5 ★', percent: '88%' },
            { star: '4 ★', percent: '9%' },
            { star: '3 ★', percent: '2%' },
            { star: '2 ★', percent: '0.6%' },
            { star: '1 ★', percent: '0.4%' },
          ].map((bar) => (
            <div key={bar.star} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem' }}>
              <span style={{ width: '28px', fontWeight: 700 }}>{bar.star}</span>
              <div style={{ flex: 1, height: '8px', borderRadius: '9999px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ width: bar.percent, height: '100%', background: 'var(--accent-saffron)', borderRadius: '9999px' }} />
              </div>
              <span style={{ width: '35px', color: 'var(--text-muted)', textAlign: 'right' }}>{bar.percent}</span>
            </div>
          ))}
        </div>

        {/* Write Review CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>
            Enjoyed your meal recently?
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-saffron"
            style={{ padding: '12px 24px', fontSize: '0.92rem' }}
          >
            <Plus size={16} />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass-card"
            style={{
              padding: '1.5rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div>
              {/* User row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {rev.author}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {rev.date}
                    </div>
                  </div>
                </div>

                {rev.verified && (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.72rem',
                      color: '#16A34A',
                      background: 'rgba(22, 163, 74, 0.1)',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      fontWeight: 700,
                    }}
                  >
                    <CheckCircle2 size={13} />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '2px', color: '#F59E0B', marginBottom: '8px' }}>
                {[...Array(Math.max(1, Math.min(5, Math.round(Number(rev.rating) || 5))))].map((_, i) => (
                  <Star key={i} size={15} fill="#F59E0B" />
                ))}
              </div>

              {/* Dish tag */}
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-saffron)',
                  background: 'var(--accent-saffron-light)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  marginBottom: '10px',
                }}
              >
                🍛 {rev.dishName}
              </div>

              {/* Comment */}
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                “{rev.comment}”
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Share Your Experience</h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Rating stars selector */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Your Overall Rating
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: num <= rating ? '#F59E0B' : 'var(--text-muted)',
                      }}
                    >
                      <Star size={30} fill={num <= rating ? '#F59E0B' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Dish Ordered
                </label>
                <input
                  type="text"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="e.g. Royal Chicken Dum Biryani"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Your Review & Feedback
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="How was the aroma, spice level, packaging, and delivery speed?"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-saffron"
                style={{ padding: '12px', fontSize: '0.95rem', fontWeight: 700 }}
              >
                Publish Verified Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
