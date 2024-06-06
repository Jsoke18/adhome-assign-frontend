/**
 * Job page component.
 * @returns {JSX.Element} The rendered job page.
*/

import React from 'react';
import { Card } from 'antd';
import JobList from './components/JobList';


const JobPage = () => {
  return (
    <Card style={{ marginTop: 16 }}>
      <JobList />
    </Card>
  );
};

export default JobPage;
