import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  Sparkles,
  Bike,
  Store,
  ChevronRight,
  Info,
  Check,
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    packagingFee,
    taxes,
    discountAmount,
    cartGrandTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    availableCoupons,
    deliveryType,
    setDeliveryType,
    setIsCheckoutOpen,
    selectedAddress,
    setActiveTab,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [showCouponsList, setShowCouponsList] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const ok = applyCouponCode(couponInput);
    if (ok) setCouponInput('');
  };

  const handleQuickApply = (code) => {
    applyCouponCode(code);
    setShowCouponsList(false);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--accent-saffron-light)',
                color: 'var(--accent-saffron)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Your Feast Cart
              </h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {cart.length} {cart.length === 1 ? 'dish' : 'dishes'} selected
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                title="Clear entire cart"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                }}
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'var(--bg-secondary)',
                border: 'none',
                color: 'var(--text-primary)',
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
          </div>
        </div>

        {/* Delivery / Takeaway Switch */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <button
            onClick={() => setDeliveryType('delivery')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '9999px',
              border: 'none',
              background: deliveryType === 'delivery' ? 'var(--accent-saffron)' : 'transparent',
              color: deliveryType === 'delivery' ? '#FFF' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            <Bike size={15} />
            <span>Delivery (30-40m)</span>
          </button>

          <button
            onClick={() => setDeliveryType('takeaway')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '9999px',
              border: 'none',
              background: deliveryType === 'takeaway' ? 'var(--accent-saffron)' : 'transparent',
              color: deliveryType === 'takeaway' ? '#FFF' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            <Store size={15} />
            <span>Takeaway (Self Pick)</span>
          </button>
        </div>

        {/* Drawer Body / Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {cart.length === 0 ? (
            /* Empty State */
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem 1rem',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--accent-saffron-light)',
                  color: 'var(--accent-saffron)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={38} />
              </div>
              <div>
                <h3 className="heading-serif" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  Your cart is empty!
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Explore our authentic Dum Biryanis, hot Tandoori naans, and rich curries.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveTab('menu');
                }}
                className="btn-saffron"
                style={{ padding: '10px 20px', fontSize: '0.88rem' }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Item Rows */}
              {cart.map((item) => (
                <div
                  key={item.cartKey}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '14px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
                      {/* Veg indicator badge */}
                      <div style={{ marginTop: '3px' }}>
                        {item.isVeg ? (
                          <div className="badge-veg"><div className="badge-veg-dot" /></div>
                        ) : (
                          <div className="badge-nonveg"><div className="badge-nonveg-triangle" /></div>
                        )}
                      </div>

                      <div>
                        <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                          {item.name}
                        </div>

                        {/* Customization specs */}
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px',
                            marginTop: '4px',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <span style={{ background: 'var(--bg-card)', padding: '1px 6px', borderRadius: '4px' }}>
                            {item.portion}
                          </span>
                          <span style={{ background: 'var(--bg-card)', padding: '1px 6px', borderRadius: '4px' }}>
                            🌶️ {item.spiceLevel}
                          </span>
                        </div>

                        {/* Add-ons if any */}
                        {item.addOns && item.addOns.length > 0 && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--accent-saffron)', marginTop: '3px' }}>
                            + {item.addOns.join(', ')}
                          </div>
                        )}

                        {/* Note if any */}
                        {item.instructions && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>
                            “{item.instructions}”
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        ₹{item.itemTotal * item.quantity}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        ₹{item.itemTotal} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '6px',
                      borderTop: '1px dashed var(--border-color)',
                    }}
                  >
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'var(--bg-card)',
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <button
                        onClick={() => updateCartQuantity(item.cartKey, -1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Minus size={12} />
                      </button>

                      <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '14px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateCartQuantity(item.cartKey, 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent-saffron)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Section */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: '14px',
                  background: 'var(--bg-secondary)',
                  border: '1px dashed var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {appliedCoupon ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(22, 163, 74, 0.12)',
                      border: '1px solid rgba(22, 163, 74, 0.3)',
                      padding: '8px 12px',
                      borderRadius: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} color="#16A34A" />
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#16A34A' }}>
                          {appliedCoupon.code} APPLIED!
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          Saving ₹{discountAmount} on this feast
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#DC2626',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <Tag size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          type="text"
                          placeholder="Enter Promo Code"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          style={{
                            width: '100%',
                            padding: '8px 8px 8px 32px',
                            borderRadius: '8px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontSize: '0.82rem',
                            textTransform: 'uppercase',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn-saffron"
                        style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem' }}
                      >
                        Apply
                      </button>
                    </form>

                    <button
                      type="button"
                      onClick={() => setShowCouponsList(!showCouponsList)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-saffron)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>View available offers & coupons</span>
                      <ChevronRight size={14} />
                    </button>

                    {showCouponsList && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
                        {availableCoupons.map((coupon) => (
                          <div
                            key={coupon.code}
                            onClick={() => handleQuickApply(coupon.code)}
                            style={{
                              padding: '8px 10px',
                              borderRadius: '8px',
                              background: 'var(--bg-card)',
                              border: '1px solid var(--border-color)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                            }}
                          >
                            <div>
                              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-saffron)' }}>
                                {coupon.code} ({coupon.discount})
                              </div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                Min. order ₹{coupon.minOrder}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-saffron)' }}>
                              Apply
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Bill Details Breakdown */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  Bill Summary
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>Item Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>Delivery Fee {cartSubtotal >= 499 && deliveryType === 'delivery' && <strong style={{ color: '#16A34A' }}>(Free above ₹499)</strong>}</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: '#16A34A' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>Eco-Packaging & Hygiene</span>
                  <span>₹{packagingFee}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>GST & Restaurant Taxes (5%)</span>
                  <span>₹{taxes}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#16A34A', fontWeight: 700 }}>
                    <span>Coupon Discount</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-color)',
                  }}
                >
                  <span>Grand Total</span>
                  <span>₹{cartGrandTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* Delivery address preview */}
            {deliveryType === 'delivery' && selectedAddress && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <div>
                  Deliver to: <strong>{selectedAddress.tag}</strong> ({selectedAddress.area})
                </div>
              </div>
            )}

            <button
              onClick={handleProceedToCheckout}
              className="btn-saffron"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
