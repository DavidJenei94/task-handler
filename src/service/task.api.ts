import { backendUrl } from '../utils/general.utils';

// GET ALL
export const fetchTasks = async (userId: number) => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      `${backendUrl}/tasks.php?id=${userId}`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    const modifiedTasks = JSON.parse(data.tasks).map((task: any) => {
      return {
        id: task.id,
        task: task.task,
        deadline: new Date(task.deadline),
        done: task.done === '0' ? false : true,
      };
    });

    return modifiedTasks;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// POST
export const addTask = async (
  taskName: string,
  deadline: string,
  userId: number
) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskName, deadline, done: 0, userId }),
    };

    const response = await fetch(`${backendUrl}/tasks.php`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// UPDATE
export const updateTask = async (id: number, done: number) => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done }),
    };
    const response = await fetch(
      `${backendUrl}/tasks.php?id=${id}`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// DELETE
export const deleteTask = async (id: number) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      `${backendUrl}/tasks.php?id=${id}`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
