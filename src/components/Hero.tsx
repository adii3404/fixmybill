import React from 'react';
import { Camera, Play, UploadCloud, Edit3, Info, Sparkles, FileSpreadsheet } from 'lucide-react';
import { ModalType, Transaction } from '../types';
import { exportTransactionsToExcel } from '../utils/exportReport';

interface HeroProps {
  transactions: Transaction[];
  onOpenModal: (type: ModalType) => void;
  onShowToast: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ transactions, onOpenModal, onShowToast }) => {
  const handleGenerateReport = () => {
    try {
      if (!transactions || transactions.length === 0) {
        onShowToast('No transactions found to generate report.');
        return;
      }
      exportTransactionsToExcel(transactions);
      onShowToast('Downloading Excel report with all transactions!');
    } catch (err: any) {
      console.error(err);
      onShowToast(err.message || 'Failed to export report');
    }
  };

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
          <a
            href="https://youtu.be/AJwvhby-lB4?si=pSNKLnkAT7k796tR"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-large-ghost"
            id="hero-demo-btn"
            style={{ textDecoration: 'none' }}
          >
            <Play size={16} fill="currentColor" />
            Watch Demo
          </a>
        </div>

        <div style={{ marginTop: '-12px', marginBottom: '8px' }}>
          <button
            className="btn-large-primary"
            id="hero-generate-report-btn"
            onClick={handleGenerateReport}
            style={{
              background: 'linear-gradient(135deg, #059669, #047857)',
              boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)',
              cursor: 'pointer'
            }}
          >
            <FileSpreadsheet size={18} strokeWidth={2.3} />
            Generate a Report
          </button>
        </div>
      </div>

      <div className="hero-right">
        {/* Primary Upload Card */}
        <div className="hero-upload-card" id="hero-upload-container">
          <div className="card-head">
            <div className="card-tag">
              <Sparkles size={12} strokeWidth={3} />
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
