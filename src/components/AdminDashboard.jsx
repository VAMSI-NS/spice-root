import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Clock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  BarChart3,
  Layers,
  Utensils,
  ArrowUpRight,
  Eye,
  RefreshCw,
  X,
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    orders,
    updateOrderStatus,
    menuItems,
    addMenuItem,
    updateMenuItem,
    toggleItemStock,
    toggleItemBestseller,
    deleteMenuItem,
    resetMenuToDefault,
  } = useApp();

  const [adminTab, setAdminTab] = useState('orders'); // 'orders' | 'menu' | 'analytics'
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  // New Dish Form State
  const [dishForm, setDishForm] = useState({
    name: '',
    category: 'biryani',
    price: 249,
    isVeg: false,
    description: '',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    prepTime: '20-25 mins',
    calories: '550 kcal',
    bestseller: false,
    isSpicy: true,
  });

  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.pricing?.grandTotal || 0), 0);
  const activeOrders = orders.filter((o) => o.statusCode !== 'delivered' && o.statusCode !== 'cancelled').length;
  const completedOrders = orders.filter((o) => o.statusCode === 'delivered').length;
  const cancelledOrders = orders.filter((o) => o.statusCode === 'cancelled').length;

  const handleSaveDish = (e) => {
    e.preventDefault();
    if (!dishForm.name || !dishForm.price) return;

    if (editingDish) {
      updateMenuItem(editingDish.id, dishForm);
      setEditingDish(null);
    } else {
      addMenuItem(dishForm);
    }

    setDishForm({
      name: '',
      category: 'biryani',
      price: 249,
      isVeg: false,
      description: '',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
      prepTime: '20-25 mins',
      calories: '550 kcal',
      bestseller: false,
      isSpicy: true,
    });
    setShowAddDishModal(false);
  };

  const handleOpenEdit = (dish) => {
    setEditingDish(dish);
    setDishForm({ ...dish });
    setShowAddDishModal(true);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.25rem 4rem 1.25rem' }}>
      {/* Admin Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: '#9333EA',
                color: '#FFF',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
              }}
            >
              ADMIN PORTAL
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              SpiceRoute Kitchen Manager v2.4
            </span>
          </div>
          <h1 className="heading-serif" style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '4px' }}>
            Restaurant Command Center
          </h1>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '12px' }}>
          {[
            { id: 'orders', label: 'Live Orders', icon: ShoppingBag, count: activeOrders },
            { id: 'menu', label: 'Menu Items', icon: Utensils, count: menuItems.length },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ].map((item) => {
            const isActive = adminTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isActive ? '#9333EA' : 'transparent',
                  color: isActive ? '#FFF' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
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
                      background: isActive ? 'rgba(255,255,255,0.3)' : 'var(--bg-card)',
                      color: isActive ? '#FFF' : 'var(--text-muted)',
                      fontWeight: 800,
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Stats Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
            <span>TODAY'S REVENUE</span>
            <DollarSign size={18} color="#16A34A" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
            ₹{Math.round(totalRevenue)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16A34A', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
            <ArrowUpRight size={14} />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
            <span>ACTIVE ORDERS</span>
            <Clock size={18} color="#FF7A00" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-saffron)', marginTop: '6px' }}>
            {activeOrders}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            In preparation & transit
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
            <span>COMPLETED DELIVERIES</span>
            <CheckCircle2 size={18} color="#16A34A" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16A34A', marginTop: '6px' }}>
            {completedOrders}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Delivered hot & on-time
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
            <span>AVG ORDER VALUE</span>
            <TrendingUp size={18} color="#9333EA" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#9333EA', marginTop: '6px' }}>
            ₹{orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Across {orders.length} total orders
          </div>
        </div>
      </div>

      {/* TAB 1: LIVE ORDERS MANAGEMENT */}
      {adminTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Order Tickets ({orders.length})</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Real-time synchronization active ⚡
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>#{ord.id}</span>
                      <span
                        style={{
                          background: ord.statusCode === 'delivered' ? 'rgba(22, 163, 74, 0.15)' : 'var(--accent-saffron-light)',
                          color: ord.statusCode === 'delivered' ? '#16A34A' : 'var(--accent-saffron)',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '9999px',
                        }}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Customer: <strong>{ord.address?.name || 'Aarav Patel'}</strong> ({ord.address?.phone}) • {ord.date}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{ord.pricing?.grandTotal}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {ord.paymentMethod}
                    </div>
                  </div>
                </div>

                {/* Items preview */}
                <div style={{ padding: '8px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', fontSize: '0.82rem' }}>
                  {ord.items.map((i, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                      <span><strong>{i.quantity}x</strong> {i.name} ({i.portion}) {i.instructions && <em>“{i.instructions}”</em>}</span>
                      <span>₹{i.itemTotal * i.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Admin Status Changer Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Update Status:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {[
                      { code: 'pending', label: 'Pending' },
                      { code: 'accepted', label: 'Accept' },
                      { code: 'preparing', label: 'Preparing' },
                      { code: 'out_for_delivery', label: 'Out for Delivery' },
                      { code: 'delivered', label: 'Delivered' },
                      { code: 'cancelled', label: 'Cancel' },
                    ].map((st) => (
                      <button
                        key={st.code}
                        onClick={() => updateOrderStatus(ord.id, st.code)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: `1px solid ${ord.statusCode === st.code ? '#9333EA' : 'var(--border-color)'}`,
                          background: ord.statusCode === st.code ? '#9333EA' : 'var(--bg-secondary)',
                          color: ord.statusCode === st.code ? '#FFF' : 'var(--text-secondary)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MENU ITEMS MANAGEMENT */}
      {adminTab === 'menu' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Restaurant Menu Catalog</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Toggle stock availability, change prices, or add new chef specials
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={resetMenuToDefault}
                className="btn-outline"
                style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                title="Reset menu to default items"
              >
                <RefreshCw size={14} />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={() => {
                  setEditingDish(null);
                  setShowAddDishModal(true);
                }}
                className="btn-saffron"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <Plus size={16} />
                <span>Add New Dish</span>
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {menuItems.map((dish) => (
              <div
                key={dish.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  opacity: dish.inStock ? 1 : 0.65,
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {dish.isVeg ? (
                        <div className="badge-veg"><div className="badge-veg-dot" /></div>
                      ) : (
                        <div className="badge-nonveg"><div className="badge-nonveg-triangle" /></div>
                      )}
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {dish.name}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--accent-saffron)', marginTop: '2px' }}>
                      ₹{dish.price}
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Category: {dish.category} • ⭐ {dish.rating}
                    </div>
                  </div>
                </div>

                {/* Toggles and controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => toggleItemStock(dish.id)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: `1px solid ${dish.inStock ? '#16A34A' : '#DC2626'}`,
                        background: dish.inStock ? 'rgba(22, 163, 74, 0.15)' : 'rgba(220, 38, 38, 0.15)',
                        color: dish.inStock ? '#16A34A' : '#DC2626',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {dish.inStock ? 'In Stock 🟢' : 'Sold Out 🔴'}
                    </button>

                    <button
                      onClick={() => toggleItemBestseller(dish.id)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: `1px solid ${dish.bestseller ? '#FF7A00' : 'var(--border-color)'}`,
                        background: dish.bestseller ? 'var(--accent-saffron-light)' : 'transparent',
                        color: dish.bestseller ? 'var(--accent-saffron)' : 'var(--text-muted)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {dish.bestseller ? '⭐ Bestseller' : 'Standard'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => handleOpenEdit(dish)}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: 'none',
                        color: 'var(--text-primary)',
                        padding: '6px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                      title="Edit dish"
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      onClick={() => deleteMenuItem(dish.id)}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: 'none',
                        color: '#EF4444',
                        padding: '6px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                      title="Delete dish"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ANALYTICS */}
      {adminTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Top Selling Dishes */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                Top Selling Dishes (Weekly)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Royal Chicken Dum Biryani', count: 384, share: '32%' },
                  { name: 'Old Delhi Butter Chicken', count: 320, share: '26%' },
                  { name: 'Paneer Butter Masala', count: 245, share: '20%' },
                  { name: 'Mysore Masala Dosa', count: 210, share: '14%' },
                  { name: 'Alphonso Mango Lassi', count: 180, share: '8%' },
                ].map((item) => (
                  <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <strong>{item.name}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>{item.count} orders ({item.share})</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: item.share, height: '100%', background: 'linear-gradient(90deg, #FF7A00, #E65100)', borderRadius: '9999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Share */}
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                Revenue by Cuisine Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Dum Biryanis', amount: '₹1,42,800', share: '45%' },
                  { name: 'North Indian Curries & Breads', amount: '₹95,200', share: '30%' },
                  { name: 'Starters & Kebabs', amount: '₹47,600', share: '15%' },
                  { name: 'South Indian Tiffin & Beverages', amount: '₹31,700', share: '10%' },
                ].map((cat) => (
                  <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <strong>{cat.name}</strong>
                      <span style={{ color: 'var(--accent-saffron)', fontWeight: 700 }}>{cat.amount}</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--bg-secondary)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: cat.share, height: '100%', background: '#9333EA', borderRadius: '9999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Dish Modal */}
      {showAddDishModal && (
        <div className="modal-overlay" onClick={() => setShowAddDishModal(false)}>
          <div className="modal-box" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                {editingDish ? 'Edit Dish Details' : 'Add New Culinary Dish'}
              </h3>
              <button
                onClick={() => setShowAddDishModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDish} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Dish Name</label>
                <input
                  type="text"
                  value={dishForm.name}
                  onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                  placeholder="e.g. Kashmiri Dum Aloo"
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Category</label>
                  <select
                    value={dishForm.category}
                    onChange={(e) => setDishForm({ ...dishForm, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <option value="biryani">Dum Biryani</option>
                    <option value="starters">Starters</option>
                    <option value="south-indian">South Indian</option>
                    <option value="north-indian">North Indian</option>
                    <option value="breads">Tandoori Breads</option>
                    <option value="desserts">Desserts</option>
                    <option value="beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Price (₹)</label>
                  <input
                    type="number"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({ ...dishForm, price: Number(e.target.value) })}
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={dishForm.isVeg}
                    onChange={(e) => setDishForm({ ...dishForm, isVeg: e.target.checked })}
                  />
                  <span>Vegetarian 🟢</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={dishForm.bestseller}
                    onChange={(e) => setDishForm({ ...dishForm, bestseller: e.target.checked })}
                  />
                  <span>Mark Bestseller ⭐</span>
                </label>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea
                  value={dishForm.description}
                  onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                  rows={2}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Image URL</label>
                <input
                  type="url"
                  value={dishForm.image}
                  onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.82rem' }}
                />
              </div>

              <button
                type="submit"
                className="btn-saffron"
                style={{ padding: '12px', borderRadius: '10px', fontWeight: 800, marginTop: '6px' }}
              >
                {editingDish ? 'Update Dish' : 'Save Dish to Menu'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
