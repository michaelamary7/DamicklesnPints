import type { MenuItem } from '../models/Menu.js';

export const getMenu = async (): Promise<MenuItem> => {
  try {
    const response = await fetch('/api/menu');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: MenuItem = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    throw error;
  }
};