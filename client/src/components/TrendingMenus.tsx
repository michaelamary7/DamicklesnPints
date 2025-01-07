import React, { useState } from 'react';
import { Card, Row, Col, Tag, Typography, Image, Button } from 'antd';
import { RiseOutlined } from '@ant-design/icons';
import ReservationModal from './ReservationModal';
import { useQuery } from '@apollo/client';
import { GET_TRENDING_MENU_ITEMS } from '../graphql/queries';

interface MenuItem {
  _id: number;
  name: string;
  restaurant: string;
  imageUrl: string;
  price: number;
  description: string;
  location: string;
  restaurantId: number;
}

const { Title, Text } = Typography;

const TrendingMenu: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);

  const { loading, error, data } = useQuery(GET_TRENDING_MENU_ITEMS);

  if (loading) return <div>Loading trending menu items...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const menuItems = data?.menuItems || [];

  if (menuItems.length === 0) {
    return <div>No trending menu items available right now.</div>;
  }

  const handleReservationSubmit = async (reservationData: { [key: string]: any }) => {
    console.log('Reservation data:', reservationData);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RiseOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        <Title level={2} style={{ margin: 0 }}>Trending Now</Title>
      </div>

      <Row gutter={[16, 16]}>
        {menuItems.map((item: MenuItem) => (
          <Col xs={24} md={12} lg={8} key={item._id}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <Image
              alt={`${item.name} at ${item.restaurant}`}
              src={item.imageUrl}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
              preview={{
                mask: 'View full image',
              }}
            />
          </div>
              }
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <Title level={4} style={{ margin: 0 }}>{item.name}</Title>
          <Tag color="blue">${item.price.toFixed(2)}</Tag>
              </div>
              <Text type="secondary" strong style={{ marginBottom: '12px', display: 'block' }}>
          {item.restaurant}
              </Text>
              <Text type="secondary">{item.description}</Text>
              <Text type="secondary" strong style={{ display: 'block', marginTop: '12px', marginBottom: '12px' }}>
          Location: {item.location}
              </Text>
              <Button
          type="link"
          style={{ padding: 0 }}
          onClick={() => {
            setSelectedRestaurant(item.restaurantId);
            setIsModalVisible(true);
          }}
              >
          Make Reservation at {item.restaurant}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <ReservationModal
        isVisible={isModalVisible}
        onClose={() => {
          setSelectedRestaurant(null);
          setIsModalVisible(false);
        }}
        restaurantId={selectedRestaurant}
        onSubmit={handleReservationSubmit}
      />
    </div>
  );
};

export default TrendingMenu;
