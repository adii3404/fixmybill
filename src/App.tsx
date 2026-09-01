import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { RecentActivity } from './components/RecentActivity';
import { FeaturesSection } from './components/FeaturesSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ExpenseModal } from './components/ExpenseModal';
import { Toast } from './components/Toast';
import { Transaction, ModalType, MonthlyStats } from './types';

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    merchant: 'Amazon India',
    amount: 1299,
    date: 'Today',
    status: 'matched',
    category: 'Shopping',
    hasAttachment: true
  },
  {
    id: 'tx-2',
    merchant: 'Apollo Hospital',
    amount: 2450,
    date: 'Yesterday',
    status: 'needs-bill',
    category: 'Health',
    hasAttachment: false
  },
  {
    id: 'tx-3',
    merchant: 'Starbucks Coffee',
    amount: 420,
    date: '24 Aug',
    status: 'verified',
    category: 'Dining',
    hasAttachment: true
  },
  {
    id: 'tx-4',
    merchant: 'Electricity Bill (BESCOM)',
    amount: 1850,
    date: '22 Aug',
    status: 'matched',
    category: 'Utilities',
    hasAttachment: true
  }
];

const STORAGE_KEY = 'fixmybill_transactions_data';

export const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse stored transactions:', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.warn('Failed to save transactions to localStorage:', e);
    }
  }, [transactions]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}`
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Added ₹${newTx.amount.toLocaleString('en-IN')} for ${newTx.merchant}`);
  };

  const handleUpdateStatus = (id: string, newStatus: Transaction['status']) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, status: newStatus, hasAttachment: true } : tx))
    );
    showToast('Receipt attached & verified!');
  };

  // Dynamic calculations based on active transactions
  const totalSpendCalculated = transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  const currentNeedsReviewCount = transactions.filter((t) => t.status === 'needs-bill').length;
  const currentSavedBillsCount = transactions.filter((t) => t.hasAttachment).length;

  const monthlyStats: MonthlyStats = {
    totalSpent: totalSpendCalculated,
    billsSaved: currentSavedBillsCount,
    needsReview: currentNeedsReviewCount
  };

  return (
    <div className="min-h-screen flex flex-col" id="app-root">
      <Toast message={toastMessage} isVisible={toastVisible} />

      <Navbar
        onOpenModal={(type) => {
          setSelectedTransaction(null);
          setActiveModal(type);
        }}
        onShowToast={showToast}
      />

      <main>
        <Hero
          onOpenModal={(type) => {
            setSelectedTransaction(null);
            setActiveModal(type);
          }}
          onShowToast={showToast}
        />

        <StatsSection stats={monthlyStats} onShowToast={showToast} />

        <RecentActivity
          transactions={transactions}
          onOpenModal={(type) => {
            setSelectedTransaction(null);
            setActiveModal(type);
          }}
          onShowToast={showToast}
          onSelectTransaction={(tx) => {
            setSelectedTransaction(tx);
            setActiveModal(null);
          }}
        />

        <FeaturesSection />

        <CtaSection onShowToast={showToast} />
      </main>

      <Footer />

      <ExpenseModal
        type={activeModal}
        selectedTransaction={selectedTransaction}
        onClose={() => {
          setActiveModal(null);
          setSelectedTransaction(null);
        }}
        onAddTransaction={handleAddTransaction}
        onUpdateTransactionStatus={handleUpdateStatus}
        onShowToast={showToast}
      />
    </div>
  );
};

export default App;
