import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, InputNumber, Button, message } from 'antd';
import dayjs from 'dayjs';
import { createReservation } from '../utils/API';


interface ReservationModalProps {
  isVisible: boolean;
  onClose: () => void;
  restaurantId: string;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isVisible, onClose, restaurantId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      // Format the values
      const reservation = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        status: 'pending',
        restaurantId,
        createdAt: new Date().toISOString()
      };

      // Send to your API
      await createReservation(reservation);

      message.success('Reservation request submitted successfully!');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Failed to submit reservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Make a Reservation"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker
            disabledDate={current => current && current < dayjs().startOf('day')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true, message: 'Please select a time' }]}
        >
          <TimePicker
            format="HH:mm"
            minuteStep={30}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="guests"
          label="Number of Guests"
          rules={[{ required: true, message: 'Please enter number of guests' }]}
        >
          <InputNumber min={1} max={20} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Special Requests"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit Reservation Request
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReservationModal;


