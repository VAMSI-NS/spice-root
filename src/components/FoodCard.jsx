import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Plus, Heart, Sliders, Flame, Sparkles, Clock } from 'lucide-react';

export const FoodCard = ({ dish }) => {
  const {
    favorites,
    toggleFavorite,
    quickAddToCart,
    setCustomizingItem,
    cart,
  } = useApp();

  const isFavorite = favorites.includes(dish.id);

  // Check if item is already in cart
  const cartItem = cart.find((i) => i.id === dish.id);
  const totalInCart = cart
    .filter((i) => i.id === dish.id)
    .reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div
      className="food-card"
      style={{
        opacity: dish.inStock ? 1 : 0.65,
        position: 'relative',
      }}
    >
      {/* Top Image Container */}
      <div
        className="food-card-img-container"
        onClick={() => dish.inStock && setCustomizingItem(dish)}
        style={{ cursor: dish.inStock ? 'pointer' : 'default' }}
      >
        <img
          src={dish.image}
          alt={dish.name}
          className="food-card-img"
          loading="lazy"
        />

        {/* Veg / Non-Veg Indicator */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '4px',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {dish.isVeg ? (
            <div className="badge-veg">
              <div className="badge-veg-dot" />
            </div>
          ) : (
            <div className="badge-nonveg">
              <div className="badge-nonveg-triangle" />
            </div>
          )}
        </div>

        {/* Bestseller Badge */}
        {dish.bestseller && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '42px',
              zIndex: 2,
              background: 'linear-gradient(135deg, #FF7A00 0%, #D9531E 100%)',
              color: '#FFF',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '3px 9px',
              borderRadius: '9999px',
              boxShadow: '0 2px 8px rgba(255, 122, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={11} />
            <span>Bestseller</span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => toggleFavorite(dish.id, e)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 2,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            color: isFavorite ? '#EF4444' : '#64748B',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={16} fill={isFavorite ? '#EF4444' : 'none'} />
        </button>

        {/* Prep time pill */}
        {dish.prepTime && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '12px',
              zIndex: 2,
              background: 'rgba(0, 0, 0, 0.75)',
              color: '#FFF',
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Clock size={12} />
            <span>{dish.prepTime}</span>
          </div>
        )}

        {!dish.inStock && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.04em',
            }}
          >
            SOLD OUT TODAY
          </div>
        )}
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          {/* Rating and Spice row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#D97706',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              <Star size={13} fill="#D97706" />
              <span>{dish.rating}</span>
              <span style={{ opacity: 0.65, fontSize: '0.7rem' }}>
                ({dish.reviewsCount || 100}+)
              </span>
            </div>

            {dish.isSpicy && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#DC2626',
                  background: 'rgba(220, 38, 38, 0.1)',
                  padding: '2px 6px',
                  borderRadius: '6px',
                }}
              >
                <Flame size={12} />
                <span>Spicy</span>
              </span>
            )}
          </div>

          {/* Dish Name */}
          <h3
            onClick={() => dish.inStock && setCustomizingItem(dish)}
            style={{
              fontSize: '1.12rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              marginBottom: '6px',
              cursor: dish.inStock ? 'pointer' : 'default',
              transition: 'color 0.2s',
            }}
          >
            {dish.name}
          </h3>

          {/* Short Description */}
          <p
            style={{
              fontSize: '0.84rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {dish.description}
          </p>
        </div>

        {/* Pricing and Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Price
            </div>
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
              }}
            >
              ₹{dish.price}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Customize button */}
            <button
              onClick={() => setCustomizingItem(dish)}
              disabled={!dish.inStock}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '8px 12px',
                borderRadius: '10px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: dish.inStock ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s',
              }}
            >
              <Sliders size={13} />
              <span>Customize</span>
            </button>

            {/* Quick Add Button */}
            <button
              onClick={(e) => quickAddToCart(dish, e)}
              disabled={!dish.inStock}
              className="btn-saffron"
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: dish.inStock ? 'pointer' : 'not-allowed',
              }}
            >
              <Plus size={15} />
              <span>{totalInCart > 0 ? `Add (${totalInCart})` : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
