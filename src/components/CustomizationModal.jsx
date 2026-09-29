import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Flame, Sparkles, Check, Info } from 'lucide-react';

export const CustomizationModal = () => {
  const { customizingItem, setCustomizingItem, addToCart } = useApp();

  if (!customizingItem) return null;

  const dish = customizingItem;

  // Portion State
  const defaultPortion = dish.portionOptions ? dish.portionOptions[0] : { name: 'Regular', priceDiff: 0 };
  const [selectedPortion, setSelectedPortion] = useState(defaultPortion);

  // Spice Level State
  const defaultSpice = dish.spiceLevels ? dish.spiceLevels[Math.min(1, dish.spiceLevels.length - 1)] : 'Medium';
  const [selectedSpice, setSelectedSpice] = useState(defaultSpice);

  // Selected Addons
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Special Instructions
  const [instructions, setInstructions] = useState('');

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Reset local state when opened with a new dish
  useEffect(() => {
    setSelectedPortion(dish.portionOptions ? dish.portionOptions[0] : { name: 'Regular', priceDiff: 0 });
    setSelectedSpice(dish.spiceLevels ? dish.spiceLevels[Math.min(1, dish.spiceLevels.length - 1)] : 'Medium');
    setSelectedAddOns([]);
    setInstructions('');
    setQuantity(1);
  }, [dish]);

  // Addon toggle
  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) {
        return prev.filter((a) => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Dynamic Price Calculation
  const basePrice = dish.price + (selectedPortion?.priceDiff || 0);
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const singleItemPrice = basePrice + addOnsTotal;
  const grandItemTotal = singleItemPrice * quantity;

  // Handle Add To Cart
  const handleAddToCart = () => {
    addToCart({
      id: dish.id,
      name: dish.name,
      image: dish.image,
      isVeg: dish.isVeg,
      portion: selectedPortion.name,
      spiceLevel: selectedSpice,
      addOns: selectedAddOns.map((a) => a.name),
      addOnsCost: addOnsTotal,
      instructions: instructions.trim(),
      quantity: quantity,
      price: singleItemPrice,
      itemTotal: singleItemPrice,
    });
    setCustomizingItem(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setCustomizingItem(null)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header Image with close button */}
        <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
          <img
            src={dish.image}
            alt={dish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%)',
            }}
          />

          <button
            onClick={() => setCustomizingItem(null)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.65)',
              border: 'none',
              color: '#FFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <X size={20} />
          </button>

          {/* Badge & Title on Image */}
          <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', color: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '3px',
                  borderRadius: '4px',
                  display: 'flex',
                }}
              >
                {dish.isVeg ? (
                  <div className="badge-veg"><div className="badge-veg-dot" /></div>
                ) : (
                  <div className="badge-nonveg"><div className="badge-nonveg-triangle" /></div>
                )}
              </div>
              {dish.bestseller && (
                <span
                  style={{
                    background: 'var(--accent-saffron)',
                    color: '#FFF',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                  }}
                >
                  Bestseller
                </span>
              )}
              {dish.prepTime && (
                <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>⏱️ {dish.prepTime}</span>
              )}
            </div>

            <h2 className="heading-serif" style={{ fontSize: '1.45rem', fontWeight: 800, lineHeight: 1.2 }}>
              {dish.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Description */}
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {dish.description}
          </p>

          {/* 1. Choose Portion */}
          {dish.portionOptions && dish.portionOptions.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Choose Portion
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-saffron)', fontWeight: 600 }}>
                  Required
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dish.portionOptions.map((portion) => {
                  const isSelected = selectedPortion.name === portion.name;
                  const itemPrice = dish.price + portion.priceDiff;

                  return (
                    <label
                      key={portion.name}
                      onClick={() => setSelectedPortion(portion)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: isSelected ? 'var(--accent-saffron-light)' : 'var(--bg-secondary)',
                        border: `1.5px solid ${isSelected ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="radio"
                          name="portion"
                          checked={isSelected}
                          onChange={() => setSelectedPortion(portion)}
                        />
                        <span style={{ fontSize: '0.92rem', fontWeight: isSelected ? 700 : 500, color: 'var(--text-primary)' }}>
                          {portion.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        ₹{itemPrice}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Spice Level Selector */}
          {dish.spiceLevels && dish.spiceLevels.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Spice Level
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Tailored to taste
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${dish.spiceLevels.length}, 1fr)`,
                  gap: '8px',
                }}
              >
                {dish.spiceLevels.map((lvl) => {
                  const isSelected = selectedSpice === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedSpice(lvl)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '10px',
                        background: isSelected ? 'var(--accent-saffron-light)' : 'var(--bg-secondary)',
                        border: `1.5px solid ${isSelected ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                        color: isSelected ? 'var(--accent-saffron)' : 'var(--text-secondary)',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Flame size={14} color={isSelected ? 'var(--accent-saffron)' : 'currentColor'} />
                      <span>{lvl}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Add-Ons */}
          {dish.addOns && dish.addOns.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Add-ons & Extras
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Optional
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dish.addOns.map((addon) => {
                  const isChecked = selectedAddOns.some((a) => a.name === addon.name);

                  return (
                    <label
                      key={addon.name}
                      onClick={() => toggleAddOn(addon)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: isChecked ? 'var(--accent-saffron-light)' : 'var(--bg-secondary)',
                        border: `1.5px solid ${isChecked ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddOn(addon)}
                        />
                        <span style={{ fontSize: '0.88rem', fontWeight: isChecked ? 600 : 500, color: 'var(--text-primary)' }}>
                          {addon.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-saffron)' }}>
                        +₹{addon.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Special Cooking Instructions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Special Instructions
            </span>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Less oil, extra lemon wedges, no raw onions..."
              rows={2}
              maxLength={150}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          {/* Bottom Bar: Quantity & Dynamic Total Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            {/* Quantity Selector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--bg-secondary)',
                padding: '6px 12px',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Minus size={14} />
              </button>

              <span style={{ fontSize: '1rem', fontWeight: 800, minWidth: '18px', textAlign: 'center' }}>
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'var(--accent-saffron)',
                  color: '#FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Dynamic Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="btn-saffron"
              style={{
                flex: 1,
                padding: '12px 20px',
                fontSize: '0.98rem',
                fontWeight: 700,
              }}
            >
              <span>Add to Cart</span>
              <span>•</span>
              <span>₹{grandItemTotal}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
