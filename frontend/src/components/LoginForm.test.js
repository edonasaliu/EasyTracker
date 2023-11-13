import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should update the username input value when typing', () => {
    const { getByLabelText } = render(<LoginForm />);
    const usernameInput = getByLabelText('Username:');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
  });

  it('should update the password input value when typing', () => {
    const { getByLabelText } = render(<LoginForm />);
    const passwordInput = getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(passwordInput.value).toBe('testpassword');
  });

  it('should call the handleSubmit function when the form is submitted', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<LoginForm onSubmit={handleSubmit} />);
    const submitButton = getByText('Login');
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should render a link to the registration page', () => {
    const { getByText } = render(<LoginForm />);
    const registerLink = getByText('Register now');
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});