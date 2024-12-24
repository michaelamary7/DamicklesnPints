import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_MENU_ITEM } from '../graphql/mutations';

const DeleteMenuItem = ({ menuId, itemId }) => {
  const [deleteMenuItem, { data, loading, error }] = useMutation(DELETE_MENU_ITEM);

  const handleDelete = async () => {
    try {
      await deleteMenuItem({ variables: { menuId, itemId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Item'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Item Deleted</p>}
    </div>
  );
};

export default DeleteMenuItem;