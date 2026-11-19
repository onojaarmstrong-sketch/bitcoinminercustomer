import React, { useMemo, useState } from "react";
import { NavLink, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  Bell, ChevronDown, ChevronRight, CircleDollarSign, Download, Landmark, Languages,
  LayoutDashboard, LockKeyhole, Menu, MessageSquareText, Search, Settings, ShieldCheck,
  SlidersHorizontal, UserRound, WalletCards, X, ArrowUpRight, ArrowDownLeft,
  Bitcoin, Clock3, AlertTriangle, LogOut
} from "lucide-react";

const account = {
  name: "Nathan Van Atkisson",
  balance: "$1,629,274.50",
  credits: "$1,827,610.00",
  debits: "$310,025.00",
  status: "Inactive"
};

const transactions = [
  { id: "MHR-23102024-001", date: "23 Oct 2024", time: "09:42 AM", description: "Miner Host", amount: "$503,614.64", type: "Credit", status: "Historical Record", direction: "in" },
  { id: "DEP-18092024-004", date: "18 Sep 2024", time: "02:16 PM", description: "BTC Account Deposit", amount: "$12,480.00", type: "Credit", status: "Completed", direction: "in" },
  { id: "WDR-09082024-011", date: "09 Aug 2024", time: "11:05 AM", description: "Mining Wallet Transfer", amount: "$18,750.00", type: "Debit", status: "Completed", direction: "out" },
  { id: "MGR-21072024-003", date: "21 Jul 2024", time: "04:38 PM", description: "Mining Rewards Payout", amount: "$26,940.25", type: "Credit", status: "Historical Record", direction: "in" }
];

function Brand() {
  return (
    <div className="brand" aria-label="BitcoinminerCustomer">
      <div className="brand-mark"><Bitcoin size={23} strokeWidth={2.4} /></div>
      <div><strong>BITCOINMINER</strong><span>CUSTOMER</span></div>
    </div>
  );
}

