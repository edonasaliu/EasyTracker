import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks } from '../components/api';


function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <Container maxWidth="md">
      <TaskForm setTasks={setTasks} isLoading={isLoading} setIsLoading={setIsLoading} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </Container>
  );
}

export default HomePage;
