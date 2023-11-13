import React from 'react';
import { Container } from '@mui/material';
import TaskList from '../components/TaskList'; // Correct the import path
import NavigationBar from '../components/NavigationBar'; // Correct the import path

function TaskPage() {
  return (
    <Container>
      <NavigationBar />
      <TaskList />
    </Container>
  );
}

export default TaskPage;
