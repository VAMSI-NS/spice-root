import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MENU_ITEMS, INITIAL_COUPONS, INITIAL_REVIEWS } from '../data/menuData';
import { RESTAURANT_INFO, INITIAL_USER, INITIAL_ADDRESSES, INITIAL_ORDERS } from '../data/initialData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('srk_theme') || 'dark');

  // Menu items (admin can edit/add/toggle inStock)
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('srk_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  // Active navigation tab ('home', 'menu', 'offers', 'about', 'track', 'account', 'admin')
  const [activeTab, setActiveTab] = useState('home');

  // Selected Category filter in menu
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Search & Filter criteria
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilterOnly, setVegFilterOnly] = useState(false);
  const [nonVegFilterOnly, setNonVegFilterOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [priceSort, setPriceSort] = useState('none'); // 'none' | 'low-high' | 'high-low' | 'rating'

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('srk_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'takeaway'

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('srk_coupon');
    return saved ? JSON.parse(saved) : null;
  });
  const [availableCoupons] = useState(INITIAL_COUPONS);

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('srk_favorites');
    return saved ? JSON.parse(saved) : ['bir-1', 'sth-1', 'nth-1'];
  });

  // User & Addresses
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('srk_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('srk_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const saved = localStorage.getItem('srk_selected_address');
    return saved || 'addr-1';
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('srk_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Currently Tracked Order ID
  const [trackingOrderId, setTrackingOrderId] = useState(() => {
    return orders.length > 0 ? orders[0].id : null;
  });

  // Reviews
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('srk_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState(null);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Last Placed Order (for confirmation popup)
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Toasts notification system
  const [toasts, setToasts] = useState([]);

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('srk_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('srk_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('srk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('srk_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('srk_coupon');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('srk_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('srk_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('srk_selected_address', selectedAddressId);
  }, [selectedAddressId]);

  useEffect(() => {
    localStorage.setItem('srk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('srk_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Toast helper
  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toggle Favorite
  const toggleFavorite = (itemId, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const isFav = prev.includes(itemId);
      const updated = isFav ? prev.filter(id => id !== itemId) : [...prev, itemId];
      addToast(isFav ? 'Removed from favorites' : 'Saved to favorites ❤️', 'info');
      return updated;
    });
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.itemTotal * item.quantity), 0);
  const packagingFee = cart.length > 0 ? 20 : 0;
  
  let deliveryFee = deliveryType === 'takeaway' || cart.length === 0 ? 0 : 30;
  let discountAmount = 0;

  if (appliedCoupon && cartSubtotal > 0) {
    if (appliedCoupon.type === 'flat') {
      discountAmount = Math.min(appliedCoupon.value, cartSubtotal);
    } else if (appliedCoupon.type === 'percent') {
      const calculated = (cartSubtotal * appliedCoupon.value) / 100;
      discountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else if (appliedCoupon.type === 'delivery') {
      deliveryFee = 0;
      discountAmount = 30;
    }
  }

  // Waive delivery fee if subtotal >= 499
  if (cartSubtotal >= 499 && deliveryType === 'delivery' && deliveryFee > 0 && !appliedCoupon?.type === 'delivery') {
    deliveryFee = 0;
  }

  const taxes = cartSubtotal > 0 ? Number(((cartSubtotal - (appliedCoupon?.type === 'flat' ? discountAmount : 0)) * 0.05).toFixed(2)) : 0;
  const cartGrandTotal = Math.max(0, Number((cartSubtotal + deliveryFee + packagingFee + taxes - discountAmount).toFixed(2)));
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Add customized item to cart
  const addToCart = (customizedDish) => {
    // Generate unique key based on item id + portion + spice + sorted addOns + instructions
    const key = `${customizedDish.id}_${customizedDish.portion}_${customizedDish.spiceLevel}_${(customizedDish.addOns || []).sort().join('-')}_${customizedDish.instructions || ''}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartKey === key);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += customizedDish.quantity;
        return updated;
      } else {
        return [...prev, { ...customizedDish, cartKey: key }];
      }
    });

    addToast(`Added ${customizedDish.quantity}x ${customizedDish.name} to cart! 🍛`, 'success');
  };

  // Quick Add (using default portion and mild spice)
  const quickAddToCart = (dish, e) => {
    if (e) e.stopPropagation();
    if (!dish.inStock) {
      addToast('Sorry, this dish is currently sold out for today!', 'error');
      return;
    }

    // If item has portions or addOns, better to open customization modal
    if (dish.portionOptions && dish.portionOptions.length > 1) {
      setCustomizingItem(dish);
      return;
    }

    const defaultPortion = dish.portionOptions ? dish.portionOptions[0].name : 'Standard';
    const defaultSpice = dish.spiceLevels ? dish.spiceLevels[0] : 'Medium';
    
    addToCart({
      id: dish.id,
      name: dish.name,
      image: dish.image,
      isVeg: dish.isVeg,
      portion: defaultPortion,
      spiceLevel: defaultSpice,
      addOns: [],
      instructions: '',
      quantity: 1,
      price: dish.price,
      itemTotal: dish.price,
    });
  };

  // Update Cart Quantity
  const updateCartQuantity = (cartKey, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartKey === cartKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Remove from cart
  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(item => item.cartKey !== cartKey));
    addToast('Item removed from cart', 'info');
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    addToast('Cart cleared', 'info');
  };

  // Apply Coupon
  const applyCouponCode = (code) => {
    const found = availableCoupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      addToast('Invalid coupon code. Try WELCOME100 or SPICE20', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      addToast(`Minimum cart value of ₹${found.minOrder} required for ${found.code}`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    addToast(`Coupon ${found.code} applied! Saved with ${found.discount} 🎉`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Address Management
  const addAddress = (newAddr) => {
    const id = `addr-${Date.now()}`;
    const formatted = { ...newAddr, id, isDefault: addresses.length === 0 };
    setAddresses(prev => [...prev, formatted]);
    setSelectedAddressId(id);
    addToast('New delivery address saved!', 'success');
    return id;
  };

  const deleteAddress = (id) => {
    if (addresses.length <= 1) {
      addToast('You must keep at least one saved address', 'error');
      return;
    }
    setAddresses(prev => prev.filter(a => a.id !== id));
    if (selectedAddressId === id) {
      const remaining = addresses.filter(a => a.id !== id);
      setSelectedAddressId(remaining[0].id);
    }
    addToast('Address deleted', 'info');
  };

  // Checkout / Place Order
  const placeOrder = (paymentDetails, tipAmount = 0) => {
    if (cart.length === 0) return;

    const orderId = `SR-${Math.floor(10000 + Math.random() * 90000)}`;
    const currentAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + 
      ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newOrder = {
      id: orderId,
      date: formattedDate,
      timestamp: Date.now(),
      status: 'Order Placed',
      statusCode: 'pending', // pending -> accepted -> preparing -> out_for_delivery -> delivered
      items: [...cart],
      pricing: {
        subtotal: cartSubtotal,
        deliveryFee,
        taxes,
        discount: discountAmount,
        packagingFee,
        tipAmount,
        grandTotal: Number((cartGrandTotal + tipAmount).toFixed(2)),
        appliedCoupon: appliedCoupon ? appliedCoupon.code : null,
      },
      paymentMethod: paymentDetails.method === 'upi' ? `UPI (${paymentDetails.upiId || 'spiceroute@upi'})` :
                     paymentDetails.method === 'card' ? `Card (•••• ${paymentDetails.cardNumber.slice(-4) || '8841'})` : 'Cash on Delivery (COD)',
      deliveryType,
      address: currentAddress,
      estimatedTime: '30-40 minutes',
      driver: {
        name: 'Vikram Rajput',
        phone: '+91 98451 77332',
        rating: 4.9,
        vehicle: 'Ather 450X Electric (KA-01-SP-7821)',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      timeline: [
        { title: 'Order Placed', time: 'Just now', completed: true, active: true },
        { title: 'Restaurant Accepted', time: 'Est. 2 mins', completed: false, active: false },
        { title: 'Preparing Food', time: 'Est. 15 mins', completed: false, active: false },
        { title: 'Out for Delivery', time: 'Est. 25 mins', completed: false, active: false },
        { title: 'Delivered', time: 'Est. 35 mins', completed: false, active: false },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);
    setTrackingOrderId(orderId);
    setConfirmedOrder(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF7A00', '#E65100', '#10B981', '#F59E0B', '#DC2626'],
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }

    addToast(`🎉 Order #${orderId} confirmed successfully!`, 'success', 5000);

    // Start auto demo status progression for this order
    simulateOrderProgression(orderId);

    return newOrder;
  };

  // Reorder action
  const reorder = (pastOrder) => {
    pastOrder.items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        image: item.image || INITIAL_MENU_ITEMS.find(m => m.id === item.id)?.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        isVeg: item.isVeg,
        portion: item.portion,
        spiceLevel: item.spiceLevel,
        addOns: item.addOns || [],
        instructions: item.instructions || '',
        quantity: item.quantity,
        price: item.price,
        itemTotal: item.price,
      });
    });
    setIsCartOpen(true);
    addToast('Items added to cart from past order!', 'success');
  };

  // Order status simulation for tracking demo
  const simulateOrderProgression = (orderId) => {
    const statuses = [
      { code: 'accepted', status: 'Restaurant Accepted', delay: 7000 },
      { code: 'preparing', status: 'Preparing Food', delay: 16000 },
      { code: 'out_for_delivery', status: 'Out for Delivery', delay: 28000 },
      { code: 'delivered', status: 'Delivered', delay: 45000 },
    ];

    statuses.forEach(({ code, status, delay }) => {
      setTimeout(() => {
        setOrders(prev => {
          return prev.map(order => {
            if (order.id === orderId) {
              const updatedTimeline = order.timeline ? order.timeline.map(step => {
                if (step.title === status) return { ...step, completed: true, active: true };
                if (code === 'delivered' || (code === 'out_for_delivery' && step.title === 'Preparing Food')) return { ...step, completed: true, active: false };
                return step;
              }) : [];
              return {
                ...order,
                statusCode: code,
                status: status,
                timeline: updatedTimeline,
              };
            }
            return order;
          });
        });
      }, delay);
    });
  };

  // Update order status manually (Admin or manual test)
  const updateOrderStatus = (orderId, newStatusCode) => {
    const statusMap = {
      pending: 'Order Placed',
      accepted: 'Restaurant Accepted',
      preparing: 'Preparing Food',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          statusCode: newStatusCode,
          status: statusMap[newStatusCode] || newStatusCode,
        };
      }
      return order;
    }));

    addToast(`Order #${orderId} status updated to ${statusMap[newStatusCode]}`, 'info');
  };

  // Add Review
  const addReview = (reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      author: user.name || 'Food Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      rating: Number(reviewData.rating),
      date: 'Just now',
      dishName: reviewData.dishName || 'Royal Dining Feast',
      comment: reviewData.comment,
      verified: true,
    };
    setReviews(prev => [newRev, ...prev]);
    addToast('Thank you! Your verified review has been published ⭐', 'success');
  };

  // Admin Menu CRUD
  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: `dish-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
    };
    setMenuItems(prev => [newItem, ...prev]);
    addToast(`"${newItem.name}" added to menu successfully!`, 'success');
  };

  const updateMenuItem = (id, updatedFields) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    addToast('Dish updated successfully', 'success');
  };

  const toggleItemStock = (id) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextStock = !item.inStock;
        addToast(`${item.name} is now ${nextStock ? 'In Stock 🟢' : 'Sold Out 🔴'}`, 'info');
        return { ...item, inStock: nextStock };
      }
      return item;
    }));
  };

  const toggleItemBestseller = (id) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.bestseller;
        addToast(`${item.name} ${nextState ? 'marked as Bestseller ⭐' : 'removed from Bestsellers'}`, 'info');
        return { ...item, bestseller: nextState };
      }
      return item;
    }));
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    addToast('Dish removed from menu', 'info');
  };

  const resetMenuToDefault = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    localStorage.removeItem('srk_menu');
    addToast('Menu reset to authentic defaults', 'info');
  };

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        vegFilterOnly,
        setVegFilterOnly,
        nonVegFilterOnly,
        setNonVegFilterOnly,
        bestsellerOnly,
        setBestsellerOnly,
        spicyOnly,
        setSpicyOnly,
        priceSort,
        setPriceSort,
        menuItems,
        addMenuItem,
        updateMenuItem,
        toggleItemStock,
        toggleItemBestseller,
        deleteMenuItem,
        resetMenuToDefault,
        cart,
        addToCart,
        quickAddToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        deliveryFee,
        packagingFee,
        taxes,
        discountAmount,
        cartGrandTotal,
        cartCount,
        deliveryType,
        setDeliveryType,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        availableCoupons,
        favorites,
        toggleFavorite,
        user,
        setUser,
        addresses,
        selectedAddress,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        deleteAddress,
        orders,
        trackingOrderId,
        setTrackingOrderId,
        updateOrderStatus,
        placeOrder,
        reorder,
        reviews,
        addReview,
        customizingItem,
        setCustomizingItem,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        confirmedOrder,
        setConfirmedOrder,
        toasts,
        addToast,
        removeToast,
        restaurantInfo: RESTAURANT_INFO,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
