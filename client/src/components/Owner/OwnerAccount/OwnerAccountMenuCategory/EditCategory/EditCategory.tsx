import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OwnerSettingMenuCategory } from '../../../../../types';
import { serverUrl } from '../../../../../utils/constants';
import { ImageUpload } from '../../../../Global/ImageUpload/ImageUpload';

interface Props {
  menuType: string;
  setUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: OwnerSettingMenuCategory;
  count: number;
}

export const EditCategory: React.FC<Props> = ({ menuType, setUpdateModal, data, count }) => {
  const { id } = useParams();

  const [updateLoading, setUpdateLoading] = useState(false);
  const [removePreview, setRemovePreview] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    const target = e.target as HTMLInputElement & {
      category: { value: string };
      priority: { checked: boolean };
    };

    const form = new FormData();

    form.append('category', target.category.value);
    form.append('priority', target.priority.checked.toString());
    form.append('menuType', menuType);
    form.append('removePreview', removePreview.toString());
    form.append('restaurantId', id!);

    if (menuType === 'aio') {
      const file = target.querySelector('.file-container input') as HTMLInputElement;
      if (file && file.files) {
        form.append('image', file.files[0]);
      }
    }

    const res = await fetch(`${serverUrl}/restaurant/menus-category/${data.id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      body: form,
    });

    const response = await res.json();

    if (res.status === 409) {
      setUpdateLoading(false);
      setErrMessage(response.error);
      return;
    }

    if (response.error) {
      console.error(response.error);
    }

    if (response.success) {
      window.location.reload();
    }

    setUpdateLoading(false);
  };

  const onRemoveButtonClick = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);

    const res = await fetch(`${serverUrl}/restaurant/menus-category/${data.id}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
    });

    const response = await res.json();

    if (response.error) {
      console.error(response.error);
    }
    if (response.success) {
      window.location.reload();
    }
    setUpdateLoading(false);
  };

  return (
    <div className="modal show-default add-edit-category-modal edit-modal">
      <FontAwesomeIcon icon={faTimes} onClick={() => setUpdateModal(false)} className="close-button" />
      <div className="modal-inner fade-in-up">
        <form onSubmit={(e) => onFormSubmit(e)}>
          <input type="text" placeholder="Category" name="category" defaultValue={data.category_name} required />
          <label>
            <input type="checkbox" name="priority" value="true" defaultChecked={data.priority} /> Priority
          </label>
          {menuType === 'aio' && data.image && !removePreview ? (
            <div className="menu-category-preview-img">
              <FontAwesomeIcon icon={faTimes} className="close-button" onClick={() => setRemovePreview(true)} />
              <img src={data.image} />
            </div>
          ) : (
            menuType === 'aio' && <ImageUpload />
          )}
          {errMessage && <p className="error">{errMessage}</p>}
          <div className="buttons">
            {count > 1 && (
              <button
                disabled={updateLoading}
                className="remove-button"
                type="button"
                onClick={(e) => {
                  onRemoveButtonClick(e);
                }}
              >
                Remove {updateLoading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
              </button>
            )}

            <button disabled={updateLoading} type="submit">
              Update {updateLoading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
