import React, { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import { TextareaAutosize as Textarea } from '@mui/base/TextareaAutosize';
import { createTask } from './api';
import { toast } from 'react-toastify';

function TaskForm({ setTasks, isLoading, setIsLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    setIsLoading(true);
    const newTask = await createTask(formData);
    setIsLoading(false);

    if (newTask) {
      setFormData({ title: '', description: '' });
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      toast.success('Task created successfully!');
    } else {
      toast.error('Failed to create task');
    }
  };

  return (
    <form>
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: "2.5rem" }}>
        <TextField
          onChange={handleChange}
          name="title"
          value={formData.title}
          label="Task Title"
          variant="standard"
          fullWidth
          required
        />
        <Textarea
          onChange={handleChange}
          name="description"
          value={formData.description}
          aria-label="minimum height"
          minRows={6}
          placeholder="Task Description"
          style={{ width: '100%' }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Paper>
    </form>
  );
}


export default TaskForm;
