import React, { useState, useEffect } from 'react';
import { Layout, Table, Tag, Button, Space, Modal, Typography, Tabs, message } from 'antd';
import type { TableProps } from 'antd';
import { CheckOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'rejected';
  notes?: string;
  createdAt: string;
}

const ReservationPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  // Fetch reservations (mock data for example)
  useEffect(() => {
    // Mock data - replace with actual API call
    setReservations([
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        date: '2025-01-15',
        time: '19:00',
        guests: 4,
        status: 'pending',
        notes: 'Window seat preferred',
        createdAt: '2025-01-02T10:00:00Z'
      },
      // Add more mock reservations...
    ]);
  }, []);

  const handleStatusChange = async (reservationId: string, newStatus: 'confirmed' | 'rejected') => {
    try {
      // Call your API to update the status
      // await updateReservationStatus(reservationId, newStatus);

      // Update local state
      setReservations(prevReservations =>
        prevReservations.map(res =>
          res.id === reservationId ? { ...res, status: newStatus } : res
        )
      );

      message.success(`Reservation ${newStatus}`);
    } catch (error) {
      message.error('Failed to update reservation status');
    }
  };

  const columns: TableProps<Reservation>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (text, record) => `${text} at ${record.time}`
    },
    {
      title: 'Guests',
      dataIndex: 'guests',
      key: 'guests',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'pending' | 'confirmed' | 'rejected') => {
        const colors = {
          pending: 'gold',
          confirmed: 'green',
          rejected: 'red'
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<MessageOutlined />}
            onClick={() => {
              setSelectedReservation(record);
              setIsDetailsVisible(true);
            }}
          >
            Details
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type="text"
                icon={<CheckOutlined />}
                style={{ color: 'green' }}
                onClick={() => handleStatusChange(record.id, 'confirmed')}
              >
                Confirm
              </Button>
              <Button
                type="text"
                icon={<CloseOutlined />}
                style={{ color: 'red' }}
                onClick={() => handleStatusChange(record.id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Title level={2}>Reservation Management</Title>
      </Header>

      <Content style={{ padding: '24px' }}>
        <Tabs defaultActiveKey="pending">
          <TabPane tab="Pending" key="pending">
            <Table
              columns={columns}
              dataSource={reservations.filter(r => r.status === 'pending')}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Confirmed" key="confirmed">
            <Table
              columns={columns}
              dataSource={reservations.filter(r => r.status === 'confirmed')}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="Rejected" key="rejected">
            <Table
              columns={columns}
              dataSource={reservations.filter(r => r.status === 'rejected')}
              rowKey="id"
            />
          </TabPane>
        </Tabs>

        <Modal
          title="Reservation Details"
          open={isDetailsVisible}
          onCancel={() => setIsDetailsVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsDetailsVisible(false)}>
              Close
            </Button>
          ]}
        >
          {selectedReservation && (
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>Name:</strong> {selectedReservation.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedReservation.email}
              </div>
              <div>
                <strong>Phone:</strong> {selectedReservation.phone}
              </div>
              <div>
                <strong>Date:</strong> {selectedReservation.date}
              </div>
              <div>
                <strong>Time:</strong> {selectedReservation.time}
              </div>
              <div>
                <strong>Guests:</strong> {selectedReservation.guests}
              </div>
              <div>
                <strong>Status:</strong> {selectedReservation.status}
              </div>
              <div>
                <strong>Notes:</strong> {selectedReservation.notes || 'None'}
              </div>
              <div>
                <strong>Created At:</strong>{' '}
                {dayjs(selectedReservation.createdAt).format('YYYY-MM-DD HH:mm')}
              </div>
            </Space>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default ReservationPage;