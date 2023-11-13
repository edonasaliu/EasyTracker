const API_BASE = 'http://localhost:5000/tasks';

export async function getTasks() {
  const response = await fetch(API_BASE, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error('Failed to fetch tasks');
    return [];
  }
}

export async function createTask(task) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error('Failed to create task');
    return null;
  }
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error('Failed to update task');
    return null;
  }
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return true;
  } else {
    console.error('Failed to delete task');
    return false;
  }
}
