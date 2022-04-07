import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

export const ImageUpload = () => {
  const fileUpload = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!files) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(files);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [files]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files[0]);
    }
  };

  const onUploadButtonClick = () => {
    if (fileUpload && fileUpload.current) {
      fileUpload.current.click();
    }
  };

  const clearFile = () => {
    if (fileUpload && fileUpload.current) {
      console.log(fileUpload.current.value)
      fileUpload.current.value = '';
      setFiles(fileUpload.current.files![0]);
    }
  };

  return (
    <div className="image-upload">
      <input type="file" onChange={(e) => onFileChange(e)} ref={fileUpload} />
      <button className="upload-button" type="button" onClick={onUploadButtonClick}>
        Select a File
      </button>
      {files && (
        <div className="preview-image-container">
          <img className="preview-image" src={preview} alt="" />
          <FontAwesomeIcon icon={faTimes} onClick={clearFile} />
        </div>
      )}
    </div>
  );
};
