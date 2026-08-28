import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  return (
    <div className={`toast-notification ${isVisible ? 'show' : ''}`} id="toast" role="alert">
      <Check size={16} color="#10B981" strokeWidth={2.5} />
      <span id="toast-text">{message}</span>
    </div>
  );
};
