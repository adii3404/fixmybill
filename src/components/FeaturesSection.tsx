import React from 'react';
import { Camera, Activity, ShieldCheck } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section
      className="section-wrap"
      id="features"
      style={{
        background: 'white',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        maxWidth: '100%'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="section-heading">
          <div className="eyebrow" id="features-eyebrow">Features</div>
          <h2>Built for how you actually spend.</h2>
          <p>Whether it's a quick UPI payment, an invoice PDF, or a paper receipt — we handle it all with intelligence and care.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card" id="feature-smart-scan">
            <div className="feature-icon-box">
              <Camera size={28} strokeWidth={2} />
            </div>
            <h4>Smart Scan</h4>
            <p>Point your camera at any receipt or invoice. Our AI extracts amount, merchant, date, and category in seconds.</p>
          </div>

          <div className="feature-card" id="feature-auto-match">
            <div className="feature-icon-box">
              <Activity size={28} strokeWidth={2} />
            </div>
            <h4>Auto-Match Payments</h4>
            <p>PhonePe, GPay, Paytm and bank screenshots get automatically matched to your bills — no double entry, no confusion.</p>
          </div>

          <div className="feature-card" id="feature-security">
            <div className="feature-icon-box">
              <ShieldCheck size={28} strokeWidth={2} />
            </div>
            <h4>Bank-Grade Security</h4>
            <p>End-to-end 256-bit encryption and RBI-aligned compliance. Your financial data never leaves your control.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
