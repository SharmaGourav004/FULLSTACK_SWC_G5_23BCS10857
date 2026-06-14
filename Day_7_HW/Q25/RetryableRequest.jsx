import React, { useEffect, useState } from "react";

async function fetchWithRetry(url, retries = 3, delayMs = 700) {
  let lastError = null;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return {
        data: await response.json(),
        attempts: attempt,
      };
    } catch (error) {
      lastError = error;

      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
      }
    }
  }

  throw lastError || new Error("Request failed after retries.");
}

export default function RetryableRequest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        setError("");
        setAttempts(0);

        const result = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);

        if (!active) {
          return;
        }

        setData(result.data);
        setAttempts(result.attempts);
      } catch (fetchError) {
        if (active) {
          setError(fetchError.message || "Request failed after retries.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={styles.page}>
      <section style={styles.card}>
        <p style={styles.kicker}>Q25</p>
        <h1 style={styles.title}>Retry mechanism for API failures</h1>
        <p style={styles.subtitle}>This pattern retries a failing request up to three times before surfacing an error.</p>

        {loading && <div style={styles.state}>Trying request... automatic retry enabled.</div>}

        {!loading && error && <div style={styles.error}>{error}</div>}

        {!loading && !error && data && (
          <div style={styles.result}>
            <div style={styles.resultRow}>
              <span style={styles.label}>Task</span>
              <span style={styles.value}>{data.title}</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.label}>Completed</span>
              <span style={styles.value}>{String(data.completed)}</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.label}>Attempts</span>
              <span style={styles.value}>{attempts || 1}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "32px",
    background: "radial-gradient(circle at top, #111827 0%, #030712 60%)",
    color: "#e5e7eb",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "640px",
    borderRadius: "20px",
    padding: "28px",
    background: "rgba(17, 24, 39, 0.92)",
    border: "1px solid rgba(148, 163, 184, 0.14)",
    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.4)",
  },
  kicker: {
    margin: 0,
    color: "#f59e0b",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    fontSize: "12px",
  },
  title: {
    margin: "10px 0 8px",
    fontSize: "30px",
  },
  subtitle: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  state: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(245, 158, 11, 0.12)",
    color: "#fde68a",
  },
  error: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(239, 68, 68, 0.12)",
    color: "#fecaca",
  },
  result: {
    marginTop: "20px",
    display: "grid",
    gap: "12px",
  },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    padding: "16px",
    borderRadius: "14px",
    background: "rgba(31, 41, 55, 0.95)",
  },
  label: {
    color: "#94a3b8",
  },
  value: {
    color: "#f8fafc",
    textAlign: "right",
  },
};
