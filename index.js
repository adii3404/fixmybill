const pageContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FixMyBill — Your Bills and Payments, Organized</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    :root {
      --primary: #4F46E5;
      --primary-hover: #4338CA;
      --primary-light: #EEF2FF;
      --primary-glow: rgba(79, 70, 229, 0.25);
      --accent-blue: #0284C7;
      --accent-light-blue: #E0F2FE;
      --app-bg: #FFFFFF;
      --page-bg: #FAFBFF;
      --surface-card: #FFFFFF;
      --text-main: #0F172A;
      --text-secondary: #475569;
      --text-muted: #94A3B8;
      --border-subtle: #F1F5F9;
      --border-card: #E2E8F0;
      --success-bg: #ECFDF5;
      --success-text: #059669;
      --success-dot: #10B981;
      --warning-bg: #FFFBEB;
      --warning-text: #B45309;
      --warning-dot: #F59E0B;
      --radius-xl: 24px;
      --radius-lg: 18px;
      --radius-md: 14px;
      --radius-sm: 10px;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
      --shadow-md: 0 6px 20px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -2px rgba(15, 23, 42, 0.04);
      --shadow-lg: 0 20px 50px -10px rgba(15, 23, 42, 0.1), 0 8px 20px -4px rgba(15, 23, 42, 0.05);
      --shadow-float: 0 12px 32px -6px rgba(79, 70, 229, 0.35);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--page-bg);
      color: var(--text-main);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    /* ================= TOP NAVBAR ================= */
    .top-navbar {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-subtle);
    }

    .navbar-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 16px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-row {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .brand-logo-icon {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #4F46E5, #0284C7);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 6px 14px var(--primary-glow);
    }

    .brand-title {
      font-size: 21px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #0F172A;
    }

    .brand-title span {
      color: var(--primary);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px;
      list-style: none;
    }

    .nav-links a {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14.5px;
      font-weight: 600;
      transition: color 0.2s;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    .nav-cta-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-ghost {
      padding: 10px 18px;
      background: transparent;
      border: none;
      color: var(--text-main);
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 10px;
      transition: background 0.2s;
    }
    .btn-ghost:hover {
      background: var(--primary-light);
    }

    .btn-primary {
      padding: 11px 20px;
      background: linear-gradient(135deg, #4F46E5, #4338CA);
      border: none;
      color: white;
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
      transition: all 0.2s;
    }
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.45);
    }

    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-main);
    }

    /* ================= HERO SECTION ================= */
    .hero-section {
      max-width: 1280px;
      margin: 0 auto;
      padding: 60px 32px 40px;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 60px;
      align-items: center;
    }

    .hero-left .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: var(--primary-light);
      border-radius: 30px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 20px;
    }

    .hero-left h1 {
      font-size: 52px;
      font-weight: 800;
      letter-spacing: -1.5px;
      line-height: 1.1;
      color: #0F172A;
      margin-bottom: 20px;
    }

    .hero-left h1 span {
      background: linear-gradient(135deg, #4F46E5, #0284C7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-left p.lead {
      font-size: 17px;
      color: var(--text-secondary);
      margin-bottom: 32px;
      max-width: 500px;
      line-height: 1.6;
    }

    .hero-cta-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 36px;
    }

    .btn-large-primary {
      padding: 14px 24px;
      background: linear-gradient(135deg, #4F46E5, #4338CA);
      border: none;
      color: white;
      font-family: inherit;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.35);
      transition: all 0.22s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-large-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(79, 70, 229, 0.5);
    }

    .btn-large-ghost {
      padding: 14px 24px;
      background: white;
      border: 1.5px solid var(--border-card);
      color: var(--text-main);
      font-family: inherit;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 12px;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-large-ghost:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    .trust-strip {
      display: flex;
      align-items: center;
      gap: 24px;
      color: var(--text-muted);
      font-size: 13px;
      font-weight: 600;
    }

    .trust-strip .trust-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .trust-strip svg {
      color: var(--success-text);
    }

    /* ============= HERO RIGHT (Dashboard Preview / Feature Card) ============= */
    .hero-right {
      position: relative;
    }

    /* Primary Upload Card - now a hero card */
    .hero-upload-card {
      background: linear-gradient(160deg, #F0F5FF 0%, #E8EFFF 60%, #F5F3FF 100%);
      border-radius: var(--radius-xl);
      padding: 32px;
      border: 1px solid rgba(79, 70, 229, 0.12);
      box-shadow: var(--shadow-lg);
      position: relative;
      overflow: hidden;
    }

    .hero-upload-card::before {
      content: '';
      position: absolute;
      top: -60px;
      right: -60px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .card-head {
      position: relative;
      z-index: 2;
    }

    .card-tag {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      background: rgba(79, 70, 229, 0.09);
      border-radius: 20px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 12px;
    }

    .card-head h2 {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.5px;
      line-height: 1.25;
    }

    .card-head p {
      font-size: 15px;
      color: var(--text-secondary);
      margin-top: 6px;
      line-height: 1.5;
      font-weight: 500;
    }

    /* 3 Action Buttons Row */
    .action-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr 1fr;
      gap: 12px;
      margin: 24px 0 18px;
      position: relative;
      z-index: 2;
    }

    .action-pill-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 10px 18px;
      border-radius: var(--radius-lg);
      cursor: pointer;
      border: none;
      transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      text-align: center;
      font-family: inherit;
    }

    .action-pill-btn.primary {
      background: linear-gradient(145deg, #4F46E5, #4338CA);
      color: #FFFFFF;
      box-shadow: 0 8px 20px -2px rgba(79, 70, 229, 0.42);
    }
    .action-pill-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px -2px rgba(79, 70, 229, 0.55);
    }
    .action-pill-btn.primary:active {
      transform: translateY(0) scale(0.97);
    }

    .action-pill-btn.secondary {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      color: var(--text-main);
      border: 1px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
    }
    .action-pill-btn.secondary:hover {
      background: #FFFFFF;
      border-color: rgba(79, 70, 229, 0.2);
      transform: translateY(-1px);
    }
    .action-pill-btn.secondary:active {
      transform: translateY(0) scale(0.97);
    }

    .btn-icon-wrapper {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    .action-pill-btn.primary .btn-icon-wrapper {
      background: rgba(255, 255, 255, 0.18);
    }
    .action-pill-btn.secondary .btn-icon-wrapper {
      background: var(--primary-light);
      color: var(--primary);
    }

    .action-title {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: -0.2px;
      line-height: 1.25;
    }
    .action-pill-btn.primary .action-title { color: #FFFFFF; }
    .action-pill-btn.secondary .action-title { color: #1E293B; }

    .popular-chip {
      position: absolute;
      top: -8px;
      background: #10B981;
      color: white;
      font-size: 9.5px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 8px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
    }

    /* Helper Note */
    .upload-helper-note {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 14px;
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(6px);
      border-radius: var(--radius-md);
      border: 1px solid rgba(255, 255, 255, 0.7);
      position: relative;
      z-index: 2;
    }

    .helper-icon {
      color: var(--primary);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .helper-desc {
      font-size: 12.5px;
      color: var(--text-secondary);
      line-height: 1.5;
      font-weight: 500;
    }
    .helper-desc strong {
      color: #334155;
      font-weight: 700;
    }

    /* ============= SECTION WRAPPER ============= */
    .section-wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: 60px 32px;
    }

    .section-heading {
      text-align: center;
      margin-bottom: 40px;
    }

    .section-heading .eyebrow {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      background: var(--primary-light);
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
    }

    .section-heading h2 {
      font-size: 38px;
      font-weight: 800;
      letter-spacing: -1px;
      color: var(--text-main);
      margin-bottom: 12px;
    }

    .section-heading p {
      font-size: 16px;
      color: var(--text-secondary);
      max-width: 620px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* ============= STATS OVERVIEW ============= */
    .stats-preview-section {
      background: white;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
    }

    .stats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .stats-header h3 {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.3px;
    }

    .section-action-link {
      font-size: 14px;
      font-weight: 700;
      color: var(--primary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: opacity 0.2s;
    }
    .section-action-link:hover {
      opacity: 0.7;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .stat-card {
      background: #FFFFFF;
      border: 1px solid var(--border-card);
      border-radius: var(--radius-lg);
      padding: 24px;
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .stat-card:hover {
      border-color: #CBD5E1;
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .stat-icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .stat-card.spent .stat-icon-wrap { background: #EFF6FF; color: #2563EB; }
    .stat-card.saved .stat-icon-wrap { background: #ECFDF5; color: #059669; }
    .stat-card.review .stat-icon-wrap { background: #FFFBEB; color: #D97706; }

    .stat-val {
      font-size: 32px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.8px;
      line-height: 1.1;
    }

    .stat-lbl {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      margin-top: 6px;
    }

    .stat-card.review::after {
      content: '';
      position: absolute;
      top: 20px;
      right: 20px;
      width: 8px;
      height: 8px;
      background: #F59E0B;
      border-radius: 50%;
      box-shadow: 0 0 0 4px #FEF3C7;
    }

    /* ============= RECENT ACTIVITY ============= */
    .activity-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 780px;
      margin: 0 auto;
    }

    .activity-row {
      background: #FFFFFF;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow-sm);
    }
    .activity-row:hover {
      background: #F8FAFC;
      border-color: var(--border-card);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .merchant-avatar {
      width: 50px;
      height: 50px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .merchant-avatar.amazon { background: #FFF7ED; color: #EA580C; border: 1px solid #FFEDD5; }
    .merchant-avatar.apollo { background: #F0FDF4; color: #16A34A; border: 1px solid #DCFCE7; }
    .merchant-avatar.starbucks { background: #F0FDF4; color: #047857; border: 1px solid #D1FAE5; }

    .activity-info {
      flex: 1;
      min-width: 0;
    }
    .activity-top-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .merchant-name {
      font-size: 16px;
      font-weight: 700;
      color: #0F172A;
      letter-spacing: -0.2px;
    }
    .activity-amount {
      font-size: 17px;
      font-weight: 800;
      color: #0F172A;
      letter-spacing: -0.3px;
    }
    .activity-bottom-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1px;
    }
    .status-badge.matched { background: var(--success-bg); color: var(--success-text); }
    .status-badge.needs-bill { background: var(--warning-bg); color: var(--warning-text); }
    .status-badge.verified { background: var(--primary-light); color: var(--primary); }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .status-badge.matched .badge-dot { background: var(--success-dot); }
    .status-badge.needs-bill .badge-dot { background: var(--warning-dot); }
    .status-badge.verified .badge-dot { background: var(--primary); }

    .activity-date {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
    }

    /* ============= FEATURES GRID ============= */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .feature-card {
      background: white;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 32px 28px;
      transition: all 0.25s ease;
      cursor: default;
    }
    .feature-card:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    .feature-icon-box {
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: var(--primary-light);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .feature-card h4 {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 8px;
      letter-spacing: -0.3px;
    }
    .feature-card p {
      font-size: 14.5px;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* ============= CTA STRIP ============= */
    .cta-strip {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px 60px;
    }

    .cta-inner {
      background: linear-gradient(135deg, #4F46E5, #4338CA, #0284C7);
      border-radius: 28px;
      padding: 56px 48px;
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
    }

    .cta-inner::before {
      content: '';
      position: absolute;
      top: -100px;
      right: -100px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.15), transparent);
      border-radius: 50%;
    }
    .cta-inner::after {
      content: '';
      position: absolute;
      bottom: -100px;
      left: -100px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
      border-radius: 50%;
    }

    .cta-inner h2 {
      font-size: 36px;
      font-weight: 800;
      letter-spacing: -1px;
      margin-bottom: 12px;
      position: relative;
    }

    .cta-inner p {
      font-size: 16px;
      opacity: 0.9;
      max-width: 540px;
      margin: 0 auto 28px;
      position: relative;
    }

    .btn-white {
      padding: 14px 28px;
      background: white;
      border: none;
      color: var(--primary);
      font-family: inherit;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      border-radius: 12px;
      transition: all 0.2s;
      position: relative;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    .btn-white:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    }

    /* ============= FOOTER ============= */
    footer {
      background: #0F172A;
      color: #94A3B8;
      padding: 60px 32px 30px;
    }

    .footer-inner {
      max-width: 1280px;
      margin: 0 auto;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr;
      gap: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #1E293B;
    }

    .footer-brand .brand-title {
      color: white;
    }

    .footer-brand p {
      font-size: 14px;
      margin-top: 16px;
      line-height: 1.6;
      max-width: 320px;
    }

    .footer-col h5 {
      color: white;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 20px;
    }

    .footer-col ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-col a {
      color: #94A3B8;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .footer-col a:hover {
      color: white;
    }

    .footer-bottom {
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }

    .socials {
      display: flex;
      gap: 14px;
    }
    .socials a {
      width: 36px;
      height: 36px;
      background: #1E293B;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94A3B8;
      transition: all 0.2s;
    }
    .socials a:hover {
      background: var(--primary);
      color: white;
    }

    /* ============= TOAST NOTIFICATION ============= */
    .toast-notification {
      position: fixed;
      top: 90px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: #0F172A;
      color: #FFFFFF;
      padding: 12px 22px;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .toast-notification.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    /* ============= MODAL SHEET ============= */
    .sheet-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(6px);
      z-index: 150;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .sheet-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .bottom-sheet {
      background: #FFFFFF;
      border-radius: 24px;
      padding: 28px;
      transform: scale(0.9);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 440px;
      width: 100%;
    }
    .sheet-overlay.active .bottom-sheet {
      transform: scale(1);
    }

    .sheet-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .sheet-header h4 {
      font-size: 20px;
      font-weight: 800;
      color: #0F172A;
    }

    .close-sheet-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #F1F5F9;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748B;
      font-size: 14px;
    }

    .scanner-viewfinder {
      height: 240px;
      background: #0F172A;
      border-radius: 18px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #94A3B8;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .scanner-laser {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #6366F1, transparent);
      box-shadow: 0 0 12px #6366F1;
      animation: scanAnim 2.2s ease-in-out infinite;
    }

    @keyframes scanAnim {
      0% { top: 10%; }
      50% { top: 85%; }
      100% { top: 10%; }
    }

    .scanner-frame-corners {
      width: 200px;
      height: 160px;
      border: 2px dashed rgba(255, 255, 255, 0.4);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .hero-section {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 40px 24px;
      }
      .hero-left h1 {
        font-size: 40px;
      }
      .features-grid, .summary-grid {
        grid-template-columns: 1fr;
      }
      .footer-top {
        grid-template-columns: 1fr 1fr;
      }
      .nav-links {
        display: none;
      }
      .mobile-menu-toggle {
        display: block;
      }
      .cta-inner {
        padding: 40px 24px;
      }
      .cta-inner h2 {
        font-size: 28px;
      }
      .section-heading h2 {
        font-size: 28px;
      }
      .section-wrap {
        padding: 40px 24px;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 16px;
      }
    }

    @media (max-width: 560px) {
      .action-grid {
        grid-template-columns: 1fr;
      }
      .navbar-inner {
        padding: 14px 20px;
      }
      .nav-cta-group .btn-ghost {
        display: none;
      }
    }
  </style>
</head>
<body>

  <!-- Toast Notification -->
  <div class="toast-notification" id="toast">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span id="toast-text">Bill uploaded successfully!</span>
  </div>

  <!-- ================= TOP NAVBAR ================= -->
  <nav class="top-navbar">
    <div class="navbar-inner">
      <a href="#" class="brand-row">
        <div class="brand-logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2 4-2.5V8z"></path>
            <path d="M14 2v6h6"></path>
            <path d="M9 13h6"></path>
            <path d="M9 17h3"></path>
          </svg>
        </div>
        <div class="brand-title">Fix<span>My</span>Bill</div>
      </a>

      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#activity">Activity</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#help">Help</a></li>
      </ul>

      <div class="nav-cta-group">
        <button class="btn-ghost" onclick="showToast('Sign in modal opening...')">Sign in</button>
        <button class="btn-primary" onclick="showToast('Free trial started — no credit card needed!')">Get Started</button>
        <button class="mobile-menu-toggle" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- ================= HERO SECTION ================= -->
  <section class="hero-section">
    <div class="hero-left">
      <div class="eyebrow">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Good morning, Aditya
      </div>
      <h1>Your bills and payments, <span>organized.</span></h1>
      <p class="lead">FixMyBill automatically captures, matches, and organizes every receipt, invoice, and payment screenshot — so you never lose track of money again.</p>

      <div class="hero-cta-row">
        <button class="btn-large-primary" onclick="openCameraSheet()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          Scan Your First Bill
        </button>
        <button class="btn-large-ghost" onclick="showToast('▶ Product demo would play here')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Watch Demo
        </button>
      </div>

      <div class="trust-strip">
        <div class="trust-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          256-bit encrypted
        </div>
        <div class="trust-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          RBI Compliant
        </div>
        <div class="trust-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Free forever plan
        </div>
      </div>
    </div>

    <div class="hero-right">
      <!-- Primary Upload Card -->
      <div class="hero-upload-card">
        <div class="card-head">
          <div class="card-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Auto-Sync Active
          </div>
          <h2>Add a new expense</h2>
          <p>Upload a bill, payment screenshot, or add it manually.</p>
        </div>

        <div class="action-grid">
          <button class="action-pill-btn primary" onclick="openCameraSheet()">
            <div class="popular-chip">Fast</div>
            <div class="btn-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
            <span class="action-title">Open Camera</span>
          </button>

          <button class="action-pill-btn secondary" onclick="openUploadSheet()">
            <div class="btn-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <span class="action-title">Upload File</span>
          </button>

          <button class="action-pill-btn secondary" onclick="openManualSheet()">
            <div class="btn-icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
            <span class="action-title">Add Manually</span>
          </button>
        </div>

        <div class="upload-helper-note">
          <svg class="helper-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <div class="helper-desc">
            Supports receipts, invoices, PDFs, <strong>PhonePe</strong>, <strong>GPay</strong>, <strong>Paytm</strong>, and bank-payment screenshots.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= THIS MONTH STATS ================= -->
  <section class="stats-preview-section">
    <div class="section-wrap">
      <div class="stats-header">
        <h3>This month at a glance</h3>
        <a href="#" class="section-action-link" onclick="showToast('Filtering for August 2024'); return false;">
          August 2024
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </a>
      </div>

      <div class="summary-grid">
        <div class="stat-card spent" onclick="showToast('Total month spend: ₹24,850')">
          <div class="stat-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div class="stat-val">₹24,850</div>
          <div class="stat-lbl">Total spent</div>
        </div>

        <div class="stat-card saved" onclick="showToast('18 bills safely stored & searchable')">
          <div class="stat-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2 4-2.5V8z"></path>
              <path d="M14 2v6h6"></path>
            </svg>
          </div>
          <div class="stat-val">18</div>
          <div class="stat-lbl">Bills saved</div>
        </div>

        <div class="stat-card review" onclick="showToast('3 transactions need bill attachments')">
          <div class="stat-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="stat-val">3</div>
          <div class="stat-lbl">Needs review</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= RECENT ACTIVITY ================= -->
  <section class="section-wrap" id="activity">
    <div class="section-heading">
      <div class="eyebrow">Recent Activity</div>
      <h2>Every transaction, neatly matched.</h2>
      <p>See your bills and payments automatically connected. Any missing receipts get flagged, so nothing slips through the cracks.</p>
    </div>

    <div class="activity-container">

      <div class="activity-row" onclick="showToast('Amazon — ₹1,299: Invoice & UPI matched')">
        <div class="merchant-avatar amazon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <div class="activity-info">
          <div class="activity-top-line">
            <span class="merchant-name">Amazon</span>
            <span class="activity-amount">₹1,299</span>
          </div>
          <div class="activity-bottom-line">
            <span class="status-badge matched">
              <span class="badge-dot"></span>
              Bill + payment matched
            </span>
            <span class="activity-date">Today</span>
          </div>
        </div>
      </div>

      <div class="activity-row" onclick="showToast('Apollo Hospital: Please attach pharmacy invoice')">
        <div class="merchant-avatar apollo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div class="activity-info">
          <div class="activity-top-line">
            <span class="merchant-name">Apollo Hospital</span>
            <span class="activity-amount">₹2,450</span>
          </div>
          <div class="activity-bottom-line">
            <span class="status-badge needs-bill">
              <span class="badge-dot"></span>
              Payment proof needs bill
            </span>
            <span class="activity-date">Yesterday</span>
          </div>
        </div>
      </div>

      <div class="activity-row" onclick="showToast('Starbucks: Verified receipt')">
        <div class="merchant-avatar starbucks">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        </div>
        <div class="activity-info">
          <div class="activity-top-line">
            <span class="merchant-name">Starbucks</span>
            <span class="activity-amount">₹420</span>
          </div>
          <div class="activity-bottom-line">
            <span class="status-badge verified">
              <span class="badge-dot"></span>
              Bill verified
            </span>
            <span class="activity-date">24 Aug</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ================= FEATURES ================= -->
  <section class="section-wrap" id="features" style="background: white; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); max-width: 100%;">
    <div style="max-width: 1280px; margin: 0 auto;">
      <div class="section-heading">
        <div class="eyebrow">Features</div>
        <h2>Built for how you actually spend.</h2>
        <p>Whether it's a quick UPI payment, an invoice PDF, or a paper receipt — we handle it all with intelligence and care.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
          <h4>Smart Scan</h4>
          <p>Point your camera at any receipt or invoice. Our AI extracts amount, merchant, date, and category in seconds.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <h4>Auto-Match Payments</h4>
          <p>PhonePe, GPay, Paytm and bank screenshots get automatically matched to your bills — no double entry, no confusion.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h4>Bank-Grade Security</h4>
          <p>End-to-end 256-bit encryption and RBI-aligned compliance. Your financial data never leaves your control.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= CTA STRIP ================= -->
  <section class="cta-strip">
    <div class="cta-inner">
      <h2>Ready to fix your bills for good?</h2>
      <p>Join 50,000+ Indians who never worry about lost receipts, missing bills, or reimbursement chaos again.</p>
      <button class="btn-white" onclick="showToast('Welcome to FixMyBill! Free plan activated.')">Get Started — It's Free</button>
    </div>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#" class="brand-row">
            <div class="brand-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2 4-2.5V8z"></path>
                <path d="M14 2v6h6"></path>
              </svg>
            </div>
            <div class="brand-title">Fix<span>My</span>Bill</div>
          </a>
          <p>The simplest way to keep every bill, payment, and receipt organized in one secure place.</p>
        </div>

        <div class="footer-col">
          <h5>Product</h5>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Download App</a></li>
            <li><a href="#">Integrations</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Legal</h5>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Compliance</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>© 2024 FixMyBill Technologies. Made with 💙 in Bengaluru.</div>
        <div class="socials">
          <a href="#" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
          <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Modal Sheet -->
  <div class="sheet-overlay" id="sheet-overlay" onclick="closeSheet(event)">
    <div class="bottom-sheet" onclick="event.stopPropagation()">
      <div class="sheet-header">
        <h4 id="sheet-title">Scan Bill or Receipt</h4>
        <button class="close-sheet-btn" onclick="closeSheet()">✕</button>
      </div>
      <div id="sheet-body-content"></div>
    </div>
  </div>

  <script>
    let toastTimer;
    function showToast(text) {
      const toast = document.getElementById('toast');
      const toastText = document.getElementById('toast-text');
      toastText.innerText = text;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 2800);
    }

    const sheetOverlay = document.getElementById('sheet-overlay');
    const sheetTitle = document.getElementById('sheet-title');
    const sheetBody = document.getElementById('sheet-body-content');

    function openCameraSheet() {
      sheetTitle.innerText = "Smart Bill Scanner";
      sheetBody.innerHTML = \`
        <div class="scanner-viewfinder">
          <div class="scanner-laser"></div>
          <div class="scanner-frame-corners">
            <span style="font-size: 13px; color: #CBD5E1; text-align: center; padding: 10px;">Align bill or payment screenshot</span>
          </div>
        </div>
        <button class="action-pill-btn primary" style="width: 100%; padding: 16px;" onclick="simulateCapture()">
          <span class="action-title" style="font-size: 15px;">📸 Snap & Auto-Extract Details</span>
        </button>
      \`;
      sheetOverlay.classList.add('active');
    }

    function openUploadSheet() {
      sheetTitle.innerText = "Upload Bill or Screenshot";
      sheetBody.innerHTML = \`
        <div style="border: 2px dashed #CBD5E1; border-radius: 16px; padding: 40px 20px; text-align: center; margin-bottom: 20px; background: #F8FAFC;">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" style="margin: 0 auto 12px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          <div style="font-size: 15px; font-weight: 700; color: #0F172A;">Drop files here or browse</div>
          <div style="font-size: 13px; color: #64748B; margin-top: 6px;">PDF, PNG, JPG from PhonePe, GPay, Paytm</div>
        </div>
        <button class="action-pill-btn primary" style="width: 100%; padding: 16px;" onclick="simulateUpload()">
          <span class="action-title" style="font-size: 15px;">Choose from Gallery / Files</span>
        </button>
      \`;
      sheetOverlay.classList.add('active');
    }

    function openManualSheet() {
      sheetTitle.innerText = "Add Expense Manually";
      sheetBody.innerHTML = \`
        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
          <div>
            <label style="font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase;">Merchant / Payee</label>
            <input type="text" placeholder="e.g. Swiggy, Uber, Rent" style="width: 100%; padding: 13px; border-radius: 12px; border: 1px solid #CBD5E1; font-family: inherit; font-size: 14px; margin-top: 6px; outline: none;">
          </div>
          <div style="display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase;">Amount (₹)</label>
              <input type="number" placeholder="₹ 0.00" style="width: 100%; padding: 13px; border-radius: 12px; border: 1px solid #CBD5E1; font-family: inherit; font-size: 14px; margin-top: 6px; outline: none;">
            </div>
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase;">Category</label>
              <select style="width: 100%; padding: 13px; border-radius: 12px; border: 1px solid #CBD5E1; font-family: inherit; font-size: 14px; margin-top: 6px; background: white; outline: none;">
                <option>Shopping</option>
                <option>Health</option>
                <option>Dining</option>
                <option>Utilities</option>
              </select>
            </div>
          </div>
        </div>
        <button class="action-pill-btn primary" style="width: 100%; padding: 16px;" onclick="simulateCapture('Manual entry saved!')">
          <span class="action-title" style="font-size: 15px;">Save Expense</span>
        </button>
      \`;
      sheetOverlay.classList.add('active');
    }

    function closeSheet(e) {
      if (e) e.stopPropagation();
      sheetOverlay.classList.remove('active');
    }

    function simulateCapture(msg) {
      closeSheet();
      showToast(msg || '⚡ Bill scanned! Amount ₹540 matched with UPI');
    }

    function simulateUpload() {
      closeSheet();
      showToast('📄 GPay screenshot imported & verified');
    }
  </script>
</body>
</html>`;

document.open();
document.write(pageContent);
document.close();