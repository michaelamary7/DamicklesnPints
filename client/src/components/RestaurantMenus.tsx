import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_MENUS } from '../graphql/queries';
import { Card, Col, Row, Typography, Image, Tag, Spin, Alert, Input, Select, Space } from 'antd';
import debounce from 'lodash/debounce';


const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
}

interface Menu {
  _id: string;
  restaurantId: {
    _id: string;
    name: string;
    location: string;
  };
  items: MenuItem[];
  lastUpdated: string;
}

interface FilterState {
  restaurant: string;
  category: string;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  search: string;
}

interface Restaurant {
  _id: string;
  name: string;
  location: string;
}

const RestaurantMenus: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_MENUS);
  const [filters, setFilters] = useState<FilterState>({
    restaurant: '',
    category: '',
    sortBy: 'name-asc',
    search: ''
  });
  

  // Derived state for dropdowns 
  const restaurants: string[] = data?.menus ? [...new Set(data.menus.map((menu: { restaurantId: Restaurant }) => menu.restaurantId?.name).filter(Boolean) as string[])] : [];
  const categories: string[] = data?.menus ? [...new Set(data.menus.flatMap((menu: Menu) => 
    (menu.items || []).map((item: MenuItem) => item.category)
  ).filter(Boolean) as string[])] : [];

  const handleSearchChange = debounce((value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  }, 300);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const sortItems = (items: MenuItem[]): MenuItem[] => {
    if (!Array.isArray(items)) return [];
    
    return [...items].sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        default:
          return 0;
      }
    });
  };

  const filterMenus = (menus: Menu[]): Menu[] => {
    if (!Array.isArray(menus)) return [];

    return menus.filter(menu => {
      // Validate menu object
      if (!menu || !menu.restaurantId || !Array.isArray(menu.items)) {
        return false;
      }

      // Filter by restaurant
      if (filters.restaurant && menu.restaurantId.name !== filters.restaurant) {
        return false;
      }

      // Filter items within the menu
      const filteredItems = menu.items.filter(item => {
        if (!item) return false;

        // Filter by category
        if (filters.category && item.category !== filters.category) {
          return false;
        }

        // Filter by search term
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          return (
            (item.name || '').toLowerCase().includes(searchTerm) ||
            (item.description || '').toLowerCase().includes(searchTerm)
          );
        }

        return true;
      });

      // Create a new menu object with filtered and sorted items
      menu.items = sortItems(filteredItems);
      return menu.items.length > 0;
    });
  };

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        className="m-4"
      />
    );
  }

  const filteredMenus = filterMenus(data?.menus || []);

  return (
    <div className="p-4">
      {/* Filters Section */}
      <Card className="mb-4">
        <Space direction="vertical" className="w-full">
          <Title level={4}>Filters</Title>
          <Row gutter={[16, 16]} className="w-full">
            <Col xs={24} sm={24} md={6}>
              <Search
                placeholder="Search menu items..."
                onChange={e => handleSearchChange(e.target.value)}
                className="w-full"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Select Restaurant"
                className="w-full"
                allowClear
                value={filters.restaurant}
                onChange={value => handleFilterChange('restaurant', value)}
              >
                {restaurants.map((restaurant) => (
                  <Option key={restaurant as string} value={restaurant as string}>{restaurant as string}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Select Category"
                className="w-full"
                allowClear
                value={filters.category}
                onChange={value => handleFilterChange('category', value)}
              >
                {categories.map((category) => (
                  <Option key={category as string} value={category as string}>{category as string}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Sort By"
                className="w-full"
                value={filters.sortBy}
                onChange={value => handleFilterChange('sortBy', value as FilterState['sortBy'])}
              >
                <Option value="name-asc">Name (A-Z)</Option>
                <Option value="name-desc">Name (Z-A)</Option>
                <Option value="price-asc">Price (Low to High)</Option>
                <Option value="price-desc">Price (High to Low)</Option>
              </Select>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Results Section */}
      {filteredMenus.length === 0 ? (
        <Alert
          message="No menus found"
          description="Try adjusting your filters or check back later."
          type="info"
          className="my-4"
        />
      ) : (
        filteredMenus.map((menu) => (
          <Card 
            key={menu._id} 
            className="mb-8"
            title={
              <div className="flex justify-between items-center">
                <Title level={3}>{menu.restaurantId.name}</Title>
                <Text type="secondary">
                  {menu.restaurantId.location}
                </Text>
              </div>
            }
          >
            <div className="mb-4">
              <Text type="secondary">
                Last updated: {new Date(menu.lastUpdated).toLocaleDateString()}
              </Text>
            </div>
            
            {Object.entries(
              menu.items.reduce((acc, item) => {
                if (!acc[item.category]) {
                  acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
              }, {} as Record<string, MenuItem[]>)
            ).map(([category, items]) => (
              <div key={category} className="mb-6">
                <Title level={4} className="mb-4">{category}</Title>
                <Row gutter={[16, 16]}>
                  {items.map((item) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
                      <Card 
                        hoverable 
                        className={!item.isAvailable ? 'opacity-60' : ''}
                      >
                        {item.image && (
                          <Image
                            alt={item.name}
                            src={item.image}
                            className="w-full h-48 object-cover mb-4"
                            fallback="/placeholder-food.png"
                          />
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <Title level={5} className="mb-0">
                            {item.name}
                          </Title>
                          <Text strong>${item.price.toFixed(2)}</Text>
                        </div>
                        <Text type="secondary" className="block mb-2">
                          {item.description}
                        </Text>
                        {!item.isAvailable && (
                          <Tag color="red">Currently Unavailable</Tag>
                        )}
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Card>
        ))
      )}
    </div>
  );
};

export default RestaurantMenus;

