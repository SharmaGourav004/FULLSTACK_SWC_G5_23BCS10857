import React, { useEffect, useState } from "react";

const mockItems = [
  { id: 1, title: "Wireless Headphones", category: "Audio" },
  { id: 2, title: "Mechanical Keyboard", category: "Accessories" },
  { id: 3, title: "Smart Notebook", category: "Productivity" },
  { id: 4, title: "Desk Lamp", category: "Workspace" },
];

export default function DataFetchingList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadItems() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setItems(
          data.map((post) => ({
            id: post.id,
            title: post.title,
            category: mockItems[post.id % mockItems.length].category,
          }))
        );
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Unable to load items.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadItems();

    return () => controller.abort();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <header style={styles.header}>
          <p style={styles.kicker}>Q24</p>
          <h1 style={styles.title}>Data fetching list view</h1>
          <p style={styles.subtitle}>Fetch on mount, show loading, render results, and handle failures.</p>
        </header>

        {loading && <div style={styles.state}>Loading items...</div>}

        {!loading && error && <div style={styles.error}>{error}</div>}

        {!loading && !error && (
          <ul style={styles.list}>
            {items.map((item) => (
              <li key={item.id} style={styles.item}>
                <div>
                  <strong style={styles.itemTitle}>{item.title}</strong>
                  <div style={styles.itemMeta}>{item.category}</div>
                </div>
                <span style={styles.badge}>Available</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "32px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%)",
    fontFamily: "Arial, sans-serif",
    color: "#e2e8f0",
  },
  card: {
    width: "100%",
    maxWidth: "760px",
    background: "rgba(15, 23, 42, 0.92)",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.35)",
  },
  header: {
    marginBottom: "20px",
  },
  kicker: {
    margin: 0,
    fontSize: "12px",
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "#94a3b8",
  },
  title: {
    margin: "8px 0 6px",
    fontSize: "32px",
  },
  subtitle: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  state: {
    padding: "20px",
    borderRadius: "14px",
    background: "rgba(59, 130, 246, 0.12)",
    color: "#bfdbfe",
  },
  error: {
    padding: "20px",
    borderRadius: "14px",
    background: "rgba(239, 68, 68, 0.12)",
    color: "#fecaca",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gap: "14px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
    padding: "18px 20px",
    borderRadius: "16px",
    background: "rgba(30, 41, 59, 0.96)",
    border: "1px solid rgba(148, 163, 184, 0.12)",
  },
  itemTitle: {
    display: "block",
    marginBottom: "6px",
    color: "#f8fafc",
  },
  itemMeta: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  badge: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(34, 197, 94, 0.14)",
    color: "#bbf7d0",
    fontSize: "12px",
    whiteSpace: "nowrap",
  },
};
