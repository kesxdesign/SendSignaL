import React, { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';
import './CSVImport.css';

const CSVImport = ({ onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.name.endsWith('.csv')) {
      setFile(droppedFile);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Mocking file upload and AI mapping delay
    setTimeout(() => {
      setIsUploading(false);
      setSuccess(true);
      if (onImportSuccess) onImportSuccess();
    }, 2000);
  };

  return (
    <div className="csv-import-card">
      <div className="card-header">
        <h2 className="text-title-large">Import Leads via CSV</h2>
        <p className="text-body-medium">Ensure your CSV has first_name and phone_number columns.</p>
      </div>

      {!success ? (
        <div 
           className={`drop-zone ${file ? 'has-file' : ''}`}
           onDragOver={(e) => e.preventDefault()}
           onDrop={handleDrop}
        >
          <UploadCloud size={48} className="upload-icon" />
          {file ? (
            <div className="file-info">{file.name}</div>
          ) : (
            <div className="drop-instructions">
               <span>Drag & drop your CSV here or </span>
               <label className="file-input-label">
                 <span className="text-primary-link">Browse Files</span>
                 <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} hidden />
               </label>
            </div>
          )}
        </div>
      ) : (
        <div className="success-state">
           <CheckCircle size={48} className="success-icon" />
           <h3 className="text-title-medium">Import Successful!</h3>
           <p className="text-body-small">Your leads are being processed in the background.</p>
        </div>
      )}

      {file && !success && (
        <button className="primary-btn upload-btn" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? <span className="spinner"></span> : 'Process CSV'}
        </button>
      )}
    </div>
  );
};

export default CSVImport;