function Shell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    ["/", LayoutDashboard, "Dashboard"],
    ["/transactions", WalletCards, "Transactions"],
    ["/deposit", ArrowDownLeft, "Deposit"],
    ["/transfer", ArrowUpRight, "Transfer"],
    ["/miner-account", CircleDollarSign, "Miner Account"],
    ["/profile", UserRound, "Profile"],
    ["/settings", Settings, "Settings"],
    ["/notifications", Bell, "Notifications"]
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-head"><Brand /><button className="icon-button close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(([to, Icon, label]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <Icon size={18} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="account-tag"><ShieldCheck size={15} /><span>SECURE ACCOUNT</span></div>
      </aside>

      {menuOpen && <button className="menu-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="topbar-title">
            <span>Private client account</span>
            <strong>{account.name}</strong>
          </div>
          <div className="top-actions">
            <div className="language-wrap">
              <button className="icon-button language-button" onClick={() => setLangOpen(!langOpen)} aria-label="Language"><Languages size={19} /><span>EN</span></button>
              {langOpen && <div className="language-menu"><button onClick={() => setLangOpen(false)}>English</button><button onClick={() => setLangOpen(false)}>Deutsch</button><button onClick={() => setLangOpen(false)}>Español</button></div>}
            </div>
            <button className="icon-button notification-button" onClick={() => navigate("/notifications")} aria-label="Notifications"><Bell size={19} /><i /></button>
            <button className="profile-chip" onClick={() => navigate("/profile")} aria-label="Open profile"><img src="/nathan-photo.jpeg" alt="Nathan Van Atkisson" /><ChevronDown size={15} /></button>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

function PageHeader({ eyebrow, title, action }) {
  return (
    <div className="page-header">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>
      {action}
    </div>
  );
}

function StatusBadge({ status }) {
  const label = status || "Unknown";
  return <span className={`status-badge ${label.toLowerCase().includes("inactive") ? "warning" : ""}`}><i />{label}</span>;
}

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader eyebrow="ACCOUNT OVERVIEW" title="Good morning, Nathan" />
      <section className="balance-card">
        <div className="balance-main">
          <div className="balance-label"><span>AVAILABLE BALANCE</span><StatusBadge status="Inactive" /></div>
          <strong>{account.balance}</strong>
          <p>USD · Personal mining account</p>
          <div className="balance-actions">
            <button className="primary-button" onClick={() => navigate("/deposit")}><ArrowDownLeft size={17} />Deposit</button>
            <button className="secondary-button" onClick={() => navigate("/transfer")}><ArrowUpRight size={17} />Transfer</button>
          </div>
        </div>
        <div className="balance-chart" aria-label="Account activity chart">
          <div className="chart-bars">{[32,48,40,68,52,76,58,88,72,94].map((height, i) => <span key={i} style={{ height: `${height}%` }} />)}</div>
        </div>
      </section>

      <section className="summary-grid">
        <article className="summary-card"><div className="summary-icon credit"><ArrowDownLeft /></div><div><span>Total credits</span><strong>{account.credits}</strong></div><small>+12.8% from last period</small></article>
        <article className="summary-card"><div className="summary-icon debit"><ArrowUpRight /></div><div><span>Total debits</span><strong>{account.debits}</strong></div><small>Historical account activity</small></article>
        <article className="summary-card"><div className="summary-icon"><ShieldCheck /></div><div><span>Account status</span><strong>Inactive</strong></div><small>Review required</small></article>
      </section>

      <section className="notice-card">
        <div className="notice-icon"><AlertTriangle /></div>
        <div><span>MINER ACCOUNT RE-REGISTRATION</span><p>Confirm your miner details and submit an updated registration before account activity can be reviewed.</p></div>
        <button className="text-button" onClick={() => navigate("/miner-account")}>Review <ChevronRight size={16} /></button>
      </section>

      <section className="panel">
        <div className="panel-header"><div><p className="eyebrow">RECENT ACTIVITY</p><h2>Recent transactions</h2></div><button className="text-button" onClick={() => navigate("/transactions")}>View all <ChevronRight size={16} /></button></div>
        <TransactionTable data={transactions.slice(0, 4)} />
      </section>
    </>
  );
}

function TransactionTable({ data }) {
  const navigate = useNavigate();
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Transaction</th><th>Date</th><th>Amount</th><th>Type</th><th>Status</th><th /></tr></thead>
        <tbody>{data.map((item) => (
          <tr key={item.id} onClick={() => navigate(`/transactions/${item.id}`)}>
            <td><div className="transaction-name"><span className={item.direction === "in" ? "in" : "out"}>{item.direction === "in" ? <ArrowDownLeft /> : <ArrowUpRight />}</span><div><strong>{item.description}</strong><small>{item.id}</small></div></div></td>
            <td>{item.date}<small>{item.time}</small></td>
            <td className={item.direction === "in" ? "amount-in" : ""}>{item.amount}</td>
            <td>{item.type}</td>
            <td><span className="table-status">{item.status}</span></td>
            <td><ChevronRight size={16} /></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function Transactions() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => transactions.filter((item) =>
    (filter === "All" || item.type === filter) &&
    `${item.description} ${item.id}`.toLowerCase().includes(query.toLowerCase())
  ), [query, filter]);
  return (
    <>
      <PageHeader eyebrow="ACCOUNT HISTORY" title="Transaction history" />
      <section className="panel">
        <div className="filters">
          <label className="search-box"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search transactions or reference" /></label>
          <label className="select-box"><SlidersHorizontal size={16} /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option><option>Credit</option><option>Debit</option></select></label>
        </div>
        {filtered.length ? <TransactionTable data={filtered} /> : <div className="empty-state">No matching transactions.</div>}
      </section>
    </>
  );
}

function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const transaction = transactions.find((item) => item.id === id) || transactions[0];
  return (
    <>
      <button className="back-button" onClick={() => navigate("/transactions")}>← Back to transactions</button>
      <PageHeader eyebrow="TRANSACTION DETAILS" title={transaction.description} />
      <section className="detail-layout">
        <article className="panel detail-card"><div className={`detail-icon ${transaction.direction}`}><ArrowDownLeft /></div><p>Transaction amount</p><h2>{transaction.amount}</h2><StatusBadge status={transaction.status} /><dl><div><dt>Reference</dt><dd>{transaction.id}</dd></div><div><dt>Date</dt><dd>{transaction.date} · {transaction.time}</dd></div><div><dt>Type</dt><dd>{transaction.type}</dd></div></dl></article>
        <article className="panel detail-side"><h3>Transaction information</h3><dl><div><dt>Account holder</dt><dd>{account.name}</dd></div><div><dt>Account name</dt><dd>{account.name}</dd></div><div><dt>Currency</dt><dd>US Dollars (USD)</dd></div><div><dt>Record type</dt><dd>Historical account record</dd></div></dl><div className="info-banner"><ShieldCheck size={18} /><span>Account record for review and account-history purposes.</span></div></article>
      </section>
    </>
  );
}

function Deposit() {
  return (
    <>
      <PageHeader eyebrow="FUNDING CENTER" title="Deposit" />
      <section className="two-column">
        <article className="panel deposit-card"><div className="panel-header"><div><p className="eyebrow">ACCOUNT DEPOSIT</p><h2>Deposit overview</h2></div><Bitcoin className="btc-icon" /></div><div className="deposit-unavailable"><Clock3 /><div><strong>Transactions pending review</strong><span>All account transactions remain pending while miner confirmation and re-registration are under review. Thank you for your patience.</span></div></div><div className="deposit-info"><div><span>Account status</span><strong>Inactive</strong></div><div><span>Transaction status</span><strong>Pending review</strong></div><div><span>Next step</span><strong>Miner confirmation</strong></div></div><div className="info-banner"><ShieldCheck size={18} /><span>Submit your re-registration request to begin the account review.</span></div></article>
        <aside className="panel steps-card"><h3>Re-registration steps</h3>{["Confirm your miner account details.","Submit the re-registration request.","Wait for the account review.","All transactions remain pending until approval."].map((step,i)=><div className="step" key={step}><span>{i+1}</span><p>{step}</p></div>)}</aside>
      </section>
      <section className="panel"><div className="panel-header"><div><p className="eyebrow">HISTORY</p><h2>Deposit history</h2></div></div><div className="history-empty"><Download /><div><strong>No deposit activity recorded</strong><span>Deposit activity will appear here after account review.</span></div></div></section>
    </>
  );
}

function Transfer() {
  return (
    <>
      <PageHeader eyebrow="FUNDS MOVEMENT" title="Transfer" />
      <section className="account-overview-strip"><div><span>Available balance</span><strong>{account.balance}</strong></div><div><span>Account status</span><strong>Inactive</strong></div></section>
      <section className="two-column">
        <article className="panel transfer-form"><h2>Withdrawal information</h2><label><span>Destination wallet address</span><input placeholder="Available after account review" disabled /></label><label><span>Amount (USD)</span><input placeholder="Unavailable while account is inactive" disabled /></label><div className="review-box"><h3>Transaction review</h3><div><span>Status</span><strong>Account review required</strong></div></div><button className="primary-button full" disabled>Transfers unavailable</button><div className="info-banner"><ShieldCheck size={18} /><span>Complete miner confirmation and re-registration, then wait for authorized approval.</span></div></article>
        <aside className="panel inactivity-card"><div className="notice-icon"><LockKeyhole /></div><h3>Account re-registration required</h3><p>Confirm your miner details and submit an updated registration before account activity can be reviewed.</p><NavLink className="text-button" to="/miner-account">Start re-registration <ChevronRight size={16} /></NavLink></aside>
      </section>
      <section className="panel"><div className="panel-header"><div><p className="eyebrow">TRANSFER HISTORY</p><h2>Recent transfers</h2></div></div><div className="history-empty"><WalletCards /><div><strong>No transfer requests initiated</strong><span>Transfer activity will appear here after review.</span></div></div></section>
    </>
  );
}

function MinerAccount() {
  const navigate = useNavigate();
  const [minerReference, setMinerReference] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <button className="back-button" onClick={() => navigate("/")}>← Back to dashboard</button>
      <PageHeader eyebrow="MINER ACCOUNT" title="Miner confirmation & re-registration" />
      <section className="registration-hero"><div><span>ACCOUNT STATUS</span><h2>Inactive</h2><p>Miner confirmation and re-registration are required for an account review.</p></div><div className="registration-status"><StatusBadge status="Inactive" /><span>Review status</span><strong>{submitted ? "Request received" : "Re-registration required"}</strong></div></section>
      <section className="two-column">
        <form className="panel registration-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <h2>Miner confirmation</h2>
          <p>Confirm the account details and submit a re-registration request for review.</p>
          <label><span>Miner name</span><input value={account.name} readOnly /></label>
          <label><span>Miner account reference</span><input value={minerReference} onChange={(event) => setMinerReference(event.target.value)} placeholder="Enter your miner account reference" required /></label>
          <label className="confirm-check"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span>I confirm that I am the miner associated with these account details.</span></label>
          <button className="primary-button full" type="submit" disabled={!minerReference.trim() || !confirmed}>Submit re-registration</button>
          {submitted && <div className="info-banner" role="status"><ShieldCheck size={18} /><span>Your request is recorded in this session for review. The account remains inactive until an authorized account reviewer approves it.</span></div>}
        </form>
        <aside className="panel inactivity-card"><div className="notice-icon"><AlertTriangle /></div><h3>Account activity notice</h3><p>Submitting this form does not reactivate the account or enable transfers. Approval must be completed by an authorized account reviewer.</p><div className="account-holder-mini"><span>Account holder</span><strong>{account.name}</strong></div></aside>
      </section>
      <section className="panel"><div className="panel-header"><div><p className="eyebrow">ACCOUNT HISTORY</p><h2>Re-registration history</h2></div></div><div className="history-empty"><Clock3 /><div><strong>{submitted ? "Request received for review" : "No re-registration request submitted"}</strong><span>{submitted ? "The account remains inactive while review is pending." : "Submit the confirmation above to start an account review."}</span></div></div></section>
    </>
  );
}

function Profile() {
  const [language, setLanguage] = useState("English");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  return (
    <>
      <PageHeader eyebrow="ACCOUNT CENTER" title="Profile & account settings" />
      <section className="profile-layout">
        <aside className="panel profile-card"><div className="avatar-large"><img src="/nathan-photo.jpeg" alt="Nathan Van Atkisson" /></div><h2>{account.name}</h2><p>Private client account</p><StatusBadge status="Inactive" /></aside>
        <div className="profile-settings">
          <section className="panel settings-section"><h3>Profile information</h3><div className="form-grid"><label><span>Client name</span><input value={account.name} readOnly /></label><label><span>Account name</span><input value={account.name} readOnly /></label><label><span>Email preference</span><input value="nathan.van@example.com" readOnly /></label></div></section>
          <section className="panel settings-section"><h3>Account preferences</h3><div className="setting-row"><div><strong>Language</strong><span>Choose your display language</span></div><select value={language} onChange={(e)=>setLanguage(e.target.value)}><option>English</option><option>Deutsch</option><option>Español</option></select></div><div className="setting-row"><div><strong>Email notifications</strong><span>Receive account and activity updates</span></div><button className={`toggle ${emailAlerts?"on":""}`} onClick={()=>setEmailAlerts(!emailAlerts)} aria-label="Toggle email notifications"><i /></button></div></section>
          <section className="panel settings-section"><h3>Security settings</h3><div className="setting-row"><div><strong>Security alerts</strong><span>Notify me about account changes</span></div><button className={`toggle ${securityAlerts?"on":""}`} onClick={()=>setSecurityAlerts(!securityAlerts)} aria-label="Toggle security alerts"><i /></button></div><button className="secondary-button"><LockKeyhole size={17} />Change security PIN</button></section>
        </div>
      </section>
    </>
  );
}

function Notifications() {
  const items = [
    { icon: AlertTriangle, title: "Account inactivity", text: "Your account is marked inactive and requires review.", time: "Today, 9:24 AM", tone: "warning" },
    { icon: ShieldCheck, title: "Miner re-registration", text: "Confirm your miner account details and submit an updated registration for review.", time: "Today, 8:10 AM", tone: "warning" },
    { icon: WalletCards, title: "Historical transaction", text: "Miner Host credit of $503,614.64 was added to the account history.", time: "23 Oct 2024", tone: "credit" },
    { icon: Download, title: "Deposit update", text: "The Bitcoin deposit is awaiting account review.", time: "18 Sep 2024", tone: "credit" },
    { icon: ShieldCheck, title: "Account activity", text: "No account activity has been processed recently.", time: "15 Sep 2024", tone: "neutral" }
  ];
  return (
    <>
      <PageHeader eyebrow="UPDATES CENTER" title="Notifications" action={<button className="secondary-button">Mark all as read</button>} />
      <section className="panel notification-list">{items.map(({icon:Icon,title,text,time,tone})=>(
        <article className="notification-item" key={title}><div className={`notification-icon ${tone}`}><Icon /></div><div><h3>{title}</h3><p>{text}</p></div><time>{time}</time><button className="icon-button" aria-label={`Open ${title}`}><ChevronRight /></button></article>
      ))}</section>
    </>
  );
}

function SettingsPage() {
  return (
    <Profile />
  );
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:id" element={<TransactionDetail />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/miner-account" element={<MinerAccount />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
