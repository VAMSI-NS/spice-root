import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  CreditCard,
  CheckCircle2,
  Plus,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Banknote,
  Sparkles,
  Heart,
  ChevronLeft,
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    deliveryFee,
    packagingFee,
    taxes,
    discountAmount,
    cartGrandTotal,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    addAddress,
    placeOrder,
    deliveryType,
  } = useApp();

  // Current Step: 1 = Address, 2 = Payment, 3 = Review
  const [step, setStep] = useState(1);

  // Add new address form state
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    tag: 'Home',
    name: 'Aarav Patel',
    phone: '+91 98450 12345',
    flat: '',
    street: '',
    area: '',
    city: 'Bengaluru',
    pincode: '',
    instructions: '',
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [cardData, setCardData] = useState({
    number: '4532 8912 4029 8841',
    name: 'AARAV PATEL',
    expiry: '08/28',
    cvv: '912',
  });

  // Tip
  const [tip, setTip] = useState(30);

  if (!isCheckoutOpen) return null;

  const currentGrandTotal = Number((cartGrandTotal + tip).toFixed(2));

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddr.flat || !newAddr.area || !newAddr.pincode) {
      alert('Please fill in Flat/House, Area, and Pincode.');
      return;
    }
    const newId = addAddress(newAddr);
    setSelectedAddressId(newId);
    setShowAddAddressForm(false);
  };

  const handlePlaceOrderSubmit = () => {
    placeOrder(
      {
        method: paymentMethod,
        upiId: paymentMethod === 'upi' ? upiId : null,
        cardNumber: paymentMethod === 'card' ? cardData.number : null,
      },
      tip
    );
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="modal-box"
        style={{ maxWidth: '640px' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
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
                <ChevronLeft size={18} />
              </button>
            )}
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {step === 1 ? 'Select Delivery Address' : step === 2 ? 'Select Payment Method' : 'Order Review & Confirmation'}
              </h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Step {step} of 3 • SpiceRoute Secure Checkout
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
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

        {/* Step Indicator Pills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'var(--bg-secondary)',
            padding: '8px 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            gap: '8px',
          }}
        >
          {[
            { num: 1, label: '1. Address' },
            { num: 2, label: '2. Payment' },
            { num: 3, label: '3. Place Order' },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: step === item.num ? 'var(--accent-saffron)' : step > item.num ? '#16A34A' : 'var(--text-muted)',
                padding: '4px',
                borderRadius: '6px',
                background: step === item.num ? 'var(--accent-saffron-light)' : 'transparent',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {!showAddAddressForm ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Saved Delivery Addresses
                    </span>
                    <button
                      onClick={() => setShowAddAddressForm(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-saffron)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Plus size={15} />
                      <span>Add New Address</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {addresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          style={{
                            padding: '14px',
                            borderRadius: '14px',
                            background: isSelected ? 'var(--accent-saffron-light)' : 'var(--bg-secondary)',
                            border: `1.5px solid ${isSelected ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '12px',
                            transition: 'all 0.2s',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: isSelected ? 'var(--accent-saffron)' : 'var(--bg-card)',
                                color: isSelected ? '#FFF' : 'var(--text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '2px',
                              }}
                            >
                              <MapPin size={16} />
                            </div>

                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                                  {addr.tag}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                  {addr.phone}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                {addr.flat}, {addr.street}, {addr.area}, {addr.city} - {addr.pincode}
                              </p>
                              {addr.instructions && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--accent-saffron)', marginTop: '4px' }}>
                                  📌 Instructions: {addr.instructions}
                                </div>
                              )}
                            </div>
                          </div>

                          <input
                            type="radio"
                            name="delivery_address"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(addr.id)}
                            style={{ marginTop: '4px' }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="btn-saffron"
                    style={{ width: '100%', padding: '14px', marginTop: '0.5rem', fontSize: '0.98rem' }}
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight size={18} />
                  </button>
                </>
              ) : (
                /* Add New Address Form */
                <form onSubmit={handleSaveNewAddress} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Add New Address</h3>
                    <button
                      type="button"
                      onClick={() => setShowAddAddressForm(false)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem' }}
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Tag Buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['Home', 'Work', 'Other'].map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setNewAddr({ ...newAddr, tag })}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '8px',
                          border: `1.5px solid ${newAddr.tag === tag ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                          background: newAddr.tag === tag ? 'var(--accent-saffron-light)' : 'var(--bg-secondary)',
                          color: newAddr.tag === tag ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="Receiver's Name"
                      value={newAddr.name}
                      onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                      required
                      style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Contact Phone"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      required
                      style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="House / Flat / Block No."
                    value={newAddr.flat}
                    onChange={(e) => setNewAddr({ ...newAddr, flat: e.target.value })}
                    required
                    style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />

                  <input
                    type="text"
                    placeholder="Street / Society / Landmark"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="Area / Locality (e.g. Indiranagar)"
                      value={newAddr.area}
                      onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })}
                      required
                      style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Pincode (e.g. 560038)"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      required
                      style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Delivery Instructions (e.g. Leave with guard)"
                    value={newAddr.instructions}
                    onChange={(e) => setNewAddr({ ...newAddr, instructions: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                  />

                  <button
                    type="submit"
                    className="btn-saffron"
                    style={{ padding: '12px', borderRadius: '10px', fontSize: '0.92rem', marginTop: '6px' }}
                  >
                    Save Address & Continue
                  </button>
                </form>
              )}
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Payment Methods Tabs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { id: 'upi', label: 'UPI (Instant)', icon: QrCode },
                  { id: 'card', label: 'Card (Credit/Debit)', icon: CreditCard },
                  { id: 'cod', label: 'Cash / COD', icon: Banknote },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: '12px',
                        border: `1.5px solid ${isSelected ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                        background: isSelected ? 'var(--accent-saffron-light)' : 'var(--bg-secondary)',
                        color: isSelected ? 'var(--accent-saffron)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Icon size={20} />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Enter UPI Virtual ID (GPay / PhonePe / Paytm)
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi"
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                    <button
                      type="button"
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: '#16A34A',
                        color: '#FFF',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Verified ✓
                    </button>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    A payment request will be sent to your UPI app for authorization.
                  </div>
                </div>
              )}

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {/* Visual Debit Card Preview */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                      color: '#FFF',
                      borderRadius: '16px',
                      padding: '16px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', letterSpacing: '0.1em', opacity: 0.8 }}>ROYAL SPICE CARD</span>
                      <CreditCard size={24} color="#F59E0B" />
                    </div>
                    <div style={{ fontSize: '1.2rem', letterSpacing: '0.15em', fontFamily: 'monospace' }}>
                      {cardData.number || '•••• •••• •••• ••••'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.75rem' }}>
                      <div>
                        <div style={{ opacity: 0.6, fontSize: '0.65rem' }}>CARDHOLDER</div>
                        <div style={{ fontWeight: 700 }}>{cardData.name || 'YOUR NAME'}</div>
                      </div>
                      <div>
                        <div style={{ opacity: 0.6, fontSize: '0.65rem' }}>EXPIRES</div>
                        <div style={{ fontWeight: 700 }}>{cardData.expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Card Number (16 digits)"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                        style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={3}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* COD Info */}
              {paymentMethod === 'cod' && (
                <div
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <Banknote size={24} color="#16A34A" />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Pay Cash on Delivery
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Please keep exact cash ready or scan delivery partner's QR code on arrival.
                    </div>
                  </div>
                </div>
              )}

              {/* Tip Delivery Partner Section */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: '14px',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    <Heart size={14} color="#EF4444" fill="#EF4444" />
                    <span>Tip Your Delivery Hero</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    100% goes to driver
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {[0, 20, 30, 50].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setTip(amount)}
                      style={{
                        flex: 1,
                        padding: '6px',
                        borderRadius: '8px',
                        border: `1.5px solid ${tip === amount ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                        background: tip === amount ? 'var(--accent-saffron-light)' : 'var(--bg-card)',
                        color: tip === amount ? 'var(--accent-saffron)' : 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      {amount === 0 ? 'No Tip' : `₹${amount}`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="btn-saffron"
                style={{ width: '100%', padding: '14px', fontSize: '0.98rem' }}
              >
                <span>Review Order Summary</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 3: REVIEW & CONFIRM */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Order Items Preview */}
              <div
                style={{
                  maxHeight: '160px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '10px',
                  borderRadius: '12px',
                  background: 'var(--bg-secondary)',
                }}
              >
                {cart.map((item) => (
                  <div key={item.cartKey} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span>{item.quantity}x {item.name} ({item.portion})</span>
                    <strong>₹{item.itemTotal * item.quantity}</strong>
                  </div>
                ))}
              </div>

              {/* Selected Delivery Address & Payment details pill */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--bg-secondary)', fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-muted)' }}>DELIVER TO</div>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {addresses.find((a) => a.id === selectedAddressId)?.tag || 'Home'}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {addresses.find((a) => a.id === selectedAddressId)?.area || 'Indiranagar'}
                  </div>
                </div>

                <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--bg-secondary)', fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-muted)' }}>PAYMENT</div>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {paymentMethod === 'upi' ? 'UPI Instant' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cash on Delivery'}
                  </div>
                  <div style={{ color: '#16A34A', fontWeight: 600 }}>100% Safe & Encrypted</div>
                </div>
              </div>

              {/* Bill Details */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '0.82rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery & Packaging</span>
                  <span>₹{deliveryFee + packagingFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes (5% GST)</span>
                  <span>₹{taxes}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 700 }}>
                    <span>Discount</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}
                {tip > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-saffron)' }}>
                    <span>Rider Tip</span>
                    <span>₹{tip}</span>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.08rem',
                    fontWeight: 800,
                    paddingTop: '6px',
                    borderTop: '1px solid var(--border-color)',
                  }}
                >
                  <span>Grand Total to Pay</span>
                  <span style={{ color: 'var(--accent-saffron)' }}>₹{currentGrandTotal}</span>
                </div>
              </div>

              {/* Big Place Order Button */}
              <button
                onClick={handlePlaceOrderSubmit}
                className="btn-saffron"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                }}
              >
                <Sparkles size={18} />
                <span>Place Order • ₹{currentGrandTotal}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
