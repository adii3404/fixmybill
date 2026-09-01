import { Transaction } from '../types';

export const exportTransactionsToExcel = (transactions: Transaction[]) => {
  // If transactions are empty
  if (!transactions || transactions.length === 0) {
    throw new Error('No transactions available to generate report');
  }

  // Calculate totals
  const totalAmount = transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  const matchedCount = transactions.filter((t) => t.status === 'matched').length;
  const verifiedCount = transactions.filter((t) => t.status === 'verified').length;
  const needsReviewCount = transactions.filter((t) => t.status === 'needs-bill').length;

  const rows = transactions.map((t, idx) => {
    const statusLabel =
      t.status === 'matched' ? 'Bill Matched' : t.status === 'verified' ? 'Verified' : 'Needs Bill / Missing Receipt';
    const hasProof = t.hasAttachment ? 'Yes' : 'No';
    const noteText = t.note ? t.note : '-';
    
    return `
      <tr>
        <td style="border: 1px solid #CBD5E1; padding: 8px 12px; text-align: center;">${idx + 1}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px 12px; font-weight: bold; text-align: left;">${t.merchant}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px 12px; text-align: right; font-weight: bold;">₹${Number(t.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px 12px; text-align: center;">${t.category}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px 12px; text-align: center;">${t.date}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px 12px; text-align: center; background-color: ${t.status === 'matched' ? '#ECFDF5' : t.status === 'verified' ? '#EEF2FF' : '#FFFBEB'}; color: ${t.status === 'matched' ? '#059669' : t.status === 'verified' ? '#4F46E5' : '#D97706'}; font-weight: bold;">${statusLabel}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px 12px; text-align: center;">${hasProof}</td>
        <td style="border: 1px solid #CBD5E1; padding: 8px 12px; text-align: left;">${noteText}</td>
      </tr>
    `;
  }).join('');

  const tableHTML = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>FixMyBill Report</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      <style>
        body { font-family: Arial, sans-serif; }
        th { background-color: #4F46E5; color: #FFFFFF; font-weight: bold; border: 1px solid #3730A3; padding: 10px; }
        td { border: 1px solid #CBD5E1; padding: 8px; }
        .summary-header { background-color: #1E1B4B; color: #FFFFFF; font-size: 14px; font-weight: bold; }
        .summary-cell { background-color: #F8FAFC; border: 1px solid #CBD5E1; padding: 8px; font-weight: bold; }
      </style>
    </head>
    <body>
      <h2 style="color: #4F46E5; margin-bottom: 4px;">FixMyBill — Expense & Bill Vault Report</h2>
      <p style="color: #64748B; font-size: 12px; margin-top: 0;">Generated on ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
      
      <table style="margin-bottom: 24px; border-collapse: collapse; width: 600px;">
        <tr class="summary-header">
          <td colspan="4" style="padding: 10px; font-size: 13px;">REPORT EXECUTIVE SUMMARY</td>
        </tr>
        <tr>
          <td class="summary-cell" style="color: #475569;">Total Expenses:</td>
          <td class="summary-cell" style="color: #0F172A; font-size: 14px;">₹${totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
          <td class="summary-cell" style="color: #475569;">Total Transactions:</td>
          <td class="summary-cell" style="color: #0F172A;">${transactions.length}</td>
        </tr>
        <tr>
          <td class="summary-cell" style="color: #059669;">Matched & Verified:</td>
          <td class="summary-cell" style="color: #059669;">${matchedCount + verifiedCount}</td>
          <td class="summary-cell" style="color: #D97706;">Pending Bills:</td>
          <td class="summary-cell" style="color: #D97706;">${needsReviewCount}</td>
        </tr>
      </table>

      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="border: 1px solid #3730A3; padding: 10px 12px; text-align: center; width: 50px;">#</th>
            <th style="border: 1px solid #3730A3; padding: 10px 12px; text-align: left;">Merchant / Payee</th>
            <th style="border: 1px solid #3730A3; padding: 10px 12px; text-align: right;">Amount (₹)</th>
            <th style="border: 1px solid #3730A3; padding: 10px 12px; text-align: center;">Category</th>
            <th style="border: 1px solid #3730A3; padding: 10px 12px; text-align: center;">Date</th>
            <th style="border: 1px solid #3730A3; padding: 10px 12px; text-align: center;">Status</th>
            <th style="border: 1px solid #3730A3; padding: 10px 12px; text-align: center;">Proof Attached</th>
            <th style="border: 1px solid #3730A3; padding: 10px 12px; text-align: left;">Notes</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr style="background-color: #F1F5F9; font-weight: bold;">
            <td colspan="2" style="border: 1px solid #CBD5E1; padding: 10px 12px; text-align: right;">TOTAL:</td>
            <td style="border: 1px solid #CBD5E1; padding: 10px 12px; text-align: right; color: #4F46E5; font-size: 14px;">₹${totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            <td colspan="5" style="border: 1px solid #CBD5E1; padding: 10px 12px;"></td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([tableHTML], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  const dateStr = new Date().toISOString().split('T')[0];
  downloadLink.download = `FixMyBill_Report_${dateStr}.xls`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
};
