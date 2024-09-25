import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onUpload, onRemove, uploadedImages = [] }) => {
  const onDrop = useCallback(acceptedFiles => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  return (
    <div className="image-upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the images here ...</p> :
            <p>Drag 'n' drop some images here, or click to select files</p>
        }
      </div>
      {uploadedImages.length > 0 && (
        <div className="image-previews">
          {uploadedImages.map((file, index) => (
            <div key={index} className="image-preview-container">
              <img
                src={file instanceof File ? URL.createObjectURL(file) : file}
                alt={`preview ${index}`}
                className="preview-image"
              />
              <button onClick={() => onRemove(index)} className="remove-image">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;