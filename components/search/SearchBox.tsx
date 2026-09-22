export default function SearchBox() {
  return (
    <input
      type="text"
      placeholder="Describe the professional, provider or capability you need…"
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "16px 24px",
        fontSize: "1.1rem",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        outline: "none",
        boxSizing: "border-box",
      }}
    />
  );
}
