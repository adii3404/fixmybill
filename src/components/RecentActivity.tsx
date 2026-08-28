import React, { useState } from 'react';
import { ShoppingBag, Activity, Coffee, CreditCard, Plus, Search } from 'lucide-react';
import { Transaction, ModalType } from '../types';

interface RecentActivityProps {
  transactions: Transaction[];
  onOpenModal: (type: ModalType) => void;
  onShowToast: (msg: string) => void;
  onSelectTransaction: (item: Transaction) => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  transactions,
  onOpenModal,
  onShowToast,
  onSelectTransaction
}) => {
  const [filter, setFilter] = useState<'all' | 'needs-bill' | 'matched' | 'verified'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch = item.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getMerchantIcon = (merchant: string) => {
    const lower = merchant.toLowerCase();
    if (lower.includes('amazon') || lower.includes('shop') || lower.includes('flipkart')) {
      return (
        <div className="merchant-avatar amazon">
          <ShoppingBag size={24} strokeWidth={2} />
        </div>
      );
    }
    if (lower.includes('apollo') || lower.includes('hospital') || lower.includes('pharmacy') || lower.includes('med')) {
      return (
        <div className="merchant-avatar apollo">
          <Activity size={24} strokeWidth={2} />
        </div>
      );
    }
    if (lower.includes('starbucks') || lower.includes('coffee') || lower.includes('cafe') || lower.includes('dining')) {
      return (
        <div className="merchant-avatar starbucks">
          <Coffee size={24} strokeWidth={2} />
        </div>
      );
    }
    return (
      <div className="merchant-avatar generic">
        <CreditCard size={24} strokeWidth={2} />
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'matched') {
      return (
        <span className="status-badge matched">
          <span className="badge-dot"></span>
          Bill + payment matched
        </span>
      );
    }
    if (status === 'needs-bill') {
      return (
        <span className="status-badge needs-bill">
          <span className="badge-dot"></span>
          Payment proof needs bill
        </span>
      );
    }
    return (
      <span className="status-badge verified">
        <span className="badge-dot"></span>
        Bill verified
      </span>
    );
  };

  return (
    <section className="section-wrap" id="activity">
      <div className="section-heading">
        <div className="eyebrow" id="activity-eyebrow">Recent Activity</div>
        <h2>Every transaction, neatly matched.</h2>
        <p>See your bills and payments automatically connected. Any missing receipts get flagged, so nothing slips through the cracks.</p>
      </div>

      <div style={{ maxWidth: '780px', margin: '0 auto 16px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'matched', 'needs-bill', 'verified'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: filter === f ? 'var(--primary)' : '#E2E8F0',
                background: filter === f ? 'var(--primary-light)' : 'white',
                color: filter === f ? 'var(--primary)' : '#64748B',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {f === 'all' ? 'All' : f === 'needs-bill' ? 'Needs Bill' : f}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 10, color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search payee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '6px 12px 6px 30px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
          <button
            className="btn-primary"
            style={{ padding: '7px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
            onClick={() => onOpenModal('manual')}
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <div className="activity-container" id="activity-list">
        {filteredTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', color: '#64748B' }}>
            No transactions match the selected filter.
          </div>
        ) : (
          filteredTransactions.map((item) => (
            <div
              key={item.id}
              className="activity-row"
              id={`activity-item-${item.id}`}
              onClick={() => {
                onSelectTransaction(item);
                onShowToast(`${item.merchant} — ₹${item.amount.toLocaleString('en-IN')}: ${item.status === 'matched' ? 'Invoice & UPI matched' : item.status === 'needs-bill' ? 'Please attach invoice' : 'Verified receipt'}`);
              }}
            >
              {getMerchantIcon(item.merchant)}
              <div className="activity-info">
                <div className="activity-top-line">
                  <span className="merchant-name">{item.merchant}</span>
                  <span className="activity-amount">₹{item.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="activity-bottom-line">
                  {getStatusBadge(item.status)}
                  <span className="activity-date">{item.date}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
