import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_MENU } from '../graphql/mutations';

const UpdateMenu = ({ menuId }) => {
  const [name, setName] = useState('');
  const [updateMenu, { data, loading, error }] = useMutation(UPDATE_MENU);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMenu({ variables: { id: menuId, name } });
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Update Menu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Menu Name"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Menu'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Menu Updated: {data.updateMenu.name}</p>}
    </div>
  );
};

export default UpdateMenu;