/**
 * The Joblist component displays all services within a table. The user can view the details of a service, delete a service, and add a new service.
 * @returns {JSX.Element} The rendered job list.
*/

import React, { useEffect, useState } from "react";
import {
  Table,
  message,
  Button,
  Drawer,
  Popconfirm,
  Form
} from "antd";
import {
  fetchJobs,
  fetchJobById,
  deleteJob,
  addJob,
} from "../../../services/JobService";
import JobDetails from "./JobDetails";
import StatusTag from "./StatusTag";
import dayjs from "dayjs";
import AddJobModal from "./AddJobModal";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetailsLoading, setJobDetailsLoading] = useState(false);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadJobs();
  }, []);

/**
* Loads the list of jobs.
* @returns {Promise<void>} A promise that resolves when the jobs are loaded.
*/

  const loadJobs = async () => {
    setLoading(true);
    try {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
    } catch (error) {
      message.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  /**
  * Handles viewing the details of a job.
  * @param {string} id - The ID of the job to view.
  * @returns {Promise<void>} A promise that resolves when the job details are fetched.
  */
  const handleViewDetails = async (id) => {
    console.log("ID:", id);
    setVisibleDrawer(true);
    setJobDetailsLoading(true);
    try {
      const jobData = await fetchJobById(id);
      setSelectedJob(jobData);
    } catch (error) {
      message.error("Error fetching job details");
    } finally {
      setJobDetailsLoading(false);
    }
  };

  /**
   * Handles updating a job in the job list.
   * @param {Object} updatedJob - The updated job object.
   * @returns {void}
   */
  const handleJobUpdate = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  /**
   * Handles deleting a job.
   * @param {string} id - The ID of the job to delete.
   * @returns {Promise<void>} A promise that resolves when the job is deleted.
   */
  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      message.success("Job deleted successfully");
      loadJobs();
    } catch (error) {
      message.error("Error deleting job");
    }
  };

  /**
   * Handles adding a new job.
   * @returns {Promise<void>} A promise that resolves when the job is added.
  */
  const handleAddJob = async () => {
    try {
      const values = await form.validateFields();
      const newJob = {
        ...values,
        appointmentDate: values.appointmentDate.toISOString(),
        status: "Scheduled",
      };
      await addJob(newJob);
      message.success("Job added successfully");
      setIsAddingJob(false);
      loadJobs();
    } catch (error) {
      message.error("Error adding job");
    }
  };

  const onDrawerClose = () => {
    setVisibleDrawer(false);
    setSelectedJob(null);
  };

  const tableTitle = () => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button type="primary" onClick={() => setIsAddingJob(true)}>
        Add Job
      </Button>
    </div>
  );
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <StatusTag status={text} />,
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (text) => dayjs.utc(text).format("YYYY/MM/DD h:mm A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleViewDetails(record.id)}
            style={{ marginRight: 8 }}
          >
            View Details
          </Button>
          <Popconfirm
            title="Are you sure to delete this job?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              style={{
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        title={tableTitle}
        dataSource={jobs}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
      <Drawer
        title="Service Details"
        placement="right"
        width={500}
        onClose={onDrawerClose}
        open={visibleDrawer}
      >
        {selectedJob ? (
          <JobDetails
            job={selectedJob}
            loading={jobDetailsLoading}
            onUpdate={handleJobUpdate}
          />
        ) : null}
      </Drawer>
      <AddJobModal
      visible={isAddingJob}
      onCancel={() => setIsAddingJob(false)}
      onOk={handleAddJob}
      form={form}
    />
    </div>
  );
};

export default JobList;
