import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serverUrl } from '../../../../../utils/constants';
import { ImageUpload } from '../../../../Global/ImageUpload/ImageUpload';

interface Props {
  menuType: string;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCategory: React.FC<Props> = ({ menuType, setAddModal }) => {
  const { id } = useParams();

  const [updateLoading, setUpdateLoading] = useState(false);
  const [err, setErr] = useState('');

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);

    const target = e.target as HTMLFormElement & {
      category: { value: string };
      priority: { checked: boolean };
    };

    const { category, priority } = target;

    const form = new FormData();

    form.append('category', category.value);
    form.append('priority', priority.checked.toString());

    if (menuType === 'aio') {
      const file = target.querySelector('.file-container input') as HTMLInputElement;
      if (file && file.files) {
        form.append('image', file.files[0]);
      }
    }

    const res = await fetch(`${serverUrl}/restaurant/menus-category/${id}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: form,
    });

    const data = await res.json();

    if (res.status === 409) {
      setUpdateLoading(false);
      setErr(data.error);
      return;
    }

    if (data.error) {
      console.error(data.error);
    }

    if (data.success) {
      window.location.reload();
    }
    setUpdateLoading(false);
  };
  return (
    <div className="modal show-default add-edit-category-modal">
      <FontAwesomeIcon icon={faTimes} onClick={() => setAddModal(false)} className="close-button" />
      <div className="modal-inner fade-in-up">
        <form onSubmit={(e) => onFormSubmit(e)}>
          <input type="text" placeholder="Category" name="category" required />
          <label>
            <input type="checkbox" name="priority" value="true" /> Priority
          </label>
          {menuType === 'aio' && <ImageUpload />}
          {err && <p className="error">{err}</p>}
          <button disabled={updateLoading}>
            Add Category {updateLoading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
          </button>
        </form>
      </div>
    </div>
  );
};
