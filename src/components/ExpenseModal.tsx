import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle, Camera, AlertCircle } from 'lucide-react';
import { ModalType, Transaction, ExpenseCategory } from '../types';

interface ExpenseModalProps {
  type: ModalType;
  selectedTransaction: Transaction | null;
  onClose: () => void;
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
  onUpdateTransactionStatus: (id: string, newStatus: Transaction['status']) => void;
  onShowToast: (msg: string) => void;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  type,
  selectedTransaction,
  onClose,
  onAddTransaction,
  onUpdateTransactionStatus,
  onShowToast
}) => {
  // Manual Form State
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Shopping');
  const [note, setNote] = useState('');

  // Upload State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!type && !selectedTransaction) return null;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant.trim()) {
      onShowToast('Please enter a merchant name');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      onShowToast('Please enter a valid amount');
      return;
    }

    onAddTransaction({
      merchant: merchant.trim(),
      amount: parsedAmount,
      date: 'Today',
      category: category,
      status: 'verified',
      note: note.trim() || undefined,
      hasAttachment: true
    });

    setMerchant('');
    setAmount('');
    setNote('');
    onClose();
    onShowToast(`Saved ₹${parsedAmount} for ${merchant}!`);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    onShowToast('🔍 AI analyzing receipt details...');
    setTimeout(() => {
      setIsScanning(false);
      const randomMerchants = ['Swiggy Gourmet', 'Reliance Fresh', 'Uber Ride', 'Blinkit', 'Zomato'];
      const pickedMerchant = randomMerchants[Math.floor(Math.random() * randomMerchants.length)];
      const randomAmount = Math.floor(Math.random() * 850) + 150;
      
      onAddTransaction({
        merchant: pickedMerchant,
        amount: randomAmount,
        date: 'Today',
        category: 'Dining',
        status: 'matched',
        hasAttachment: true
      });
      onClose();
      onShowToast(`⚡ Bill scanned! ₹${randomAmount} from ${pickedMerchant} matched with UPI`);
    }, 1200);
  };

  const handleSimulateUpload = () => {
    const fileName = selectedFileName || 'GPay_UPI_Transaction_Screenshot.png';
    onShowToast(`Processing ${fileName}...`);
    setTimeout(() => {
      onAddTransaction({
        merchant: 'Flipkart Online',
        amount: 899,
        date: 'Today',
        category: 'Shopping',
        status: 'matched',
        hasAttachment: true
      });
      setSelectedFileName(null);
      onClose();
      onShowToast('📄 UPI screenshot imported & matched to Flipkart order!');
    }, 1000);
  };

  const renderContent = () => {
    if (selectedTransaction) {
      return (
        <div>
          <div className="sheet-header">
            <h4>Transaction Details</h4>
            <button className="close-sheet-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '13px', color: '#64748B' }}>Merchant</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{selectedTransaction.merchant}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Amount</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>₹{selectedTransaction.amount.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Category</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#4F46E5' }}>{selectedTransaction.category}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Date</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>{selectedTransaction.date}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '12px', background: selectedTransaction.status === 'matched' ? '#ECFDF5' : selectedTransaction.status === 'needs-bill' ? '#FFFBEB' : '#EEF2FF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selectedTransaction.status === 'matched' ? (
                <CheckCircle size={18} color="#059669" />
              ) : (
                <AlertCircle size={18} color={selectedTransaction.status === 'needs-bill' ? '#D97706' : '#4F46E5'} />
              )}
              <div style={{ fontSize: '13px', fontWeight: 600, color: selectedTransaction.status === 'matched' ? '#059669' : selectedTransaction.status === 'needs-bill' ? '#B45309' : '#4338CA' }}>
                {selectedTransaction.status === 'matched'
                  ? 'Bill & UPI payment proof 100% matched.'
                  : selectedTransaction.status === 'needs-bill'
                  ? 'Missing invoice or receipt attachment.'
                  : 'Receipt saved & verified.'}
              </div>
            </div>
          </div>

          {selectedTransaction.status === 'needs-bill' ? (
            <button
              className="action-pill-btn primary"
              style={{ width: '100%', padding: '16px' }}
              onClick={() => {
                onUpdateTransactionStatus(selectedTransaction.id, 'matched');
                onClose();
                onShowToast(`Attached invoice to ${selectedTransaction.merchant}!`);
              }}
            >
              <span className="action-title" style={{ fontSize: '15px' }}>📎 Attach Bill / Invoice</span>
            </button>
          ) : (
            <button
              className="action-pill-btn secondary"
              style={{ width: '100%', padding: '14px' }}
              onClick={onClose}
            >
              <span className="action-title" style={{ fontSize: '14px' }}>Close</span>
            </button>
          )}
        </div>
      );
    }

    if (type === 'camera') {
      return (
        <div>
          <div className="sheet-header">
            <h4>Smart Bill Scanner</h4>
            <button className="close-sheet-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          <div className="scanner-viewfinder">
            <div className="scanner-laser"></div>
            <div className="scanner-frame-corners">
              <span style={{ fontSize: '13px', color: '#CBD5E1', textAlign: 'center', padding: '10px' }}>
                {isScanning ? 'Extracting details...' : 'Align bill or payment screenshot'}
              </span>
            </div>
          </div>
          <button
            className="action-pill-btn primary"
            style={{ width: '100%', padding: '16px' }}
            onClick={handleSimulateScan}
            disabled={isScanning}
          >
            <span className="action-title" style={{ fontSize: '15px' }}>
              {isScanning ? '⏳ Extracting...' : '📸 Snap & Auto-Extract Details'}
            </span>
          </button>
        </div>
      );
    }

    if (type === 'upload') {
      return (
        <div>
          <div className="sheet-header">
            <h4>Upload Bill or Screenshot</h4>
            <button className="close-sheet-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          <div
            style={{
              border: `2px dashed ${dragActive ? '#4F46E5' : '#CBD5E1'}`,
              borderRadius: '16px',
              padding: '36px 20px',
              textAlign: 'center',
              marginBottom: '20px',
              background: dragActive ? '#EEF2FF' : '#F8FAFC',
              cursor: 'pointer'
            }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setSelectedFileName(e.dataTransfer.files[0].name);
              }
            }}
            onClick={() => {
              const fileInput = document.getElementById('receipt-file-input') as HTMLInputElement;
              if (fileInput) fileInput.click();
            }}
          >
            <input
              type="file"
              id="receipt-file-input"
              style={{ display: 'none' }}
              accept="image/*,.pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFileName(e.target.files[0].name);
                }
              }}
            />
            <UploadCloud size={38} color="#4F46E5" strokeWidth={2} style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
              {selectedFileName ? selectedFileName : 'Drop files here or browse'}
            </div>
            <div style={{ fontSize: '13px', color: '#64748B', marginTop: '6px' }}>
              PDF, PNG, JPG from PhonePe, GPay, Paytm
            </div>
          </div>
          <button
            className="action-pill-btn primary"
            style={{ width: '100%', padding: '16px' }}
            onClick={handleSimulateUpload}
          >
            <span className="action-title" style={{ fontSize: '15px' }}>
              {selectedFileName ? 'Import & Verify Selected File' : 'Choose from Gallery / Files'}
            </span>
          </button>
        </div>
      );
    }

    if (type === 'manual') {
      return (
        <form onSubmit={handleManualSubmit}>
          <div className="sheet-header">
            <h4>Add Expense Manually</h4>
            <button type="button" className="close-sheet-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Merchant / Payee
              </label>
              <input
                type="text"
                placeholder="e.g. Swiggy, Uber, Electricity, Rent"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  marginTop: '6px',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="₹ 0.00"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    marginTop: '6px',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                  style={{
                    width: '100%',
                    padding: '13px',
                    borderRadius: '12px',
                    border: '1px solid #CBD5E1',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    marginTop: '6px',
                    background: 'white',
                    outline: 'none'
                  }}
                >
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                  <option value="Dining">Dining</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Travel">Travel</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Paid via UPI"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  marginTop: '6px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          <button type="submit" className="action-pill-btn primary" style={{ width: '100%', padding: '16px' }}>
            <span className="action-title" style={{ fontSize: '15px' }}>Save Expense</span>
          </button>
        </form>
      );
    }

    return null;
  };

  return (
    <div className="sheet-overlay active" id="sheet-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
};
