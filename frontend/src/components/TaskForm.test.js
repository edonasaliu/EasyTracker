import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm', () => {
  it('renders the form with the correct inputs', () => {
    render(<TaskForm />);
    const titleInput = screen.getByLabelText('Task Title');
    const descriptionInput = screen.getByPlaceholderText('Task Description');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('submits the form with the correct data', async () => {
    const setTasks = jest.fn();
    const isLoading = false;
    const setIsLoading = jest.fn();
    const createTask = jest.fn().mockResolvedValueOnce({ id: 1, title: 'Test Task', description: 'This is a test task' });

    render(<TaskForm setTasks={setTasks} isLoading={isLoading} setIsLoading={setIsLoading} createTask={createTask} />);
    const titleInput = screen.getByLabelText('Task Title');
    const descriptionInput = screen.getByPlaceholderText('Task Description');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a test task' } });
    fireEvent.click(submitButton);

    expect(setIsLoading).toHaveBeenCalledTimes(2);
    expect(createTask).toHaveBeenCalledWith({ title: 'Test Task', description: 'This is a test task' });
    await waitFor(() => expect(setTasks).toHaveBeenCalledWith([{ id: 1, title: 'Test Task', description: 'This is a test task' }]));
  });

  it('does not submit the form if the title is empty', async () => {
    const setTasks = jest.fn();
    const isLoading = false;
    const setIsLoading = jest.fn();
    const createTask = jest.fn();

    render(<TaskForm setTasks={setTasks} isLoading={isLoading} setIsLoading={setIsLoading} createTask={createTask} />);
    const descriptionInput = screen.getByPlaceholderText('Task Description');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(descriptionInput, { target: { value: 'This is a test task' } });
    fireEvent.click(submitButton);

    expect(setIsLoading).toHaveBeenCalledTimes(1);
    expect(createTask).not.toHaveBeenCalled();
    expect(setTasks).not.toHaveBeenCalled();
  });
});