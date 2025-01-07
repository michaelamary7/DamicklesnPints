export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

export interface MenuItemInput {
    name: string;
    description: string;
    price: string;
    category: string;
  }