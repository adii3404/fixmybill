import React from 'react';

interface CtaSectionProps {
  onShowToast: (msg: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onShowToast }) => {
  return (
    <section className="cta-strip" id="cta-section">
      <div className="cta-inner">
        <h2>Ready to fix your bills for good?</h2>
        <p>Join 50,000+ Indians who never worry about lost receipts, missing bills, or reimbursement chaos again.</p>
        <button
          className="btn-white"
          id="cta-get-started-btn"
          onClick={() => onShowToast('Welcome to FixMyBill! Free plan activated.')}
        >
          Get Started — It's Free
        </button>
      </div>
    </section>
  );
};
