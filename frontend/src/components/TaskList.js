import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, setTasks, allTasks, setAllTasks }) {
  return (
    <>
      {tasks.length > 0 && <h2 style={{ marginTop: '2rem' }}>Tasks:</h2>}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} setTasks={setTasks} tasks={tasks} allTasks={allTasks} setAllTasks={setAllTasks} />
      ))}
    </>
  );
}

export default TaskList;
