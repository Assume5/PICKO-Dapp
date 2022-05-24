import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
  previewImage?: string;
}

export const ImageUpload: React.FC<Props> = ({ previewImage }) => {
  const fileUpload = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!files) {
      setPreview('');
      return;
    }

    if (previewImage) {
      setPreview(previewImage);
    }

    const objectUrl = URL.createObjectURL(files);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [files]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg')) {
      setFiles(e.target.files[0]);
    } else {
      fileUpload.current!.value = '';
      setFiles(fileUpload.current!.files![0]);
    }
  };

  const onUploadButtonClick = () => {
    if (fileUpload && fileUpload.current) {
      fileUpload.current.click();
    }
  };

  const clearFile = () => {
    if (fileUpload && fileUpload.current) {
      console.log(fileUpload.current.value);
      fileUpload.current.value = '';
      setFiles(fileUpload.current.files![0]);
    }
  };

  return (
    <div className="image-upload">
      <div className={`file-container ${files && 'hidden'}`}>
        <input type="file" onChange={(e) => onFileChange(e)} ref={fileUpload} accept="image/*" required />
        <button className="upload-button" type="button" onClick={onUploadButtonClick}>
          Select a File
        </button>
      </div>

      {files && (
        <div className="preview-image-container">
          <img className="preview-image" src={preview} alt="" />
          <FontAwesomeIcon icon={faTimesCircle} onClick={clearFile} />
        </div>
      )}
    </div>
  );
};
