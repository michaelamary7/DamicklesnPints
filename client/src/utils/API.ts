import type { User } from '../models/User.js';
import type {MenuItem} from '../models/Menu.js';
import type {Reservation} from '../models/Reservation.js';

// route to get logged in user's info (needs the token)
export const getMe = (token: string) => {
  return fetch('/api/users/me', { 
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData: User) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData: User) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save menu data for a logged in user
export const saveMenuItem = (menuData: MenuItem, token: string) => {
  return fetch('/api/menu', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(menuData),
  });
};

export const getMenuItems = (token: string) => {
  return fetch('/api/menu', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// remove saved menu data for a logged in user
export const deleteMenuItem = (menuId: string, token: string) => {
  return fetch(`/api/menu/${menuId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
    });
}

// save reservation data for a logged in user
export const saveReservation = (reservationData: Reservation, token: string) => {
  return fetch('/api/reservations', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reservationData),
  });
};

// remove saved reservation data for a logged in user
export const deleteReservation = (reservationId: string, token: string) => {
  return fetch(`/api/reservations/${reservationId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
    });
}

export const createReservation = async (reservation: any) => {
  const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
  });

  if (!response.ok) {
      throw new Error('Failed to create reservation');
  }

  return response.json();
}

      



