import React, { useState } from 'react';
import { IndianRupee, FileCheck, AlertCircle, ChevronDown } from 'lucide-react';
import { MonthlyStats } from '../types';

interface StatsSectionProps {
  stats: MonthlyStats;
  onShowToast: (msg: string) => void;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, onShowToast }) => {
  const [selectedMonth, setSelectedMonth] = useState('August 2024');
  const months = ['August 2024', 'July 2024', 'June 2024', 'May 2024'];

  const handleMonthChange = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentIndex = months.indexOf(selectedMonth);
    const nextMonth = months[(currentIndex + 1) % months.length];
    setSelectedMonth(nextMonth);
    onShowToast(`Filtered overview for ${nextMonth}`);
  };

  return (
    <section className="stats-preview-section" id="stats-section">
      <div className="section-wrap">
        <div className="stats-header">
          <h3>This month at a glance</h3>
          <a
            href="#filter-month"
            className="section-action-link"
            id="month-filter-btn"
            onClick={handleMonthChange}
          >
            {selectedMonth}
            <ChevronDown size={14} strokeWidth={2.5} />
          </a>
        </div>

        <div className="summary-grid">
          <div
            className="stat-card spent"
            id="stat-card-spent"
            onClick={() => onShowToast(`Total month spend: ₹${stats.totalSpent.toLocaleString('en-IN')}`)}
          >
            <div className="stat-icon-wrap">
              <IndianRupee size={22} strokeWidth={2.3} />
            </div>
            <div className="stat-val">₹{stats.totalSpent.toLocaleString('en-IN')}</div>
            <div className="stat-lbl">Total spent</div>
          </div>

          <div
            className="stat-card saved"
            id="stat-card-saved"
            onClick={() => onShowToast(`${stats.billsSaved} bills safely stored & searchable`)}
          >
            <div className="stat-icon-wrap">
              <FileCheck size={22} strokeWidth={2.3} />
            </div>
            <div className="stat-val">{stats.billsSaved}</div>
            <div className="stat-lbl">Bills saved</div>
          </div>

          <div
            className="stat-card review"
            id="stat-card-review"
            onClick={() => onShowToast(`${stats.needsReview} transactions need bill attachments`)}
          >
            <div className="stat-icon-wrap">
              <AlertCircle size={22} strokeWidth={2.3} />
            </div>
            <div className="stat-val">{stats.needsReview}</div>
            <div className="stat-lbl">Needs review</div>
          </div>
        </div>
      </div>
    </section>
  );
};
