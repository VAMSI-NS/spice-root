import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/menuData';
import {
  Sparkles,
  Flame,
  Utensils,
  SunMedium,
  Soup,
  Wheat,
  Leaf,
  Drumstick,
  Cake,
  GlassWater,
} from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  Flame: Flame,
  Utensils: Utensils,
  SunMedium: SunMedium,
  Soup: Soup,
  Wheat: Wheat,
  Leaf: Leaf,
  Drumstick: Drumstick,
  Cake: Cake,
  GlassWater: GlassWater,
};

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory, menuItems } = useApp();

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        padding: '0.5rem 0 1rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {INITIAL_CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const IconComponent = ICON_MAP[cat.icon] || Sparkles;

        // Calculate active item count from current menu
        let count = 0;
        if (cat.id === 'all') {
          count = menuItems.length;
        } else if (cat.id === 'vegetarian') {
          count = menuItems.filter((i) => i.isVeg).length;
        } else if (cat.id === 'non-veg') {
          count = menuItems.filter((i) => !i.isVeg).length;
        } else {
          count = menuItems.filter((i) => i.category === cat.id).length;
        }

        return (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '9999px',
              background: isSelected
                ? 'linear-gradient(135deg, var(--accent-saffron) 0%, var(--accent-saffron-dark) 100%)'
                : 'var(--bg-card)',
              color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
              border: `1.5px solid ${isSelected ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
              boxShadow: isSelected ? 'var(--shadow-saffron)' : 'var(--shadow-sm)',
              fontWeight: isSelected ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              flexShrink: 0,
            }}
          >
            <IconComponent size={16} />
            <span>{cat.name}</span>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 7px',
                borderRadius: '9999px',
                background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-secondary)',
                color: isSelected ? '#FFF' : 'var(--text-muted)',
                fontWeight: 700,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
