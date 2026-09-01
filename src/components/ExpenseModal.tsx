import React, { useState, useRef } from 'react';
import { X, UploadCloud, CheckCircle, Camera, AlertCircle, FileCheck, RefreshCw, Calendar, Tag, DollarSign } from 'lucide-react';
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
  const [date, setDate] = useState('Today');

  // Upload State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      date: date || 'Today',
      category: category,
      status: 'verified',
      note: note.trim() || undefined,
      hasAttachment: true
    });

    setMerchant('');
    setAmount('');
    setNote('');
    onClose();
  };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSimulateScan = () => {
    setIsProcessing(true);
    onShowToast('Analyzing receipt with OCR...');
    setTimeout(() => {
      setIsProcessing(false);
      const randomMerchants = [
        { name: 'Swiggy Instamart', cat: 'Groceries' as ExpenseCategory, amt: 549 },
        { name: 'Reliance Digital', cat: 'Shopping' as ExpenseCategory, amt: 3499 },
        { name: 'Uber Premier', cat: 'Travel' as ExpenseCategory, amt: 380 },
        { name: 'Blinkit Delivery', cat: 'Groceries' as ExpenseCategory, amt: 290 },
        { name: 'Cult.Fit Gym', cat: 'Health' as ExpenseCategory, amt: 1800 }
      ];
      const picked = randomMerchants[Math.floor(Math.random() * randomMerchants.length)];
      
      onAddTransaction({
        merchant: picked.name,
        amount: picked.amt,
        date: 'Today',
        category: picked.cat,
        status: 'matched',
        hasAttachment: true
      });
      onClose();
      onShowToast(`Extracted ₹${picked.amt} for ${picked.name}`);
    }, 1200);
  };

  const handleProcessUploadedFile = () => {
    if (!selectedFile) {
      if (fileInputRef.current) fileInputRef.current.click();
      return;
    }

    setIsProcessing(true);
    onShowToast(`Scanning ${selectedFile.name}...`);
    setTimeout(() => {
      setIsProcessing(false);
      const detectedAmount = Math.floor(Math.random() * 1200) + 250;
      onAddTransaction({
        merchant: selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Uploaded Receipt',
        amount: detectedAmount,
        date: 'Today',
        category: 'Shopping',
        status: 'matched',
        hasAttachment: true,
        attachmentName: selectedFile.name
      });
      setSelectedFile(null);
      setPreviewUrl(null);
      onClose();
      onShowToast(`Invoice verified: ₹${detectedAmount}`);
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
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                {selectedTransaction.merchant}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Amount</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                    ₹{selectedTransaction.amount.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Category</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#4F46E5' }}>
                    {selectedTransaction.category}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Date</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>
                    {selectedTransaction.date}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background:
                  selectedTransaction.status === 'matched'
                    ? '#ECFDF5'
                    : selectedTransaction.status === 'needs-bill'
                    ? '#FFFBEB'
                    : '#EEF2FF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {selectedTransaction.status === 'matched' ? (
                <CheckCircle size={18} color="#059669" />
              ) : (
                <AlertCircle size={18} color={selectedTransaction.status === 'needs-bill' ? '#D97706' : '#4F46E5'} />
              )}
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color:
                    selectedTransaction.status === 'matched'
                      ? '#059669'
                      : selectedTransaction.status === 'needs-bill'
                      ? '#B45309'
                      : '#4338CA'
                }}
              >
                {selectedTransaction.status === 'matched'
                  ? 'Bill & payment proof 100% matched.'
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
              }}
            >
              <span className="action-title" style={{ fontSize: '15px' }}>
                📎 Attach Bill & Mark Matched
              </span>
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
          <div className="scanner-viewfinder" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="scanner-laser"></div>
            <div className="scanner-frame-corners" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={36} color="rgba(255,255,255,0.7)" style={{ marginBottom: '8px' }} />
              <span style={{ fontSize: '13px', color: '#E2E8F0', textAlign: 'center', padding: '0 20px' }}>
                {isProcessing ? 'Extracting merchant & total...' : 'Position receipt or screenshot in frame'}
              </span>
            </div>
          </div>
          <button
            className="action-pill-btn primary"
            style={{ width: '100%', padding: '16px' }}
            onClick={handleSimulateScan}
            disabled={isProcessing}
          >
            <span className="action-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> Extracting details...
                </>
              ) : (
                '📸 Snap & Auto-Extract Receipt'
              )}
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
              padding: previewUrl ? '16px' : '36px 20px',
              textAlign: 'center',
              marginBottom: '20px',
              background: dragActive ? '#EEF2FF' : '#F8FAFC',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileChange(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*,.pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />

            {previewUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img
                  src={previewUrl}
                  alt="Receipt Preview"
                  style={{ maxHeight: '140px', borderRadius: '8px', objectFit: 'contain' }}
                />
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  {selectedFile?.name}
                </div>
              </div>
            ) : selectedFile ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <FileCheck size={36} color="#10B981" />
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {selectedFile.name}
                </div>
              </div>
            ) : (
              <>
                <UploadCloud size={38} color="#4F46E5" strokeWidth={2} style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                  Drop files here or click to browse
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '6px' }}>
                  PDF, PNG, JPG from PhonePe, GPay, Paytm, or paper bills
                </div>
              </>
            )}
          </div>
          <button
            className="action-pill-btn primary"
            style={{ width: '100%', padding: '16px' }}
            onClick={handleProcessUploadedFile}
            disabled={isProcessing}
          >
            <span className="action-title" style={{ fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {isProcessing ? (
                <>
                  <RefreshCw size={18} className="animate-spin" /> Processing Invoice...
                </>
              ) : selectedFile ? (
                'Import & Extract Selected File'
              ) : (
                'Browse from Gallery / Files'
              )}
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
                  border: '1.5px solid #CBD5E1',
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
                    border: '1.5px solid #CBD5E1',
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
                    border: '1.5px solid #CBD5E1',
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
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Date
                </label>
                <input
                  type="text"
                  placeholder="Today, Yesterday, 25 Aug"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    marginTop: '6px',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
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
                    border: '1.5px solid #CBD5E1',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    marginTop: '6px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="action-pill-btn primary" style={{ width: '100%', padding: '16px' }}>
            <span className="action-title" style={{ fontSize: '15px' }}>Save Expense to Vault</span>
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
