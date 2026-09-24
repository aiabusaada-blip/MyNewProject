"use client";

import { useState, useRef, useCallback } from "react";

interface FileUploaderProps {
  accept: string;
  maxSizeMB: number;
  onFileSelect?: (file: File | null) => void;
  /** Label shown above the drop zone */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Help text shown after file is selected (string, not function) */
  statusMessage?: string;
  /** Message shown when file is ready */
  readyMessage?: string;
  /** Whether to show a "Remove" button */
  removable?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export default function FileUploader({
  accept,
  maxSizeMB,
  onFileSelect,
  label = "Upload File",
  hint = "Drag and drop or click to browse.",
  readyMessage,
  statusMessage,
  removable = true,
  disabled = false,
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = useCallback(
    (f: File): string | null => {
      if (!accept) return "No file type specified.";
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const match = acceptedTypes.some((t) => {
        if (t.startsWith(".")) return f.name.toLowerCase().endsWith(t.toLowerCase());
        if (t.includes("/")) return f.type === t;
        if (t.includes("*")) return true;
        return f.name.toLowerCase().endsWith("." + t.toLowerCase());
      });
      if (!match)
        return `Invalid file type. Accepted: ${acceptedTypes.join(", ")}`;
      if (f.size > maxSizeMB * 1024 * 1024)
        return `File too large. Maximum: ${maxSizeMB} MB`;
      return null;
    },
    [accept, maxSizeMB]
  );

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setError(null);
      setFile(null);
      onFileSelect?.(null);
      return;
    }
    const err = validate(f);
    if (err) {
      setError(err);
      setFile(null);
      onFileSelect?.(null);
      return;
    }
    setError(null);
    setFile(f);
    onFileSelect?.(f);
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    inputRef.current!.value = "";
    onFileSelect?.(null);
  };

  const isPDF = file?.type === "application/pdf" || file?.name.toLowerCase().endsWith(".pdf");
  const isDocx = file?.name.toLowerCase().endsWith(".docx");

  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: 600,
            marginBottom: "8px",
            color: "var(--foreground)",
          }}
        >
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        onClick={openPicker}
        style={{
          border: `2px dashed ${
            error ? "var(--destructive)" : "var(--border)"
          }`,
          borderRadius: "12px",
          padding: "32px 24px",
          textAlign: "center",
          background: file ? "var(--muted)" : "var(--background)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "border-color 0.15s",
          opacity: disabled ? 0.5 : 1,
        }}
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? undefined : 0}
        onKeyDown={
          disabled
            ? undefined
            : (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPicker();
                }
              }
        }
        aria-disabled={disabled}
      >
        {file ? (
          <div style={{ width: "100%" }}>
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "8px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {isPDF ? "📄" : isDocx ? "📝" : "📎"}
            </div>
            <p
              style={{
                fontWeight: 600,
                marginBottom: "4px",
                color: "var(--foreground)",
                fontSize: "0.9375rem",
              }}
            >
              {file.name}
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--muted-foreground)",
                marginBottom: "12px",
              }}
            >
              {isPDF ? "PDF" : isDocx ? "DOCX" : file.type || "File"} ·{" "}
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            {removable && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                style={{
                  padding: "6px 16px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  color: "var(--muted-foreground)",
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                }}
              >
                Remove file
              </button>
            )}
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: "2.5rem",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              📎
            </div>
            <p
              style={{
                color: "var(--muted-foreground)",
                marginBottom: "16px",
                fontSize: "0.875rem",
              }}
            >
              {hint}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openPicker();
              }}
              disabled={disabled}
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "var(--muted)",
                color: "var(--muted-foreground)",
                fontSize: "0.875rem",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              Browse files
            </button>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: "none" }}
        disabled={disabled}
        aria-label={label}
      />

      {/* Status / error */}
      <div
        style={{
          marginTop: "12px",
          fontSize: "0.8125rem",
          minHeight: "20px",
        }}
        aria-live="polite"
      >
        {error ? (
          <span style={{ color: "var(--destructive)" }}>{error}</span>
        ) : file ? (
          <span
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {statusMessage || "File selected."}
          </span>
        ) : (
          <span style={{ color: "var(--muted-foreground)", opacity: 0.6 }}>
            PDF or DOCX up to {maxSizeMB} MB
          </span>
        )}
      </div>
    </div>
  );
}
