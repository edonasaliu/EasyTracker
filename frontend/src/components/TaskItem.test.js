import { render, screen, fireEvent } from '@testing-library/react';
import SingleTask from './TaskItem';

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'This is a test task',
  is_completed: false,
  sub_tasks: []
};

test('renders task title and description', () => {
  render(<SingleTask task={mockTask} />);
  const titleElement = screen.getByText(/Test Task/i);
  const descriptionElement = screen.getByText(/This is a test task/i);
  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('updates task title on input change', () => {
  const handleUpdate = jest.fn();
  render(<SingleTask task={mockTask} handleUpdate={handleUpdate} />);
  const titleInput = screen.getByLabelText(/Task Title/i);
  fireEvent.change(titleInput, { target: { value: 'Updated Task Title' } });
  expect(handleUpdate).toHaveBeenCalledWith(mockTask, 'title', 'Updated Task Title');
});

test('deletes task on delete button click', () => {
  const handleDelete = jest.fn();
  render(<SingleTask task={mockTask} handleDelete={handleDelete} />);
  const deleteButton = screen.getByRole('button', { name: /delete task/i });
  fireEvent.click(deleteButton);
  expect(handleDelete).toHaveBeenCalledWith(mockTask);
});

test('creates subtask on add subtask button click', () => {
  const handleCreateSubtask = jest.fn();
  render(<SingleTask task={mockTask} handleCreateSubtask={handleCreateSubtask} />);
  const addSubtaskButton = screen.getByRole('button', { name: /add subtask/i });
  fireEvent.click(addSubtaskButton);
  expect(handleCreateSubtask).toHaveBeenCalledWith(mockTask);
});

test('updates task completion status on checkbox change', () => {
  const handleUpdate = jest.fn();
  render(<SingleTask task={mockTask} handleUpdate={handleUpdate} />);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(handleUpdate).toHaveBeenCalledWith(mockTask, 'is_completed', true);
});