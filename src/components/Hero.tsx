import React from 'react';
import { Camera, Play, ShieldCheck, Check, UploadCloud, Edit3, Info, Sparkles } from 'lucide-react';
import { ModalType } from '../types';

interface HeroProps {
  onOpenModal: (type: ModalType) => void;
  onShowToast: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal, onShowToast }) => {
  return (
    <section className="hero-section" id="hero-section">
      <div className="hero-left">
        <div className="eyebrow" id="user-greeting-badge">
          <Sparkles size={13} strokeWidth={2.5} color="#4F46E5" />
          Smart Expense & Receipt Vault
        </div>
        <h1>Your bills and payments, <span>organized.</span></h1>
        <p className="lead">
          FixMyBill automatically captures, matches, and organizes every receipt, invoice, and payment screenshot — so you never lose track of money again.
        </p>

        <div className="hero-cta-row">
          <button
            className="btn-large-primary"
            id="hero-scan-btn"
            onClick={() => onOpenModal('camera')}
          >
            <Camera size={18} strokeWidth={2.3} />
            Scan Your First Bill
          </button>
          <button
            className="btn-large-ghost"
            id="hero-demo-btn"
            onClick={() => onShowToast('▶ Product demo: Point camera at any receipt or upload UPI screenshots to auto-categorize.')}
          >
            <Play size={16} fill="currentColor" />
            Watch Demo
          </button>
        </div>

        <div className="trust-strip">
          <div className="trust-item">
            <ShieldCheck size={15} strokeWidth={2.5} />
            100% Private & Local
          </div>
          <div className="trust-item">
            <Check size={14} strokeWidth={2.5} />
            Instant OCR Matching
          </div>
          <div className="trust-item">
            <Check size={14} strokeWidth={2.5} />
            Free Forever
          </div>
        </div>
      </div>

      <div className="hero-right">
        {/* Primary Upload Card */}
        <div className="hero-upload-card" id="hero-upload-container">
          <div className="card-head">
            <div className="card-tag">
              <Check size={12} strokeWidth={3} />
              Instant Vault Ready
            </div>
            <h2>Add a new expense</h2>
            <p>Upload a bill, payment screenshot, or add it manually.</p>
          </div>

          <div className="action-grid">
            <button
              className="action-pill-btn primary"
              id="action-open-camera"
              onClick={() => onOpenModal('camera')}
            >
              <div className="popular-chip">Fast</div>
              <div className="btn-icon-wrapper">
                <Camera size={24} strokeWidth={2.2} />
              </div>
              <span className="action-title">Open Camera</span>
            </button>

            <button
              className="action-pill-btn secondary"
              id="action-upload-file"
              onClick={() => onOpenModal('upload')}
            >
              <div className="btn-icon-wrapper">
                <UploadCloud size={22} strokeWidth={2.2} />
              </div>
              <span className="action-title">Upload File</span>
            </button>

            <button
              className="action-pill-btn secondary"
              id="action-add-manual"
              onClick={() => onOpenModal('manual')}
            >
              <div className="btn-icon-wrapper">
                <Edit3 size={22} strokeWidth={2.2} />
              </div>
              <span className="action-title">Add Manually</span>
            </button>
          </div>

          <div className="upload-helper-note">
            <Info className="helper-icon" size={16} strokeWidth={2.2} />
            <div className="helper-desc">
              Supports receipts, invoices, PDFs, <strong>PhonePe</strong>, <strong>GPay</strong>, <strong>Paytm</strong>, and bank-payment screenshots.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
