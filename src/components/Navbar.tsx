import React, { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  onShowToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShowToast }) => {
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
          <li><a href="#pricing" onClick={(e) => { e.preventDefault(); onShowToast('FixMyBill is currently 100% free with unlimited bill storage!'); }}>Pricing</a></li>
          <li><a href="#help" onClick={(e) => { e.preventDefault(); onShowToast('Help center & 24/7 WhatsApp assistant available'); }}>Help</a></li>
        </ul>

        <div className="nav-cta-group">
          <button
            className="btn-ghost"
            id="nav-signin-btn"
            onClick={() => onShowToast('Sign in modal opening...')}
          >
            Sign in
          </button>
          <button
            className="btn-primary"
            id="nav-get-started-btn"
            onClick={() => onShowToast('Free trial started — no credit card needed!')}
          >
            Get Started
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
        <div style={{
          background: 'white',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
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
            onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onShowToast('FixMyBill is currently 100% free with unlimited bill storage!'); }}
          >
            Pricing
          </a>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              className="btn-primary"
              style={{ flex: 1 }}
              onClick={() => { setMobileMenuOpen(false); onShowToast('Free trial started — no credit card needed!'); }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
