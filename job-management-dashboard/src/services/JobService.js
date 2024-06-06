
/**
 * JobService.js
 * 
 * This service file contains functions for interacting with the job-related endpoints of the API.
 * It uses Axios to make HTTP requests to the API and handles the responses.
 * The base URL of the API is defined as 'http://localhost:5000'.
 * 
 * The available functions include:
 * - fetchJobs: Fetches all jobs from the API.
 * - fetchJobById: Fetches a specific job by its ID from the API.
 * - deleteJob: Deletes a job by its ID from the API.
 * - updateJob: Updates a job by its ID in the API.
 * - addJob: Adds a new job to the API.
 * 
 * Each function returns a promise that resolves to the response data or throws an error if the request fails.
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

/**
 * Fetches a job by its ID from the API.
 * @param {string} id - The ID of the job to fetch.
 * @returns {Promise<Object>} A promise that resolves to the job object.
 * @throws {Error} If an error occurs while fetching the job.
 */
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a job by its ID from the API.
 * @param {string} id - The ID of the job to fetch.
 * @returns {Promise<Object>} A promise that resolves to the job object.
 * @throws {Error} If an error occurs while fetching the job.
 */
export const fetchJobById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a job by its ID from the API.
 * @param {string} id - The ID of the job to delete.
 * @returns {Promise<void>} A promise that resolves when the job is deleted.
 * @throws {Error} If an error occurs while deleting the job.
 */
export const deleteJob = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/jobs/${id}`);
  } catch (error) {
    throw error;
  }
};

/**
 * Updates a job by its ID in the API.
 * @param {string} id - The ID of the job to update.
 * @param {Object} job - The updated job object.
 * @returns {Promise<Object>} A promise that resolves to the updated job object.
 * @throws {Error} If an error occurs while updating the job.
 */
export const updateJob = async (id, job) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/jobs/${id}`, job);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Adds a new job to the API.
 * @param {Object} job - The new job object to add.
 * @returns {Promise<Object>} A promise that resolves to the added job object.
 * @throws {Error} If an error occurs while adding the job.
 */
export const addJob = async (job) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs`, job);
    return response.data;
  } catch (error) {
    throw error;
  }
};
