import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Layout, 
  Card, 
  Button, 
  Input, 
  Select, 
  Typography, 
  Space, 
  Row, 
  Col,
  Modal,
  Form,
  InputNumber,
  Tag,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  StopOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  isAvailable: boolean;
  imageUrl: string;
}

const MenuPage: React.FC = () => {
  const { restaurantId } = useParams();
  
  // Mock authentication (replace with your auth system)
  const currentUser = {
    id: 'mock-owner-id',
    isAuthenticated: true,
    role: 'restaurant_owner'
  };

  const [restaurantData, setRestaurantData] = useState({
    id: restaurantId,
    name: 'Central Restaurant',
    owner: 'mock-owner-id',
    categories: ['Appetizers', 'Main Course', 'Desserts'],
    menuItems: [
      {
        id: 1,
        name: 'Classic Burger',
        price: 12.99,
        description: 'Juicy beef patty with fresh vegetables',
        category: 'Main Course',
        isAvailable: true,
        imageUrl: 'https://dinnerthendessert.com/wp-content/uploads/2022/02/Classic-Burgers-8.jpg'
      },
      {
        id: 2,
        name: 'Caesar Salad',
        price: 8.99,
        description: 'Fresh romaine lettuce with parmesan',
        category: 'Appetizers',
        isAvailable: true,
        imageUrl: 'https://www.onceuponachef.com/images/2010/08/Homemade-Caesar-Salad-Dressing.jpg'
      },
      {
        id: 3,
        name: 'Cheesecake',
        price: 5.99,
        description: 'New York style cheesecake with strawberry topping',
        category: 'Desserts',
        isAvailable: true,
        imageUrl: 'https://tornadoughalli.com/wp-content/uploads/2018/09/NEW-YORK-STYLE-CHEESECAKE2-2.jpg'
      }
    ]
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form] = Form.useForm();

  // Check if current user is the restaurant owner
  const isOwner = currentUser.isAuthenticated && currentUser.id === restaurantData.owner;

  const filteredItems = selectedCategory === 'All'
    ? restaurantData.menuItems
    : restaurantData.menuItems.filter(item => item.category === selectedCategory);

  const handleAddOrEdit = (values: any) => {
    const updatedItems = editingItem
      ? restaurantData.menuItems.map(item =>
          item.id === editingItem.id ? { ...item, ...values } : item
        )
      : [...restaurantData.menuItems, { ...values, id: Date.now(), isAvailable: true }];

    setRestaurantData({ ...restaurantData, menuItems: updatedItems });
    message.success(`${editingItem ? 'Updated' : 'Added'} menu item successfully`);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (itemId: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      onOk: () => {
        const updatedItems = restaurantData.menuItems.filter(item => item.id !== itemId);
        setRestaurantData({ ...restaurantData, menuItems: updatedItems });
        message.success('Item deleted successfully');
      }
    });
  };

  const handleToggleAvailability = (itemId: number) => {
    const updatedItems = restaurantData.menuItems.map(item =>
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    );
    setRestaurantData({ ...restaurantData, menuItems: updatedItems });
  };

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Row justify="space-between" align="middle">
          <Title level={2}>{restaurantData.name}</Title>
          {isOwner && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingItem(null);
                setIsModalVisible(true);
              }}
            >
              Add Menu Item
            </Button>
          )}
        </Row>
      </Header>

      <Content style={{ padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Category Filter */}
          <Space wrap>
            <Button
              type={selectedCategory === 'All' ? 'primary' : 'default'}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </Button>
            {restaurantData.categories.map(category => (
              <Button
                key={category}
                type={selectedCategory === category ? 'primary' : 'default'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </Space>

          {/* Menu Items Grid */}
          <Row gutter={[16, 16]}>
            {filteredItems.map(item => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <Card
                  hoverable
                  cover={<img alt={item.name} src={item.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
                  actions={isOwner ? [
                    <EditOutlined key="edit" onClick={() => {
                      setEditingItem(item);
                      form.setFieldsValue(item);
                      setIsModalVisible(true);
                    }} />,
                    <DeleteOutlined key="delete" onClick={() => handleDelete(item.id)} />,
                    item.isAvailable ? (
                      <CheckOutlined key="available" onClick={() => handleToggleAvailability(item.id)} /> ) : (
                      <StopOutlined key="unavailable" onClick={() => handleToggleAvailability(item.id)} /> ),
                  ] : []}
                >
                  <Meta
                    title={
                      <Space>
                        {item.name}
                        {!item.isAvailable && <Tag color="red">Unavailable</Tag>}
                      </Space>
                    }
                    description={
                      <>
                        <Text type="secondary">{item.category}</Text>
                        <br />
                        <Text>{item.description}</Text>
                        <br />
                        <Text strong>${item.price.toFixed(2)}</Text>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Space>

        {/* Add/Edit Modal */}
        <Modal
          title={`${editingItem ? 'Edit' : 'Add'} Menu Item`}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddOrEdit}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter item name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter price' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                formatter={value => `$ ${value}`}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select>
                {restaurantData.categories.map(category => (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </Button>
                <Button onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                }}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default MenuPage;