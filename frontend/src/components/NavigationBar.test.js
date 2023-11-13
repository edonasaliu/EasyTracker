import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserContext } from '../contexts/UserContext';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  test('renders the component', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null }}>
          <NavigationBar />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Easy Tracker/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('displays login and register buttons when user is not logged in', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null }}>
          <NavigationBar />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const loginButton = screen.getByText(/login/i);
    const registerButton = screen.getByText(/register/i);
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('displays user name and logout button when user is logged in', () => {
    const user = { username: 'testuser' };
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <NavigationBar />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const userNameElement = screen.getByText(/testuser/i);
    const logoutButton = screen.getByText(/logout/i);
    expect(userNameElement).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  test('logs out the user when logout button is clicked', async () => {
    const setUser = jest.fn();
    const user = { username: 'testuser' };
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <NavigationBar />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    await waitFor(() => expect(setUser).toHaveBeenCalledWith(null));
  });
});