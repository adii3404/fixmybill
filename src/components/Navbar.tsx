import React, { useState } from 'react';
import { FileText, Menu, X, PlusCircle, Sparkles } from 'lucide-react';
import { ModalType } from '../types';

interface NavbarProps {
  onOpenModal: (type: ModalType) => void;
  onShowToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, onShowToast }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="top-navbar" id="main-navigation">
      <div className="navbar-inner">
        <a href="#" className="brand-row" id="brand-logo-link">
          <div className="brand-logo-icon">
            <FileText size={20} strokeWidth={2.3} />
          </div>
          <div className="brand-title">Fix<span>My</span>Bill</div>
        </a>

        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#activity">Activity</a></li>
          <li>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                onShowToast('FixMyBill is 100% free with unlimited local storage & exports!');
              }}
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#help"
              onClick={(e) => {
                e.preventDefault();
                onShowToast('Help & guides are available directly in your dashboard');
              }}
            >
              Help
            </a>
          </li>
        </ul>

        <div className="nav-cta-group">
          <button
            className="btn-ghost"
            id="nav-quick-camera-btn"
            onClick={() => onOpenModal('camera')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={16} color="#4F46E5" />
            <span>Smart Scan</span>
          </button>
          <button
            className="btn-primary"
            id="nav-add-expense-btn"
            onClick={() => onOpenModal('manual')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <PlusCircle size={16} />
            <span>Add Expense</span>
          </button>

          <button
            className="mobile-menu-toggle"
            id="mobile-menu-btn"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          style={{
            background: 'white',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <a
            href="#features"
            style={{ textDecoration: 'none', color: '#0F172A', fontWeight: 600, padding: '8px 0' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#activity"
            style={{ textDecoration: 'none', color: '#0F172A', fontWeight: 600, padding: '8px 0' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Activity
          </a>
          <a
            href="#pricing"
            style={{ textDecoration: 'none', color: '#0F172A', fontWeight: 600, padding: '8px 0' }}
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onShowToast('FixMyBill is 100% free with unlimited local storage & exports!');
            }}
          >
            Pricing
          </a>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              className="btn-primary"
              style={{ flex: 1 }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('camera');
              }}
            >
              Smart Scan Bill
            </button>
            <button
              className="btn-ghost"
              style={{ flex: 1, border: '1px solid #E2E8F0' }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('manual');
              }}
            >
              Add Manually
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
