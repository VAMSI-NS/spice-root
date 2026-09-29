import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: 'calc(100% - 48px)',
      pointerEvents: 'none',
    }}>
      {toasts.map(toast => {
        let icon = <CheckCircle2 size={18} color="#16A34A" />;
        let borderColor = 'rgba(22, 163, 74, 0.4)';
        let bgGradient = 'rgba(22, 163, 74, 0.1)';

        if (toast.type === 'error') {
          icon = <AlertCircle size={18} color="#DC2626" />;
          borderColor = 'rgba(220, 38, 38, 0.4)';
          bgGradient = 'rgba(220, 38, 38, 0.1)';
        } else if (toast.type === 'info') {
          icon = <Info size={18} color="#FF7A00" />;
          borderColor = 'rgba(255, 122, 0, 0.4)';
          bgGradient = 'rgba(255, 122, 0, 0.1)';
        }

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '12px 16px',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderRadius: '14px',
              border: `1px solid ${borderColor}`,
              boxShadow: 'var(--shadow-lg)',
              backdropFilter: 'blur(10px)',
              animation: 'slideInBottom 0.25s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                padding: '6px',
                borderRadius: '8px',
                background: bgGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {icon}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.3 }}>
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
              }}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
