export const confirmReservationId = (reservationId: string) => {
    return {
      type: 'CONFIRM_RESERVATION',
      reservationId
    };
  };
  
  export const getReservationId = () => {
    return {
      type: 'GET_RESERVATION'
    };
  };  
  
  export const removeReservationId = (reservationId: string) => {
    return {
      type: 'REMOVE_RESERVATION',
      reservationId
    };
  };
  