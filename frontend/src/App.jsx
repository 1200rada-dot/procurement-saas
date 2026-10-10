import { useEffect, useMemo, useState } from 'react';

const demoCredentials = {
  email: 'admin@procurement.local',
  password: '123456',
};

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('procurementToken') || '');
  const [loginData, setLoginData] = useState(demoCredentials);
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [reportData, setReportData] = useState({});
  const [error, setError] = useState('');

  const fetchJson = async (url, authToken = token) => {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Request failed');
    }

    return res.json();
  };

  useEffect(() => {
    if (!token) return;

    const loadDashboard = async () => {
      try {
        const [data, reports] = await Promise.all([
          fetchJson('/api/dashboard'),
          fetchJson('/api/reports/kpis'),
        ]);

        setDashboard(data);
        setReportData(reports);
        setUser({ role: data.user.role, fullName: data.user.fullName });
      } catch (err) {
        setError('Session expired or backend is unavailable');
        setToken('');
        localStorage.removeItem('procurementToken');
      }
    };

    loadDashboard();
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Login failed');
      }

      localStorage.setItem('procurementToken', payload.token);
      setToken(payload.token);
      setUser(payload.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('procurementToken');
    setToken('');
    setDashboard(null);
    setReportData({});
    setUser(null);
  };

  const metrics = dashboard?.metrics || {};
  const vendors = dashboard?.vendors || [];
  const inventory = dashboard?.inventory || [];
  const purchases = dashboard?.purchases || [];

  const supplierAging = reportData?.supplierAging || [];
  const inventoryTurnover = reportData?.inventoryTurnover || [];
  const productPricing = reportData?.productPricing || [];
  const supplierComparison = reportData?.supplierComparison || [];

  if (!token) {
    return (
      <div className="app-shell">
        <div className="login-card">
          <h2>Procurement SaaS</h2>
          <p>Login to access the purchasing dashboard.</p>
          <form onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData((state) => ({ ...state, email: e.target.value }))}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData((state) => ({ ...state, password: e.target.value }))}
              />
            </label>
            {error && <div style={{ color: '#b91c1c', fontWeight: 600 }}>{error}</div>}
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div className="brand">Procurement SaaS</div>
          <div style={{ color: '#475569' }}>Operations dashboard</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="role-badge">{user?.role || 'user'}</span>
          <button className="secondary-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Inventory value</div>
          <div className="metric-value">EGP {metrics.totalStockValue?.toLocaleString() || 0}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">This month purchases</div>
          <div className="metric-value">EGP {metrics.totalPurchases?.toLocaleString() || 0}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Supplier outstanding</div>
          <div className="metric-value">EGP {metrics.openInvoices?.toLocaleString() || 0}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Inventory turnover</div>
          <div className="metric-value">{metrics.inventoryTurnover || 0}</div>
        </div>
      </div>

      <div className="grid-two">
        <div className="panel">
          <h3>Top suppliers</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Supplier</th><th>Outstanding</th><th>Rating</th></tr>
              </thead>
              <tbody>
                {vendors.length ? vendors.map((vendor) => (
                  <tr key={vendor.id}><td>{vendor.name}</td><td>EGP {vendor.outstandingBalance?.toLocaleString()}</td><td>{vendor.rating}</td></tr>
                )) : <tr><td colSpan="3" className="empty-state">No supplier data available</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h3>Purchase KPI</h3>
          <div className="table-wrap">
            <table>
              <tbody>
                <tr><td>Top supplier</td><td>{metrics.topSupplier || 'N/A'}</td></tr>
                <tr><td>Supplier turnover</td><td>{metrics.supplierTurnover || 0}</td></tr>
                <tr><td>Overdue balance</td><td>EGP {metrics.overdueBalance?.toLocaleString() || 0}</td></tr>
                <tr><td>Warehouses</td><td>{metrics.warehouseCount || 0}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid-two" style={{ marginTop: 18 }}>
        <div className="panel">
          <h3>Inventory turnover</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Product</th><th>Turnover</th><th>Value</th></tr>
              </thead>
              <tbody>
                {inventoryTurnover.length ? inventoryTurnover.map((item) => (
                  <tr key={item.productName}><td>{item.productName}</td><td>{item.turnover}</td><td>EGP {item.totalValue?.toLocaleString()}</td></tr>
                )) : <tr><td colSpan="3" className="empty-state">No turnover data</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h3>Supplier aging</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Supplier</th><th>Current</th><th>Overdue</th></tr>
              </thead>
              <tbody>
                {supplierAging.length ? supplierAging.map((item) => (
                  <tr key={item.vendorName}><td>{item.vendorName}</td><td>EGP {item.current?.toLocaleString()}</td><td>EGP {item.over90?.toLocaleString()}</td></tr>
                )) : <tr><td colSpan="3" className="empty-state">No aging data</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid-two" style={{ marginTop: 18 }}>
        <div className="panel">
          <h3>Product pricing analysis</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Product</th><th>Avg cost</th><th>Market</th><th>Best price</th></tr>
              </thead>
              <tbody>
                {productPricing.length ? productPricing.map((item) => (
                  <tr key={item.productName}><td>{item.productName}</td><td>EGP {item.averageCost}</td><td>EGP {item.marketAverage}</td><td>EGP {item.lowestVendorPrice}</td></tr>
                )) : <tr><td colSpan="4" className="empty-state">No pricing data</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h3>Supplier comparison</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Supplier</th><th>Terms</th><th>Outstanding</th></tr>
              </thead>
              <tbody>
                {supplierComparison.length ? supplierComparison.map((item) => (
                  <tr key={item.vendorName}><td>{item.vendorName}</td><td>{item.defaultTerms}</td><td>EGP {item.outstandingBalance?.toLocaleString()}</td></tr>
                )) : <tr><td colSpan="3" className="empty-state">No supplier comparison</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
