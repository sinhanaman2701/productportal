"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from "@payloadcms/ui";
import { Upload, X, FileImage } from "lucide-react";

interface UploadOnlyProps {
  path: string;
  name: string;
  label?: string;
  required?: boolean;
  description?: string;
  relationTo: string;
}

export const UploadOnly: React.FC<UploadOnlyProps> = ({
  path,
  name,
  label,
  required,
  description,
  relationTo = "media",
}) => {
  const { value, setValue } = useField<{ id: string | number; alt?: string } | null>({ path });
  const { setModified } = useForm();
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing media alt text when value changes
  useEffect(() => {
    if (value && typeof value === "object" && "id" in value) {
      const fetchAltText = async () => {
        try {
          const response = await fetch(`/api/${relationTo}/${value.id}`, {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            setAltText(data.alt || "");
            setPreviewUrl(`/media/${data.filename}`);
          }
        } catch (e) {
          console.error("Failed to fetch media:", e);
        }
      };
      fetchAltText();
    } else if (typeof value === "string" || typeof value === "number") {
      // Value is just an ID
      const fetchAltText = async () => {
        try {
          const response = await fetch(`/api/${relationTo}/${value}`, {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            setAltText(data.alt || "");
            setPreviewUrl(`/media/${data.filename}`);
          }
        } catch (e) {
          console.error("Failed to fetch media:", e);
        }
      };
      fetchAltText();
    } else {
      setPreviewUrl(null);
      setAltText("");
    }
  }, [value, relationTo]);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      setError(null);

      // Generate default alt text from filename (without extension)
      const defaultAlt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const altToUse = altText.trim() || defaultAlt;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("alt", altToUse);

        const response = await fetch(`/api/${relationTo}`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.errors?.[0]?.message || "Upload failed");
        }

        const data = await response.json();
        const uploadedMedia = data.doc;

        // Set the value to the media ID
        setValue(uploadedMedia.id);
        setPreviewUrl(`/media/${uploadedMedia.filename}`);
        setAltText(altToUse);
        setModified(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload failed";
        setError(message);
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [setValue, altText, relationTo, setModified]
  );

  const handleRemove = useCallback(() => {
    setValue(null);
    setAltText("");
    setPreviewUrl(null);
    setError(null);
    setModified(true);
  }, [setValue, setModified]);

  const handleAltTextChange = useCallback(
    async (val: string) => {
      setAltText(val);
      // Update media alt text in background
      const mediaId = typeof value === "object" && value && "id" in value ? value.id : value;
      if (mediaId) {
        try {
          await fetch(`/api/${relationTo}/${mediaId}`, {
            method: "PATCH",
            body: JSON.stringify({ alt: val }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
        } catch (e) {
          console.error("Failed to update alt text:", e);
        }
      }
    },
    [value, relationTo]
  );

  const handleAltTextInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setAltText(val);
      // Update media alt text in background
      const mediaId = typeof value === "object" && value && "id" in value ? value.id : value;
      if (mediaId) {
        try {
          await fetch(`/api/${relationTo}/${mediaId}`, {
            method: "PATCH",
            body: JSON.stringify({ alt: val }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
        } catch (e) {
          console.error("Failed to update alt text:", e);
        }
      }
    },
    [value, relationTo]
  );

  return (
    <div className="upload-only-field" style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <FieldLabel path={path} label={label || name} />
        {required && (
          <span style={{ color: "var(--theme-error-500)", fontSize: "12px" }}>*</span>
        )}
      </div>

      {description && (
        <p style={{
          margin: "0 0 12px 0",
          fontSize: "13px",
          color: "var(--theme-text-muted)",
        }}>
          {description}
        </p>
      )}

      {!value ? (
        <div style={{ marginTop: "8px" }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            style={{ display: "none" }}
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            buttonStyle="secondary"
          >
            <Upload size={16} style={{ marginRight: "8px" }} />
            {isUploading ? "Uploading..." : "Upload Image"}
          </Button>
          {error && (
            <p style={{
              marginTop: "8px",
              fontSize: "13px",
              color: "var(--theme-error-500)",
            }}>
              {error}
            </p>
          )}
        </div>
      ) : (
        <div style={{
          marginTop: "12px",
          padding: "16px",
          border: "1px solid var(--theme-border)",
          borderRadius: "4px",
          backgroundColor: "var(--theme-input-bg)",
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
        }}>
          <div style={{
            width: "120px",
            height: "80px",
            borderRadius: "4px",
            overflow: "hidden",
            backgroundColor: "var(--theme-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={altText || "Preview"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <FileImage size={32} style={{ color: "var(--theme-text-muted)" }} />
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                marginBottom: "4px",
                color: "var(--theme-text)",
              }}>
                Alt Text
              </label>
              <TextInput
                path="alt"
                value={altText}
                onChange={handleAltTextInputChange}
                required={required}
              />
            </div>
          </div>

          <div style={{ color: "var(--theme-error-500)" }}>
            <Button
              type="button"
              buttonStyle="secondary"
              onClick={handleRemove}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
