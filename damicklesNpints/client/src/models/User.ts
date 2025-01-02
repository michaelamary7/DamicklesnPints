import type { Menu } from './Menu';
import type { Reservation } from './Reservation';

export interface User {
    userId: string;
    username: string;
    email: string;
    password: string;
    menuItems: Menu[];
    reservations: Reservation[];
}