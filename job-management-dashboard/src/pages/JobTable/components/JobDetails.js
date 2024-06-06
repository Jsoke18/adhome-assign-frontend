/**
 * JobDetails component for displaying and editing job details.
 * @param {Object} props - The component props.
 * @param {Object} props.job - The job object containing job details.
 * @param {function} props.onUpdate - Callback function to handle job updates.
 * @returns {JSX.Element} The rendered JobDetails component.
 */

import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Typography,
  Divider,
  Button,
  message,
  DatePicker,
  Select,
  Space,
} from "antd";
import StatusTag from "./StatusTag";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { updateJob } from "../../../services/JobService";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const { Title, Text } = Typography;
const { Option } = Select;

const JobDetails = ({ job, onUpdate }) => {
  const [form] = Form.useForm();
  const [appointmentDateTime, setAppointmentDateTime] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  
// Initialize form values and appointment date/time when job prop changes.
  useEffect(() => {
    if (job) {
      const appointmentDateTimeDayjs = dayjs(job.appointmentDate).utc();
      setAppointmentDateTime(appointmentDateTimeDayjs);
      const initialFormValues = {
        customerName: job.customerName,
        jobType: job.jobType,
        technician: job.technician,
        appointmentDateTime: appointmentDateTimeDayjs,
        status: job.status,
      };
      form.setFieldsValue(initialFormValues);
      setFormValues(initialFormValues);
      setInitialValues(initialFormValues);
    }
  }, [job, form]);

  /**
   * Handle form submission and update job details.
   * @param {Object} values - The form values.
   */
  const handleSubmit = async (values) => {
    console.log("Updated form values:", values);
    try {
      const updatedJob = {
        ...job,
        ...values,
        appointmentDate: values.appointmentDateTime.toISOString(),
      };
      await updateJob(job.id, updatedJob);
      onUpdate(updatedJob);
      setEditing(false);
      message.success("Job updated successfully");
    } catch (error) {
      console.error("Error updating job:", error);
      message.error("Failed to update job");
    }
  };
   
  // Enable editing mode. 
  const handleEdit = () => {
    setEditing(true);
  };
  
  // Cancel editing mode. 
  const handleCancel = () => {
    setEditing(false);
    form.setFieldsValue(initialValues);
    setFormValues(initialValues);
    setAppointmentDateTime(initialValues.appointmentDateTime);
  };

  if (!job) {
    return <div>No job data available</div>;
  }

  return (
    <Card style={{ width: "100%" }}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Title level={4}>Customer Information</Title>
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input
            placeholder="Customer Name"
            disabled={!editing}
            value={formValues.customerName}
          />
        </Form.Item>
        <Form.Item
          name="jobType"
          label="Job Type"
          rules={[{ required: true, message: "Please enter job type" }]}
        >
          <Input
            placeholder="Job Type"
            disabled={!editing}
            value={formValues.jobType}
          />
        </Form.Item>
        <Form.Item
          name="appointmentDateTime"
          label="Appointment Date and Time"
          rules={[
            {
              required: true,
              message: "Please select appointment date and time",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            showTime={{
              format: "h:mm A",
              use12Hours: true,
            }}
            format="YYYY/MM/DD h:mm A"
            value={appointmentDateTime}
            onChange={(value) => {
              setAppointmentDateTime(value);
              console.log("Selected value:", value);
            }}
            disabled={!editing}
          />
        </Form.Item>
        <Form.Item
          name="technician"
          label="Technician"
          rules={[{ required: true, message: "Please enter technician name" }]}
        >
          <Input
            placeholder="Technician"
            disabled={!editing}
            value={formValues.technician}
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          {editing ? (
            <Select
              placeholder="Select Status"
              value={formValues.status}
              onChange={(value) =>
                setFormValues({ ...formValues, status: value })
              }
            >
              <Option value="Scheduled">Scheduled</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          ) : (
            <StatusTag status={formValues.status} />
          )}
        </Form.Item>
        <Divider />
        {!editing && (
          <Button type="primary" onClick={handleEdit}>
            Update
          </Button>
        )}
        {editing && (
          <Space align="baseline">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={handleCancel}>Cancel</Button>
            </Form.Item>
          </Space>
        )}
      </Form>
    </Card>
  );
};

export default JobDetails;
