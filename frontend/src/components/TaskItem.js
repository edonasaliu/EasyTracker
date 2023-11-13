import React from 'react';
import { Paper, TextField, Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { TextareaAutosize as Textarea } from '@mui/base/TextareaAutosize';
import useDebouncedCallback from './useDebouncedCallback';
import { updateTask, deleteTask, createTask, getTasks } from './api';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SingleTask({ task, setTasks, tasks, handleUpdate, handleDelete, handleCreateSubtask }) {
  return (
    <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', marginTop: '1rem', marginBottom: '1rem', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <TextField
          onChange={(e) => handleUpdate(task, 'title', e.target.value)}
          name="title"
          value={task.title}
          label="Task Title"
          variant="standard"
          fullWidth
          required
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(task)}
            style={{ minWidth: 'fit-content', padding: '5px' }}
          >
            <DeleteIcon sx={{ color: 'white' }} />
          </Button>
          <Checkbox checked={task.is_completed} onChange={(e) => handleUpdate(task, 'is_completed', e.target.checked)} />
        </div>
      </div>
      <Textarea
        onChange={(e) => handleUpdate(task, 'description', e.target.value)}
        name="description"
        value={task.description}
        aria-label="minimum height"
        minRows={6}
        placeholder="Task Description"
        style={{ width: '100%' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCreateSubtask(task)}
        style={{ minWidth: 'fit-content', padding: '5px' }}
      >
        <AddIcon sx={{ color: 'white' }} />
      </Button>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={`${task.id}-accordion`}
        >
          Subtasks:
        </AccordionSummary>
        <AccordionDetails>
          {task.sub_tasks && task.sub_tasks.map(sub => (
            <div key={sub.id} style={{ marginLeft: '1rem' }}>
              <TaskItem task={sub} setTasks={setTasks}
                tasks={tasks} />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>

    </Paper>
  );
}

function TaskItem({ task, setTasks, tasks }) {
  const DEBOUNCE_DELAY = 500;

  const handleUpdate = (obj, property, value) => {
    console.log(tasks)
    const updatedTasks = updateTaskProperty(tasks, obj.id, obj.parent_id, property, value);
    setTasks(updatedTasks);
    debounceUpdateApi(obj, property, value);
  };

  function updateTaskProperty(tasks, taskId, parentTaskId, property, value) {
    return tasks.map((task) => {
      if (task.id === taskId) {
        if (parentTaskId) {
          // Task with parent, find the parent and update subtasks
          return {
            ...task,
            sub_tasks: updateSubtasks(task.sub_tasks, parentTaskId, property, value)
          };
        } else {
          // Task without parent, update the property directly
          return { ...task, [property]: value };
        }
      } else if (task.sub_tasks && task.sub_tasks.length > 0) {
        // Recursively update subtasks
        return {
          ...task,
          sub_tasks: updateTaskProperty(task.sub_tasks, taskId, parentTaskId, property, value)
        };
      }
      return task;
    });
  }

  function updateSubtasks(sub_tasks, parentTaskId, property, value) {
    return sub_tasks.map((subtask) => {
      if (subtask.id === parentTaskId) {
        return { ...subtask, [property]: value };
      }
      return subtask;
    });
  }



  // const handleUpdate = (obj, property, value) => {
  //   if (obj.parent_id) {
  //     setTasks((prevTasks) => prevTasks.map((t) => {
  //       if (t.id === obj.parent_id) {
  //         const updatedSubtasks = t.sub_tasks.map((s) => (s.id === obj.id ? { ...s, [property]: value } : s));
  //         return { ...t, sub_tasks: updatedSubtasks };
  //       }
  //       return t;
  //     }));
  //   } else {
  //     setTasks((prevTasks) => prevTasks.map((t) => (t.id === obj.id ? { ...t, [property]: value } : t)));
  //   }
  //   debounceUpdateApi(obj, property, value);
  // };

  const debounceUpdateApi = useDebouncedCallback(async (task, property, value) => {
    await updateTask(task.id, { ...task, [property]: value });
  }, DEBOUNCE_DELAY);

  const handleDelete = async (obj) => {
    await deleteTask(obj.id);
    const newTasks = await getTasks();
    setTasks(newTasks);
  };

  const handleCreateSubtask = async (parentTask) => {
    const newTask = await createTask({
      title: '',
      description: '',
      parentId: parentTask.id,
    });

    if (newTask) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];

        const addSubtask = (tasks, parentId, subtask) => {
          return tasks.map(task => {
            if (task.id === parentId) {
              return {
                ...task,
                sub_tasks: task.sub_tasks ? [...task.sub_tasks, subtask] : [subtask],
              };
            } else if (task.sub_tasks) {
              return {
                ...task,
                sub_tasks: addSubtask(task.sub_tasks, parentId, subtask),
              };
            }
            return task;
          });
        };

        return addSubtask(updatedTasks, parentTask.id, newTask);
      });
    }
  };

  return (
    <SingleTask
      task={task}
      setTasks={setTasks}
      tasks={tasks}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      handleCreateSubtask={handleCreateSubtask}
    />
  );
}

export default TaskItem;