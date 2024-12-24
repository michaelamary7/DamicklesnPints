import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_MENU } from '../graphql/mutations';

const CreateMenu = () => {
  const [name, setName] = useState('');
  const [createMenu, { data, loading, error }] = useMutation(CREATE_MENU);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMenu({ variables: { name } });
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create Menu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Menu Name"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Menu'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Menu Created: {data.createMenu.name}</p>}
    </div>
  );
};

export default CreateMenu;

