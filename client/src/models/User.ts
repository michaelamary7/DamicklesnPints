import type { MenuItem } from './Menu';

import type { Reservation } from './Reservation';

export interface User {
    userId: string;
    username: string;
    email: string;
    password: string;
    menuItems: MenuItem[];
    reservations: Reservation[];
}

