import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const OwnerAccountNavBar = () => {
  const { id, page } = useParams();
  const navigate = useNavigate();
  return (
    <div className="owner-account-nav-bar">
      <p className={page === 'settings' ? 'active' : ''} onClick={() => navigate(`/owner/${id}/account/settings`)}>
        Settings
      </p>
      <p
        className={page === 'menu-category' ? 'active' : ''}
        onClick={() => navigate(`/owner/${id}/account/menu-category`)}
      >
        Menu Category
      </p>
      <p className={page === 'menus' ? 'active' : ''} onClick={() => navigate(`/owner/${id}/account/menus`)}>
        Menus
      </p>
      <p className={page === 'images' ? 'active' : ''} onClick={() => navigate(`/owner/${id}/account/images`)}>
        Images
      </p>
    </div>
  );
};
