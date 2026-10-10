import { useEffect, useState } from 'react';

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
  const [error, setError] = useState('');

  const fetchJson = async (url) => {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
        const data = await fetchJson('/api/dashboard');
        setDashboard(data);
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
    setUser(null);
  };

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

  const metrics = dashboard?.metrics || {};
  const vendors = dashboard?.vendors || [];
  const inventory = dashboard?.inventory || [];
  const purchases = dashboard?.purchases || [];

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
                <tr>
                  <th>Supplier</th>
                  <th>Outstanding</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {vendors.length ? (
                  vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>{vendor.name}</td>
                      <td>EGP {vendor.outstandingBalance?.toLocaleString()}</td>
                      <td>{vendor.rating}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-state">No supplier data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h3>Purchase KPI</h3>
          <div className="table-wrap">
            <table>
              <tbody>
                <tr>
                  <td>Top supplier</td>
                  <td>{metrics.topSupplier || 'N/A'}</td>
                </tr>
                <tr>
                  <td>Supplier turnover</td>
                  <td>{metrics.supplierTurnover || 0}</td>
                </tr>
                <tr>
                  <td>Overdue balance</td>
                  <td>EGP {metrics.overdueBalance?.toLocaleString() || 0}</td>
                </tr>
                <tr>
                  <td>Warehouses</td>
                  <td>{metrics.warehouseCount || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid-two" style={{ marginTop: 18 }}>
        <div className="panel">
          <h3>Inventory by warehouse</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Warehouse</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length ? (
                  inventory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.warehouseName}</td>
                      <td>{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>EGP {item.totalValue?.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-state">No inventory records</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <h3>Recent purchase orders</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>PO</th>
                  <th>Vendor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length ? (
                  purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td>{purchase.code}</td>
                      <td>{purchase.vendor}</td>
                      <td><span className="status-pill">{purchase.status}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-state">No purchase orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
