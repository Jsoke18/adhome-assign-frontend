/**
 * AddJobModal component for adding a new job.
 * @param {Object} props - The component props.
 * @param {boolean} props.visible - Determines if the modal is visible.
 * @param {function} props.onCancel - Callback function to handle modal cancellation.
 * @param {function} props.onOk - Callback function to handle modal submission.
 * @param {Object} props.form - The form instance from Ant Design Form.
 * @returns {JSX.Element} The rendered AddJobModal component.
 */

import React from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const AddJobModal = ({ visible, onCancel, onOk, form }) => {

   /**
   * Handles the date change event in the DatePicker.
   * @param {Object} date - The selected date object from DatePicker.
   * @param {string} dateString - The formatted date string.
   */  
    const handleDateChange = (date, dateString) => {
    form.setFieldsValue({
      appointmentDate: dayjs(dateString).toISOString(),
    });
  };

  const statusOptions = ["Scheduled", "In Progress", "Completed", "Pending"];

  return (
    <Modal
      title="Add New Job"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input placeholder="Customer Name" />
        </Form.Item>
        <Form.Item
          name="jobType"
          label="Job Type"
          rules={[{ required: true, message: "Please enter job type" }]}
        >
          <Input placeholder="Job Type" />
        </Form.Item>
        <Form.Item
          name="appointmentDate"
          label="Appointment Date and Time"
          rules={[
            {
              required: true,
              message: "Please select appointment date and time",
            },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY/MM/DD h:mm A"
            style={{ width: "100%" }}
            onChange={handleDateChange}
          />
        </Form.Item>
        <Form.Item
          name="technician"
          label="Technician"
          rules={[{ required: true, message: "Please enter technician name" }]}
        >
          <Input placeholder="Technician" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select a status">
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddJobModal;