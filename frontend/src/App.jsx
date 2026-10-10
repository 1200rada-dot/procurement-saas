:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #0f172a;
  background: #f8fafc;
  line-height: 1.5;
  font-weight: 400;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
}

button, input {
  font: inherit;
}

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 20px 48px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.brand {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}

.role-badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.74rem;
}

.login-card,
.panel {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #dbe0ea;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.login-card {
  max-width: 440px;
  margin: 80px auto 0;
  padding: 28px;
}

form {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 8px;
  font-weight: 600;
  color: #334155;
}

input {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #fff;
  padding: 10px 12px;
}

.primary-button,
.secondary-button {
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
}

.primary-button {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #fff;
}

.secondary-button {
  background: #e2e8f0;
  color: #0f172a;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
  margin: 24px 0;
}

.metric-card {
  padding: 18px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #dfe7f5;
}

.metric-label {
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.metric-value {
  margin-top: 12px;
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
}

.grid-two {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 18px;
  margin-top: 18px;
}

.panel {
  padding: 20px;
}

.table-wrap {
  overflow-x: auto;
  margin-top: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #e2e8f0;
}

th {
  color: #475569;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.status-pill {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  font-size: 0.75rem;
  font-weight: 700;
}

.empty-state {
  color: #64748b;
  padding: 12px 0;
}

@media (max-width: 768px) {
  .grid-two {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
