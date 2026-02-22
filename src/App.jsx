import { useState } from "react";
import { alertsData } from "./alerts";

function App() {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [alerts, setAlerts] = useState(alertsData);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const resolveAlert = () => {
    if (!selected) return;

    const updated = alerts.map(a =>
      a.id === selected.id ? { ...a, status: "RESOLVED" } : a
    );

    setAlerts(updated);
    setSelected({ ...selected, status: "RESOLVED" });
  };
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  const filteredAlerts = alerts
    .filter(a =>
      a.driver.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;

      let valueA = a[sortField];
      let valueB = b[sortField];

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const openCount = alerts.filter(a => a.status === "OPEN").length;
  const resolvedCount = alerts.filter(a => a.status === "RESOLVED").length;
  const escalatedCount = alerts.filter(a => a.status === "ESCALATED").length;

  const getSeverityColor = (severity) => {
    if (severity === "Critical") return "red";
    if (severity === "Warning") return "orange";
    return "blue";
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial", backgroundColor: "#f2f4f7", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 5 }}>Fleet Alert Dashboard</h1>
      <p style={{ color: "#666", marginBottom: 20 }}>Basic monitoring interface</p>
      <hr />

      <div style={{ margin: "20px 0", display: "flex", gap: 20 }}>
        <div style={{
          padding: 14,
          background: "white",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          borderLeft: "4px solid #3b82f6"
        }}>
          Open: <strong>{openCount}</strong>
        </div>
        <div style={{
          padding: 14,
          background: "white",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          borderLeft: "4px solid #ef4444"
        }}>
          Escalated: <strong>{escalatedCount}</strong>
        </div>
        <div style={{
          padding: 14,
          background: "white",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          borderLeft: "4px solid #10b981"
        }}>
          Resolved: <strong>{resolvedCount}</strong>
        </div>
      </div>

     <input
  placeholder="Search by driver or alert ID"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: 10,
    marginBottom: 20,
    width: 260,
    borderRadius: 6,
    border: "1px solid #ccc"
  }}
/>

      <table
  style={{
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
  }}
>
       <thead style={{ backgroundColor: "#f0f2f5" }}>
          <tr>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>ID</th>
            <th>Source</th>
            <th onClick={() => handleSort("severity")} style={{ cursor: "pointer" }}>Severity</th>
            <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>Status</th>
            <th>Driver</th>
            <th>Vehicle</th>
          </tr>
        </thead>

        <tbody>
          {filteredAlerts.map(alert => (
            <tr
  key={alert.id}
  onClick={() => setSelected(alert)}
  style={{
    cursor: "pointer",
    borderBottom: "1px solid #eee"
  }}
>
              <td>{alert.id}</td>
              <td>{alert.source}</td>
              <td style={{ color: getSeverityColor(alert.severity), fontWeight: "bold" }}>
                {alert.severity}
              </td>
              <td>{alert.status}</td>
              <td>{alert.driver}</td>
              <td>{alert.vehicle}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div style={{
  marginTop: 25,
  padding: 16,
  background: "white",
  borderRadius: 8,
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
}}>
          <h3>Alert Details</h3>
          <p><strong>ID:</strong> {selected.id}</p>
          <p><strong>Status:</strong> {selected.status}</p>
          <p><strong>Driver:</strong> {selected.driver}</p>
          <p><strong>Rule:</strong> {selected.rule}</p>

          {selected.status !== "RESOLVED" && (
            <button
  onClick={resolveAlert}
  style={{
    marginTop: 12,
    padding: "8px 14px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }}
>
  Resolve Alert
</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;