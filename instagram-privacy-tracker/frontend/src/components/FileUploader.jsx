import React, { useState } from 'react';

export default function FileUploader({ onUploadSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Mocking User ID as "test_user_123" for local sandbox iteration
      const response = await fetch('http://localhost:8000/upload/test_user_123', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        onUploadSuccess(data.metrics);
      } else {
        alert(data.detail || "Upload error occurred");
      }
    } catch (err) {
      alert("Cannot link to processing server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', border: '2px dashed #0070f3', textAlign: 'center', borderRadius: '8px' }}>
      {loading ? (
        <p>Parsing Zip Contents In-Memory... Please Wait.</p>
      ) : (
        <>
          <p>Drag and drop your Instagram data ZIP file here</p>
          <input type="file" accept=".zip" onChange={handleFileChange} />
        </>
      )}
    </div>
  );
}