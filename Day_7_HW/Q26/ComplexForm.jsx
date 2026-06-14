import React, { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
  address: "",
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required.";
  }

  return errors;
}

export default function ComplexForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitted(Object.keys(validationErrors).length === 0);
  }

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit} noValidate>
        <p style={styles.kicker}>Q26</p>
        <h1 style={styles.title}>Centralized form state</h1>
        <p style={styles.subtitle}>A checkout-style form with inline validation and shared state management.</p>

        <div style={styles.grid}>
          <Field label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
          <Field label="Email" name="email" value={values.email} onChange={handleChange} error={errors.email} type="email" />
          <Field label="Password" name="password" value={values.password} onChange={handleChange} error={errors.password} type="password" />
          <Field label="Address" name="address" value={values.address} onChange={handleChange} error={errors.address} />
        </div>

        <button type="submit" style={styles.button}>Submit form</button>

        {submitted && <div style={styles.success}>Form submitted successfully.</div>}
      </form>
    </div>
  );
}

function Field({ label, name, value, onChange, error, type = "text" }) {
  return (
    <label style={styles.field}>
      <span style={styles.label}>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        style={{
          ...styles.input,
          borderColor: error ? "#f87171" : "rgba(148, 163, 184, 0.18)",
        }}
      />
      {error && <span style={styles.error}>{error}</span>}
    </label>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "32px",
    background: "linear-gradient(160deg, #1f2937 0%, #0f172a 55%, #020617 100%)",
    fontFamily: "Arial, sans-serif",
    color: "#e5e7eb",
  },
  card: {
    width: "100%",
    maxWidth: "720px",
    borderRadius: "22px",
    padding: "30px",
    background: "rgba(15, 23, 42, 0.95)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    boxShadow: "0 28px 90px rgba(0, 0, 0, 0.45)",
  },
  kicker: {
    margin: 0,
    color: "#38bdf8",
    fontSize: "12px",
    letterSpacing: "0.24em",
    textTransform: "uppercase",
  },
  title: {
    margin: "10px 0 8px",
    fontSize: "32px",
  },
  subtitle: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  grid: {
    marginTop: "24px",
    display: "grid",
    gap: "18px",
  },
  field: {
    display: "grid",
    gap: "8px",
  },
  label: {
    color: "#cbd5e1",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    background: "rgba(30, 41, 59, 0.95)",
    color: "#f8fafc",
    outline: "none",
  },
  error: {
    color: "#fca5a5",
    fontSize: "13px",
  },
  button: {
    marginTop: "24px",
    padding: "14px 18px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },
  success: {
    marginTop: "18px",
    padding: "16px",
    borderRadius: "14px",
    background: "rgba(34, 197, 94, 0.14)",
    color: "#bbf7d0",
  },
};
