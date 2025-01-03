import React, { useState } from 'react';
import { Card, Row, Col, Tag, Typography, Image, Button } from 'antd';
import { RiseOutlined } from '@ant-design/icons';
import ReservationModal from './ReservationModal';

const { Title, Text } = Typography;

const TrendingMenu: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  const menuItems = [
    {
      id: 1,
      name: "Truffle Burger",
      restaurant: "Gourmet Bites",
      restaurantId: "gb-001",
      location: "New York",
      price: 16.99,
      description: "Premium beef patty topped with truffle mayo, caramelized onions, and aged cheddar",
      trending: true,
      imageUrl: "https://www.unileverfoodsolutions.com.au/dam/global-ufs/mcos/ANZ/calcmenu/recipes/AU-recipes/red-meats-&-red-meat-dishes/truffle-burger/main-header.jpg"  
    },
    {
      id: 2,
      name: "Poke Bowl",
      restaurant: "Ocean Fresh",
      restaurantId: "of-001",
      location: "Los Angeles",
      price: 18.99,
      description: "Fresh tuna, avocado, edamame on sushi rice with house special sauce",
      trending: true,
      imageUrl: "https://myareanetwork-photos.s3.amazonaws.com/editorphotos/f/34653_1558570756.jpg"
    },
    {
      id: 3,
      name: "Butternut Ravioli",
      restaurant: "Pasta Paradise",
      restaurantId: "pp-001",
      location: "Chicago",
      price: 19.99,
      description: "Handmade ravioli filled with roasted butternut squash in sage butter sauce",
      trending: true,
      imageUrl: "https://cdn.loveandlemons.com/wp-content/uploads/2020/10/butternut-squash-ravioli.jpg"
    }
  ];

  const handleReservationSubmit = async (reservationData: any) => {
    // Handle the reservation submission here
    console.log('Reservation data:', reservationData);
    // await yourApiCall(reservationData);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RiseOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        <Title level={2} style={{ margin: 0 }}>Trending Now</Title>
      </div>

      <Row gutter={[16, 16]}>
        {menuItems.map((item) => (
          <Col xs={24} md={12} lg={8} key={item.id}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <Image
                    alt={item.name}
                    src={item.imageUrl}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                    preview={{
                      mask: 'View full image'
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
              
              <Text type="secondary">
                {item.description}
              </Text>

              <Text type="secondary" strong style={{ display: 'block', marginTop: '12px', marginBottom: '12px' }}> Location: 
                {item.location}
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
        onClose={() => setIsModalVisible(false)}
        restaurantId={selectedRestaurant}
        onSubmit={handleReservationSubmit}
      />
    </div>
  );
};

export default TrendingMenu;