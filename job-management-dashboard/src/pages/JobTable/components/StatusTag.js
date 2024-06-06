/**
 * Status tag component.
 * @param {Object} props - The component props.
 * @param {string} props.status - The status value.
 * @returns {JSX.Element} The rendered status tag.
*/

import React from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';

const SquareTag = styled(Tag)`
  border: 1px solid;
  padding: 4px 8px;
`;

const StatusTag = ({ status }) => {
  let color;
  switch (status) {
    case 'Completed':
      color = 'green';
      break;
    case 'In Progress':
      color = 'blue';
      break;
    case 'Pending':
      color = 'orange';
      break;
    case 'Scheduled':
      color = 'purple'; 
      break;
    default:
      color = 'gray';
  }

  return <SquareTag color={color}>{status}</SquareTag>;
};

export default StatusTag;